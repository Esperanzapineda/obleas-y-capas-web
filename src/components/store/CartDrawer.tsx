'use client';

import { useState } from 'react';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatCurrency } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <Button 
        variant="outline" 
        size="icon" 
        className="relative rounded-full"
        onClick={() => setIsOpen(true)}
      >
        <ShoppingBag className="h-5 w-5" />
        <span 
          suppressHydrationWarning
          className={`absolute -right-1 -top-1 h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white ${totalItems > 0 ? 'flex' : 'hidden'}`}
        >
          {totalItems}
        </span>
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="flex w-full flex-col sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Tu Pedido
            </SheetTitle>
          </SheetHeader>

          <ScrollArea className="flex-1 py-4 pr-4">
            {items.length === 0 ? (
              <div className="mt-20 flex h-full flex-col items-center justify-center space-y-2 text-slate-500">
                <ShoppingBag className="h-12 w-12 opacity-20" />
                <p>Tu carrito está vacío</p>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {items.map((item) => (
                  <div key={item.cartItemId} className="flex items-start justify-between gap-4 border-b pb-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900">{item.name}</h4>
                      
                      <div className="mt-1 text-sm text-slate-500">
                        {item.selectedSauces && item.selectedSauces.length > 0 && (
                          <p><span className="font-medium text-slate-700">Salsas:</span> {item.selectedSauces.join(', ')}</p>
                        )}
                        {item.selectedToppings && item.selectedToppings.length > 0 && (
                          <p><span className="font-medium text-slate-700">Toppings:</span> {item.selectedToppings.join(', ')}</p>
                        )}
                      </div>
                      
                      <div className="mt-2 font-medium text-amber-600">
                        {formatCurrency(item.totalItemPrice)}
                      </div>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-red-500 hover:bg-red-50 hover:text-red-600"
                      onClick={() => removeFromCart(item.cartItemId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          {items.length > 0 && (
            <SheetFooter className="mt-auto flex-col gap-4 border-t pt-4 sm:flex-col">
              <div className="flex items-center justify-between text-lg font-bold">
                <span>Total:</span>
                <span>{formatCurrency(getTotalPrice())}</span>
              </div>
              <Button className="w-full bg-green-600 font-bold text-white hover:bg-green-700">
                Proceder al Pago
              </Button>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}