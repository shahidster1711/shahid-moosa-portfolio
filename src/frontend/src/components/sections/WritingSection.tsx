import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { articles } from "@/data/articles";
import type { Article } from "@/types";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { motion } from "motion/react";

function ArticleCard({ article, index }: { article: Article; index: number }) {
  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
    >
      <Link
        to="/blog/$slug"
        params={{ slug: article.slug }}
        className="block h-full"
        data-ocid={`article-card-${article.id}`}
      >
        <Card className="h-full bg-card border-border hover:border-primary/40 transition-smooth hover:shadow-glow-sm group cursor-pointer">
          <CardHeader className="pb-3">
            <div className="flex flex-wrap gap-1.5 mb-3">
              {article.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs sm:text-sm font-mono bg-muted/60 text-muted-foreground border-0"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <h3 className="font-display font-semibold text-xl lg:text-2xl text-foreground leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2">
              {article.title}
            </h3>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-muted-foreground text-base leading-relaxed line-clamp-3 mb-4">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between text-xs text-muted-foreground/70 font-mono">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {article.readTime} min read
                </span>
              </div>
              <span className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Read
                <ArrowRight className="w-3 h-3 translate-x-0 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

export function WritingSection() {
  return (
    <section id="writing" className="py-24 bg-muted/20">
      <div className="container max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="font-mono text-primary text-sm mb-3 tracking-widest uppercase">
            {"// Technical Writing"}
          </p>
          <h2 className="font-display text-4xl font-bold text-foreground mb-4">
            Deep Dives
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
            Long-form technical writing on distributed systems, database
            internals, and the hard-won lessons from operating systems at scale.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <ArticleCard key={article.id} article={article} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <p className="text-muted-foreground text-base font-mono">
            {"// More articles coming soon — subscribe via "}
            <a
              href="/rss.xml"
              className="text-primary hover:underline transition-smooth"
              target="_blank"
              rel="noopener noreferrer"
            >
              RSS feed
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
