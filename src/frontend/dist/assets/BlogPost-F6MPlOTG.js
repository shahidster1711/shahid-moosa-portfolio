import { c as createLucideIcon, u as useParams, r as reactExports, j as jsxRuntimeExports, L as Link, S as Separator, E as ExternalLink } from "./index-Cxbb59_L.js";
import { m as motion, B as Badge } from "./proxy-2zPCDLCE.js";
import { a as articles, u as updateSEO, g as getArticleJsonLD, C as Calendar, b as Clock } from "./seo-Ctq8cKch.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode);
function parseContent(raw) {
  const nodes = [];
  const lines = raw.split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("## ")) {
      nodes.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h2",
          {
            className: "text-3xl lg:text-4xl font-display font-bold mt-10 mb-4 text-primary text-glow-primary",
            children: parseLine(line.slice(3))
          },
          i
        )
      );
    } else if (line.startsWith("### ")) {
      nodes.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h3",
          {
            className: "text-2xl lg:text-3xl font-display font-semibold mt-8 mb-3 text-foreground",
            children: parseLine(line.slice(4))
          },
          i
        )
      );
    } else if (line.startsWith("```")) {
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      nodes.push(
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative my-6 group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-lg bg-primary/5 border border-primary/20 glow-primary opacity-50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "relative overflow-x-auto rounded-lg bg-card border border-border p-5 font-mono text-base leading-relaxed text-primary/90 scrollbar-thin", children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: codeLines.join("\n") }) })
        ] }, `code-${i}`)
      );
    } else if (line.startsWith("| ")) {
      const tableLines = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      nodes.push(/* @__PURE__ */ jsxRuntimeExports.jsx(TableBlock, { lines: tableLines }, `table-${i}`));
      continue;
    } else if (line.startsWith("- ")) {
      const items = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      nodes.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "my-4 space-y-2 pl-0", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: "flex items-start gap-3 text-lg text-foreground/85 leading-relaxed",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: parseLine(item) })
            ]
          },
          item
        )) }, `ul-${i}`)
      );
      continue;
    } else if (line.match(/^\d+\. /)) {
      const items = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        items.push(lines[i].replace(/^\d+\. /, ""));
        i++;
      }
      nodes.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "ol",
          {
            className: "my-4 space-y-2 pl-0 counter-reset-[item]",
            children: items.map((item, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex items-start gap-3 text-lg text-foreground/85 leading-relaxed",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-0.5 font-mono text-sm text-primary/70 w-5 shrink-0 pt-1", children: [
                    j + 1,
                    "."
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: parseLine(item) })
                ]
              },
              item
            ))
          },
          `ol-${i}`
        )
      );
      continue;
    } else if (line.trim() === "") ;
    else {
      nodes.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "my-4 text-foreground/80 leading-relaxed text-lg", children: parseLine(line) }, i)
      );
    }
    i++;
  }
  return nodes;
}
function parseLine(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const inner = part.slice(2, -2);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-semibold text-foreground", children: inner }, inner);
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      const inner = part.slice(1, -1);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "code",
        {
          className: "font-mono text-sm text-accent bg-accent/10 px-1.5 py-0.5 rounded border border-accent/20",
          children: inner
        },
        inner
      );
    }
    return part;
  });
}
function TableBlock({ lines }) {
  const rows = lines.filter((l) => !l.match(/^\|[-| ]+\|$/)).map(
    (l) => l.split("|").slice(1, -1).map((c) => c.trim())
  );
  if (rows.length === 0) return null;
  const [header, ...body] = rows;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-6 overflow-x-auto rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-card", children: header.map((cell) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "th",
      {
        className: "px-4 py-3 text-left font-mono text-xs font-semibold text-primary uppercase tracking-wider",
        children: cell
      },
      cell
    )) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: body.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "tr",
      {
        className: "border-b border-border/50 last:border-0 hover:bg-card/50 transition-colors",
        children: row.map((cell) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground/80", children: parseLine(cell) }, cell))
      },
      row.join("|")
    )) })
  ] }) });
}
function RelatedArticleCard({ article }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/blog/$slug",
      params: { slug: article.slug },
      className: "group block p-4 rounded-lg border border-border bg-card hover:border-primary/40 hover:glow-primary transition-smooth",
      "data-ocid": "related-article-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-mono text-muted-foreground mb-2", children: [
          new Date(article.date).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric"
          }),
          " ",
          "· ",
          article.readTime,
          " min read"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-display font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2", children: article.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-2 text-xs text-muted-foreground group-hover:text-primary/70 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Read article" })
        ] })
      ]
    }
  );
}
function BlogPost() {
  const { slug } = useParams({ from: "/blog/$slug" });
  const article = reactExports.useMemo(() => articles.find((a) => a.slug === slug), [slug]);
  const related = reactExports.useMemo(
    () => articles.filter((a) => a.slug !== slug).slice(0, 2),
    [slug]
  );
  reactExports.useEffect(() => {
    if (!article) return;
    updateSEO({
      title: article.title,
      description: article.excerpt,
      canonical: `https://www.shahidster.tech/blog/${article.slug}`,
      type: "article",
      publishedTime: article.date,
      tags: article.tags
    });
    const jsonLd = getArticleJsonLD({
      title: article.title,
      description: article.excerpt,
      date: article.date,
      url: `https://www.shahidster.tech/blog/${article.slug}`
    });
    let el = document.getElementById("article-jsonld");
    if (!el) {
      el = document.createElement("script");
      el.id = "article-jsonld";
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = jsonLd;
    return () => {
      var _a;
      (_a = document.getElementById("article-jsonld")) == null ? void 0 : _a.remove();
    };
  }, [article]);
  if (!article) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center gap-6 bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-primary text-sm border border-primary/30 rounded-lg px-6 py-4 bg-card glow-primary", children: "// 404: article not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/",
          className: "flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-mono",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Return to home"
          ]
        }
      )
    ] });
  }
  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const contentNodes = parseContent(article.content);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "aria-hidden": "true",
        className: "pointer-events-none fixed inset-0 overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-accent/4 blur-[100px]" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-3xl mx-auto px-4 sm:px-6 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: -16 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.4 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/",
              hash: "writing",
              className: "inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-primary transition-colors group mb-10",
              "data-ocid": "back-to-writing",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 transition-transform group-hover:-translate-x-1" }),
                "Back to writing"
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.header,
        {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.1 },
          className: "mb-10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-5", "data-ocid": "article-tags", children: article.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "font-mono text-xs border-primary/30 text-primary/80 bg-primary/5",
                children: tag
              },
              tag
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight text-foreground text-glow-primary mb-6", children: article.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground leading-relaxed mb-6", children: article.excerpt }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-wrap items-center gap-4 text-sm font-mono text-muted-foreground",
                "data-ocid": "article-meta",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5 text-primary/60" }),
                    formattedDate
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border", children: "·" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 text-primary/60" }),
                    article.readTime,
                    " min read"
                  ] })
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-10 bg-border/50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.article,
        {
          initial: { opacity: 0, y: 32 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 },
          className: "prose-none text-base",
          "data-ocid": "article-body",
          children: contentNodes
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.5, delay: 0.4 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-12 bg-border/50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-10 flex-wrap gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/",
                  hash: "writing",
                  className: "inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-primary transition-colors group",
                  "data-ocid": "footer-back-writing",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 transition-transform group-hover:-translate-x-1" }),
                    "All articles"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground/50", children: "// EOF" })
            ] }),
            related.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground mb-4 uppercase tracking-widest", children: "// More from the blog" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "grid sm:grid-cols-2 gap-4",
                  "data-ocid": "related-articles",
                  children: related.map((rel) => /* @__PURE__ */ jsxRuntimeExports.jsx(RelatedArticleCard, { article: rel }, rel.id))
                }
              )
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  BlogPost as default
};
