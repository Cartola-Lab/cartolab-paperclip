import { definePlugin, runWorker } from "@paperclipai/plugin-sdk";
const plugin = definePlugin({
    async setup(ctx) {
        ctx.logger.info("Cartolab Studio plugin ready");
    },
    async onHealth() {
        return { status: "ok", message: "Studio plugin healthy" };
    },
});
export default plugin;
runWorker(plugin, import.meta.url);
//# sourceMappingURL=worker.js.map