import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-8 transition-colors duration-300">
      {/* Theme toggle in top right */}
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-4xl">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Halo ini halaman utama
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            Selamat datang di aplikasi chat AI dengan tema orange
          </p>
        </div>
      </div>
    </div>
  );
}
