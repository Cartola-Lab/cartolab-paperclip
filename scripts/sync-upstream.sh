#!/usr/bin/env bash
# =============================================================================
# sync-upstream.sh
# Sincroniza o repo cartolab-paperclip com o upstream oficial (paperclipai/paperclip)
# preservando arquivos customizados pela Cartola Lab.
#
# Uso: ./scripts/sync-upstream.sh [--dry-run]
# =============================================================================

set -euo pipefail

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------
UPSTREAM_REMOTE="upstream"
UPSTREAM_URL="https://github.com/paperclipai/paperclip.git"
UPSTREAM_BRANCH="master"
OUR_BRANCH="dev"
REPO_ROOT="$(git -C "$(dirname "$0")" rev-parse --show-toplevel)"
LOG_DIR="$REPO_ROOT/.sync-logs"
LOG_FILE="$LOG_DIR/sync-$(date +%Y%m%d-%H%M%S).log"
DRY_RUN=false

# Arquivos/diretórios que SEMPRE preservamos (nossa versão ganha em conflito)
CUSTOM_PATHS=(
  "docker-compose.yml"
  "docker-compose.prod.yml"
  ".env.example"
  "scripts/docker-entrypoint.sh"
  "scripts/release.sh"
  "scripts/rollback-latest.sh"
  "packages/ui/src/components"
  "packages/server/src/cartolab"
  "packages/ui/src/styles"
)

