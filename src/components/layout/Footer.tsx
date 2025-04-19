export function Footer() {
  return (
    <footer className="site-footer py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏹</span>
            <span className="font-bold text-xl">Quiver</span>
          </div>
          
          <div className="text-sm text-muted-foreground text-center md:text-left max-w-md">
            All prompts and websites shown in the community are voluntarily shared by users. 
            The platform does not display any content without user consent.
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Quiver. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 