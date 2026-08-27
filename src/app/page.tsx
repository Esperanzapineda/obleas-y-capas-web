
import { products } from '@/data/products';
import { ProductCard } from '@/components/store/ProductCard';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Nuestros Bowls 🍨
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Capa tras capa de oblea crujiente, nuestra crema de la casa y tus sabores favoritos.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}