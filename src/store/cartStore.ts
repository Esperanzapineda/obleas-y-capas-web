import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartState } from './types';


export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item) => {
        set((state) => ({
          items: [...state.items, item],
        }));
      },

      removeFromCart: (cartItemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.cartItemId !== cartItemId),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.totalItemPrice, 0);
      },

      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'oblea-y-capas-cart',
    }
  )
);