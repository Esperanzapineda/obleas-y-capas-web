import { Product } from "@/types";

export const products : Product[] = [
    {
        id: 'bowl-clasico',
        name: 'Bowl Clasico',
        description: 'Capas de oblea artesanal triturada con nuestra selección de cremas base y tu salsa favorita.',
        price: 8.000,
        imageUrl: '/images/bowl-clasico.jpg',
        category: 'bowl',
        isCustomizable: true,
    },
    {
        id: 'bowl-frutos-rojos',
        name: 'Bowl Tentación Mora',
        description: 'Nuestra especialidad. Capas crujientes bañadas en una reducción de mora artesanal, cremas y toppings a elección.',
        price: 10000,
        imageUrl: '/images/bowl-mora.jpg',
        category: 'bowl',
        isCustomizable: true,
    },
];

export const availableExtras = {
    sauces: ['Reducción de mora', 'Arequipe', 'Salsa de chocolate'],
    toppings: ['Leche condensada', 'Queso rrallado', 'Chips de chocolate', 'Mani triturado', 'Galleta Oreo'],
}