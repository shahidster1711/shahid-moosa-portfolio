import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background">
      <div className="text-center space-y-6 px-6">
        <div className="flex items-center justify-center gap-3 font-mono">
          <Terminal className="w-8 h-8 text-primary" />
          <span className="text-6xl font-display font-bold text-foreground">
            404
          </span>
        </div>
        <div className="space-y-2">
          <p className="font-mono text-primary text-sm">
            {"// error: page not found"}
          </p>
          <p className="text-muted-foreground max-w-sm mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <Link to="/">
          <Button className="bg-primary text-primary-foreground font-mono text-sm">
            {"$ cd ~/home"}
          </Button>
        </Link>
      </div>
    </div>
  );
}
