'use client';

import { useState } from 'react';
import { Product, CartItem } from '@/types';
import { availableExtras } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { formatCurrency } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'; // Quitamos SheetTrigger de aquí

interface ProductConfiguratorProps {
  product: Product;
}

export function ProductConfigurator({ product }: ProductConfiguratorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSauces, setSelectedSauces] = useState<string[]>([]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  
  const addToCart = useCartStore((state) => state.addToCart);

  const handleToggle = (item: string, list: string[], setList: (val: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      ...product,
      cartItemId: crypto.randomUUID(), 
      quantity: 1,
      selectedSauces,
      selectedToppings,
      totalItemPrice: product.price,
    };

    addToCart(cartItem);
    setIsOpen(false);
    setSelectedSauces([]);
    setSelectedToppings([]);
  };

  return (
    <>
      <Button 
        className="w-full font-bold" 
        onClick={() => setIsOpen(true)}
      >
        Configurar y Agregar
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="flex w-full flex-col sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Configura tu {product.name}</SheetTitle>
            <SheetDescription>
              Elige tus salsas y toppings para acompañar nuestra crema de la casa.
            </SheetDescription>
          </SheetHeader>

          <ScrollArea className="flex-1 py-4 pr-4">
            <div className="mb-6">
              <h4 className="mb-3 font-semibold text-slate-900">Salsas</h4>
              <div className="flex flex-col gap-4">
                {availableExtras.sauces.map((sauce) => (
                  <div key={sauce} className="flex items-center space-x-2">
                    <Checkbox
                      id={`sauce-${sauce}`}
                      checked={selectedSauces.includes(sauce)}
                      onCheckedChange={() => handleToggle(sauce, selectedSauces, setSelectedSauces)}
                    />
                    <Label htmlFor={`sauce-${sauce}`} className="cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {sauce}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-3 font-semibold text-slate-900">Toppings</h4>
              <div className="flex flex-col gap-4">
                {availableExtras.toppings.map((topping) => (
                  <div key={topping} className="flex items-center space-x-2">
                    <Checkbox
                      id={`topping-${topping}`}
                      checked={selectedToppings.includes(topping)}
                      onCheckedChange={() => handleToggle(topping, selectedToppings, setSelectedToppings)}
                    />
                    <Label htmlFor={`topping-${topping}`} className="cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {topping}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>

          <SheetFooter className="mt-4 pb-6 sm:pb-0">
            <Button onClick={handleAddToCart} className="w-full font-bold">
              Agregar al carrito - {formatCurrency(product.price)}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}