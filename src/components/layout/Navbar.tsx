import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tighter text-slate-900">
            Oblea<span className="text-amber-500">&</span>Capas
          </span>
        </div>

        <Button variant="outline" size="icon" className="relative rounded-full">
          <ShoppingBag className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
            0
          </span>
        </Button>
      </div>
    </header>
  );
}