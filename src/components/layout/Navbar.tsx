import { CartDrawer } from "../store/CartDrawer";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tighter text-slate-900">
            Oblea<span className="text-amber-500">&</span>Capas
          </span>
        </div>

        <CartDrawer />
      </div>
    </header>
  );
}