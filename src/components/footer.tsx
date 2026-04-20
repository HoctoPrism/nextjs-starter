export function Footer() {
  return (
    <footer className="border-t py-6">
      <div className="text-muted-foreground container mx-auto px-4 text-center text-sm">
        NextJS Starter — {new Date().getFullYear()}
      </div>
    </footer>
  );
}
