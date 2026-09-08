import { CartItem } from "@/types";

export interface CartState {
    items: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (cartItemId: string) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
    getTotalItems: () => number;
  }