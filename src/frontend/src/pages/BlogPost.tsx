import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { articles } from "@/data/articles";
import { getArticleJsonLD, updateSEO } from "@/lib/seo";
import type { Article } from "@/types";
import { useParams } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Clock, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo } from "react";

/** Converts lightweight markdown to HTML-safe JSX tree segments */
function parseContent(raw: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const lines = raw.split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      nodes.push(
        <h2
          key={i}
          className="text-3xl lg:text-4xl font-display font-bold mt-10 mb-4 text-primary text-glow-primary"
        >
          {parseLine(line.slice(3))}
        </h2>,
      );
    } else if (line.startsWith("### ")) {
      nodes.push(
        <h3
          key={i}
          className="text-2xl lg:text-3xl font-display font-semibold mt-8 mb-3 text-foreground"
        >
          {parseLine(line.slice(4))}
        </h3>,
      );
    } else if (line.startsWith("```")) {
      // collect code block
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      nodes.push(
        <div key={`code-${i}`} className="relative my-6 group">
          <div className="absolute inset-0 rounded-lg bg-primary/5 border border-primary/20 glow-primary opacity-50" />
          <pre className="relative overflow-x-auto rounded-lg bg-card border border-border p-5 font-mono text-base leading-relaxed text-primary/90 scrollbar-thin">
            <code>{codeLines.join("\n")}</code>
          </pre>
        </div>,
      );
    } else if (line.startsWith("| ")) {
      // table block
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      nodes.push(<TableBlock key={`table-${i}`} lines={tableLines} />);
      continue;
    } else if (line.startsWith("- ")) {
      // list items
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      nodes.push(
        <ul key={`ul-${i}`} className="my-4 space-y-2 pl-0">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-lg text-foreground/85 leading-relaxed"
            >
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              <span>{parseLine(item)}</span>
            </li>
          ))}
        </ul>,
      );
      continue;
    } else if (line.match(/^\d+\. /)) {
      // ordered list
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        items.push(lines[i].replace(/^\d+\. /, ""));
        i++;
      }
      nodes.push(
        <ol
          key={`ol-${i}`}
          className="my-4 space-y-2 pl-0 counter-reset-[item]"
        >
          {items.map((item, j) => (
            <li
              key={item}
              className="flex items-start gap-3 text-lg text-foreground/85 leading-relaxed"
            >
              <span className="mt-0.5 font-mono text-sm text-primary/70 w-5 shrink-0 pt-1">
                {j + 1}.
              </span>
              <span>{parseLine(item)}</span>
            </li>
          ))}
        </ol>,
      );
      continue;
    } else if (line.trim() === "") {
      // skip blank
    } else {
      nodes.push(
        <p key={i} className="my-4 text-foreground/80 leading-relaxed text-lg">
          {parseLine(line)}
        </p>,
      );
    }

    i++;
  }

  return nodes;
}

function parseLine(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const inner = part.slice(2, -2);
      return (
        <strong key={inner} className="font-semibold text-foreground">
          {inner}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      const inner = part.slice(1, -1);
      return (
        <code
          key={inner}
          className="font-mono text-sm text-accent bg-accent/10 px-1.5 py-0.5 rounded border border-accent/20"
        >
          {inner}
        </code>
      );
    }
    return part;
  });
}

function TableBlock({ lines }: { lines: string[] }) {
  const rows = lines
    .filter((l) => !l.match(/^\|[-| ]+\|$/))
    .map((l) =>
      l
        .split("|")
        .slice(1, -1)
        .map((c) => c.trim()),
    );
  if (rows.length === 0) return null;
  const [header, ...body] = rows;

  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-card">
            {header.map((cell) => (
              <th
                key={cell}
                className="px-4 py-3 text-left font-mono text-xs font-semibold text-primary uppercase tracking-wider"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row) => (
            <tr
              key={row.join("|")}
              className="border-b border-border/50 last:border-0 hover:bg-card/50 transition-colors"
            >
              {row.map((cell) => (
                <td key={cell} className="px-4 py-3 text-foreground/80">
                  {parseLine(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RelatedArticleCard({ article }: { article: Article }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: article.slug }}
      className="group block p-4 rounded-lg border border-border bg-card hover:border-primary/40 hover:glow-primary transition-smooth"
      data-ocid="related-article-card"
    >
      <p className="text-xs font-mono text-muted-foreground mb-2">
        {new Date(article.date).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })}{" "}
        · {article.readTime} min read
      </p>
      <h4 className="text-sm font-display font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
        {article.title}
      </h4>
      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground group-hover:text-primary/70 transition-colors">
        <ExternalLink className="w-3 h-3" />
        <span>Read article</span>
      </div>
    </Link>
  );
}

export default function BlogPost() {
  const { slug } = useParams({ from: "/blog/$slug" });

  const article = useMemo(() => articles.find((a) => a.slug === slug), [slug]);

  const related = useMemo(
    () => articles.filter((a) => a.slug !== slug).slice(0, 2),
    [slug],
  );

  useEffect(() => {
    if (!article) return;
    updateSEO({
      title: article.title,
      description: article.excerpt,
      canonical: `https://www.shahidster.tech/blog/${article.slug}`,
      type: "article",
      publishedTime: article.date,
      tags: article.tags,
    });

    const jsonLd = getArticleJsonLD({
      title: article.title,
      description: article.excerpt,
      date: article.date,
      url: `https://www.shahidster.tech/blog/${article.slug}`,
    });

    let el = document.getElementById("article-jsonld");
    if (!el) {
      el = document.createElement("script");
      el.id = "article-jsonld";
      (el as HTMLScriptElement).type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = jsonLd;

    return () => {
      document.getElementById("article-jsonld")?.remove();
    };
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background">
        <div className="font-mono text-primary text-sm border border-primary/30 rounded-lg px-6 py-4 bg-card glow-primary">
          {"// 404: article not found"}
        </div>
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to home
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const contentNodes = parseContent(article.content);

  return (
    <div className="min-h-screen bg-background">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-accent/4 blur-[100px]" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Back navigation */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/"
            hash="writing"
            className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-primary transition-colors group mb-10"
            data-ocid="back-to-writing"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to writing
          </Link>
        </motion.div>

        {/* Article header */}
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5" data-ocid="article-tags">
            {article.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="font-mono text-xs border-primary/30 text-primary/80 bg-primary/5"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight text-foreground text-glow-primary mb-6">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            {article.excerpt}
          </p>

          {/* Meta row */}
          <div
            className="flex flex-wrap items-center gap-4 text-sm font-mono text-muted-foreground"
            data-ocid="article-meta"
          >
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary/60" />
              {formattedDate}
            </span>
            <span className="text-border">·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary/60" />
              {article.readTime} min read
            </span>
          </div>
        </motion.header>

        <Separator className="mb-10 bg-border/50" />

        {/* Article body */}
        <motion.article
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose-none text-base"
          data-ocid="article-body"
        >
          {contentNodes}
        </motion.article>

        {/* Footer divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Separator className="my-12 bg-border/50" />

          {/* Back link */}
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <Link
              to="/"
              hash="writing"
              className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-primary transition-colors group"
              data-ocid="footer-back-writing"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              All articles
            </Link>
            <p className="text-xs font-mono text-muted-foreground/50">
              {"// EOF"}
            </p>
          </div>

          {/* Related articles */}
          {related.length > 0 && (
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-4 uppercase tracking-widest">
                {"// More from the blog"}
              </p>
              <div
                className="grid sm:grid-cols-2 gap-4"
                data-ocid="related-articles"
              >
                {related.map((rel) => (
                  <RelatedArticleCard key={rel.id} article={rel} />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
