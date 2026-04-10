import { j as jsxRuntimeExports, L as Link, B as Button } from "./index-Cxbb59_L.js";
import { T as Terminal } from "./terminal-CGtpinTI.js";
function NotFound() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-6 px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3 font-mono", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { className: "w-8 h-8 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-6xl font-display font-bold text-foreground", children: "404" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-primary text-sm", children: "// error: page not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm mx-auto", children: "The page you're looking for doesn't exist or has been moved." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-primary text-primary-foreground font-mono text-sm", children: "$ cd ~/home" }) })
  ] }) });
}
export {
  NotFound as default
};
