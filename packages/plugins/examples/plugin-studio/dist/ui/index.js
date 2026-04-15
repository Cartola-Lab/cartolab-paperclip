import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useHostContext, usePluginToast } from "@paperclipai/plugin-sdk/ui";
const STUDIO_APP_URL = "https://studio.cartolab.co";
/**
 * StudioSidebarEntry — sidebar nav link that opens the Cartolab Studio app.
 *
 * On click it requests a one-time access token from the host, then redirects
 * to Studio with that token in the query string so Studio can verify the
 * user's identity without requiring a separate login.
 */
export function StudioSidebarEntry(_props) {
    const { companyId } = useHostContext();
    const toast = usePluginToast();
    const [loading, setLoading] = useState(false);
    async function handleClick(e) {
        e.preventDefault();
        if (loading)
            return;
        setLoading(true);
        try {
            const res = await fetch("/api/studio/generate-token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ companyId }),
            });
            if (!res.ok) {
                throw new Error(`Token request failed (${res.status})`);
            }
            const { token } = (await res.json());
            window.open(`${STUDIO_APP_URL}/auth/studio/callback?access_token=${encodeURIComponent(token)}`, "_blank");
        }
        catch (err) {
            toast({
                title: "Could not open Studio",
                body: err instanceof Error ? err.message : "An unexpected error occurred.",
                tone: "error",
            });
        }
        finally {
            setLoading(false);
        }
    }
    return (_jsxs("button", { type: "button", onClick: handleClick, disabled: loading, "aria-busy": loading, className: [
            "flex w-full items-center gap-2.5 px-3 py-2 text-[13px] font-medium transition-colors",
            loading
                ? "cursor-wait opacity-60"
                : "text-foreground/80 hover:bg-accent/50 hover:text-foreground",
        ].join(" "), children: [_jsx("span", { className: "relative shrink-0", children: _jsxs("svg", { viewBox: "0 0 24 24", className: "h-4 w-4", fill: "none", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [_jsx("rect", { x: "3", y: "3", width: "18", height: "14", rx: "2" }), _jsx("path", { d: "M8 21h8" }), _jsx("path", { d: "M12 17v4" })] }) }), _jsx("span", { className: "flex-1 truncate", children: loading ? "Opening…" : "Studio" })] }));
}
//# sourceMappingURL=index.js.map