# ---------------------------------------------------------------------------
# Cores
# ---------------------------------------------------------------------------
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
log()  { echo -e "${CYAN}[SYNC]${NC} $*" | tee -a "$LOG_FILE"; }
ok()   { echo -e "${GREEN}[OK]${NC}   $*" | tee -a "$LOG_FILE"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $*" | tee -a "$LOG_FILE"; }
err()  { echo -e "${RED}[ERR]${NC}  $*" | tee -a "$LOG_FILE"; }

is_custom() {
  local file="$1"
  for path in "${CUSTOM_PATHS[@]}"; do
    if [[ "$file" == "$path" || "$file" == "$path"/* ]]; then
      return 0
    fi
  done
  return 1
}

# ---------------------------------------------------------------------------
# Parse args
# ---------------------------------------------------------------------------
for arg in "$@"; do
  [[ "$arg" == "--dry-run" ]] && DRY_RUN=true
done

# ---------------------------------------------------------------------------
# Init
# ---------------------------------------------------------------------------
mkdir -p "$LOG_DIR"
echo "============================================================" >> "$LOG_FILE"
echo " sync-upstream.sh — $(date)"                                  >> "$LOG_FILE"
echo " DRY_RUN=$DRY_RUN"                                            >> "$LOG_FILE"
echo "============================================================" >> "$LOG_FILE"

cd "$REPO_ROOT"

echo -e "\n${BOLD}=== Cartolab Paperclip — Sync Upstream ===${NC}"
$DRY_RUN && warn "Modo DRY-RUN ativado — nenhuma alteração será feita no repo"

# ---------------------------------------------------------------------------
# 1. Verificar branch atual
# ---------------------------------------------------------------------------
CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
log "Branch atual: $CURRENT_BRANCH"

if [[ "$CURRENT_BRANCH" != "$OUR_BRANCH" ]]; then
  warn "Você não está na branch '$OUR_BRANCH' (está em '$CURRENT_BRANCH')"
  read -r -p "Continuar mesmo assim? [s/N] " confirm
  [[ "$confirm" =~ ^[sS]$ ]] || { err "Abortado pelo usuário."; exit 1; }
fi

# ---------------------------------------------------------------------------
# 2. Verificar working tree limpa
# ---------------------------------------------------------------------------
if ! git diff --quiet || ! git diff --cached --quiet; then
  err "Existem mudanças não commitadas. Faça commit ou stash antes de sincronizar."
  git status --short
  exit 1
fi
ok "Working tree limpa"

# ---------------------------------------------------------------------------
# 3. Garantir remote upstream
# ---------------------------------------------------------------------------
if ! git remote get-url "$UPSTREAM_REMOTE" &>/dev/null; then
  log "Adicionando remote '$UPSTREAM_REMOTE' → $UPSTREAM_URL"
  $DRY_RUN || git remote add "$UPSTREAM_REMOTE" "$UPSTREAM_URL"
else
  ok "Remote '$UPSTREAM_REMOTE' já existe: $(git remote get-url "$UPSTREAM_REMOTE")"
fi

# ---------------------------------------------------------------------------
# 4. Fetch upstream
# ---------------------------------------------------------------------------
log "Fazendo fetch do upstream..."
$DRY_RUN || git fetch "$UPSTREAM_REMOTE" "$UPSTREAM_BRANCH" 2>&1 | tee -a "$LOG_FILE"
ok "Fetch concluído"

if $DRY_RUN; then
  warn "DRY-RUN: pulando merge e preservação de arquivos"
  echo ""
  log "Arquivos que seriam verificados para customização:"
  for p in "${CUSTOM_PATHS[@]}"; do
    echo "   • $p" | tee -a "$LOG_FILE"
  done
  echo ""
  warn "DRY-RUN finalizado. Nenhuma alteração aplicada."
  exit 0
fi

# ---------------------------------------------------------------------------
# 5. Identificar arquivos que diferem entre nossa branch e upstream
# ---------------------------------------------------------------------------
log "Identificando diferenças em relação ao upstream/$UPSTREAM_BRANCH..."

CHANGED_FILES=()
while IFS= read -r line; do
  CHANGED_FILES+=("$line")
done < <(git diff --name-only "HEAD" "$UPSTREAM_REMOTE/$UPSTREAM_BRANCH" 2>/dev/null || true)

CUSTOM_CHANGED=()
UPSTREAM_CHANGED=()

for f in "${CHANGED_FILES[@]}"; do
  if is_custom "$f"; then
    CUSTOM_CHANGED+=("$f")
  else
    UPSTREAM_CHANGED+=("$f")
  fi
done

log "Arquivos diferentes do upstream: ${#CHANGED_FILES[@]}"
log "  → Customizados (nossa versão será preservada): ${#CUSTOM_CHANGED[@]}"
log "  → Upstream (serão atualizados): ${#UPSTREAM_CHANGED[@]}"

# ---------------------------------------------------------------------------
# 6. Merge com estratégia ours para arquivos customizados
# ---------------------------------------------------------------------------
log "Iniciando merge do upstream/$UPSTREAM_BRANCH..."

# Cria arquivo temporário com atributos de merge para arquivos customizados
GITATTRIBUTES_TEMP="$REPO_ROOT/.git/sync-merge-attributes"
> "$GITATTRIBUTES_TEMP"
for f in "${CUSTOM_PATHS[@]}"; do
  echo "$f merge=ours" >> "$GITATTRIBUTES_TEMP"
  echo "$f/* merge=ours" >> "$GITATTRIBUTES_TEMP"
done

# Ativa driver merge=ours e aponta gitattributes temporário
git config merge.ours.driver true
GIT_ATTR_NOSYSTEM=1 GIT_ATTR_SYSTEM="$GITATTRIBUTES_TEMP" \
  git -c core.attributesFile="$GITATTRIBUTES_TEMP" \
  merge "$UPSTREAM_REMOTE/$UPSTREAM_BRANCH" \
  --no-edit \
  -m "chore: sync upstream $(date +%Y-%m-%d)" \
  2>&1 | tee -a "$LOG_FILE" || {
    err "Merge falhou com conflitos não resolvidos automaticamente!"
    err "Resolva os conflitos manualmente e rode: git merge --continue"
    err "Log completo em: $LOG_FILE"
    rm -f "$GITATTRIBUTES_TEMP"
    exit 1
  }

rm -f "$GITATTRIBUTES_TEMP"

# ---------------------------------------------------------------------------
# 7. Relatório final
# ---------------------------------------------------------------------------
echo ""
echo -e "${BOLD}=== Relatório de Sincronização ===${NC}" | tee -a "$LOG_FILE"

if [[ ${#UPSTREAM_CHANGED[@]} -gt 0 ]]; then
  echo -e "\n${GREEN}✅ Arquivos atualizados do upstream (${#UPSTREAM_CHANGED[@]}):${NC}" | tee -a "$LOG_FILE"
  for f in "${UPSTREAM_CHANGED[@]}"; do
    echo "   ✔ $f" | tee -a "$LOG_FILE"
  done
else
  ok "Nenhum arquivo upstream para atualizar (já estava em dia)"
fi

if [[ ${#CUSTOM_CHANGED[@]} -gt 0 ]]; then
  echo -e "\n${YELLOW}🔒 Arquivos customizados preservados (${#CUSTOM_CHANGED[@]}):${NC}" | tee -a "$LOG_FILE"
  for f in "${CUSTOM_CHANGED[@]}"; do
    echo "   🔒 $f" | tee -a "$LOG_FILE"
  done
else
  ok "Nenhum arquivo customizado estava em conflito"
fi

echo ""
ok "Sync concluído com sucesso! Log salvo em: $LOG_FILE"
echo ""
