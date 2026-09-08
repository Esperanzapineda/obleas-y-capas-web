/* eslint-disable react-hooks/set-state-in-effect */
'use client'
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { useEffect, useState } from 'react';

export function Navbar() {
  
  const getTotalItems = useCartStore((state) => state.getTotalItems);

  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

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
          {mounted && getTotalItems() > 0 && (
            <span className='absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white'>
              {getTotalItems()}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
}