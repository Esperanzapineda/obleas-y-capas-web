export type Category = 'bowl' | 'bebida' | 'adicional';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: Category;
    isCustomizable: boolean;
}

export interface CartItem extends Product {
    cartItemId: string;
    quantity: number;
    selectedSauces?: string[];
    selectedToppings?: string[];
    totalItemPrice: number;
}