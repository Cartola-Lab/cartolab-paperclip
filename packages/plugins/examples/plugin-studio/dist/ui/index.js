import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const STUDIO_APP_URL = "https://studio.cartolab.co";
/**
 * StudioSidebarEntry — sidebar nav link that opens the Cartolab Studio app.
 *
 * Renders a "Studio" entry in the Paperclip sidebar matching the host's
 * native nav link visual style. Clicking it navigates to the Studio app.
 */
export function StudioSidebarEntry({ context: _context }) {
    const isActive = typeof window !== "undefined" &&
        window.location.href.startsWith(STUDIO_APP_URL);
    return (_jsxs("a", { href: STUDIO_APP_URL, target: "_blank", rel: "noopener noreferrer", "aria-current": isActive ? "page" : undefined, className: [
            "flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium transition-colors",
            isActive
                ? "bg-accent text-foreground"
                : "text-foreground/80 hover:bg-accent/50 hover:text-foreground",
        ].join(" "), children: [_jsx("span", { className: "relative shrink-0", children: _jsxs("svg", { viewBox: "0 0 24 24", className: "h-4 w-4", fill: "none", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [_jsx("rect", { x: "3", y: "3", width: "18", height: "14", rx: "2" }), _jsx("path", { d: "M8 21h8" }), _jsx("path", { d: "M12 17v4" })] }) }), _jsx("span", { className: "flex-1 truncate", children: "Studio" })] }));
}
//# sourceMappingURL=index.js.map