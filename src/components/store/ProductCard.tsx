import { Product } from '@/types';
import { formatCurrency } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { ProductConfigurator } from './ProductConfigurator';
import Image from 'next/image';


interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-square w-full bg-slate-100">
        <Image 
          src={product.imageUrl} 
          alt={`Foto de ${product.name}`} 
          fill
          className="object-cover" 
        />
      </div>

      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl text-amber-500 leading-tight">{product.name}</CardTitle>
          <Badge variant="secondary" className="font-semibold text-rose-600">
            {formatCurrency(product.price)}
          </Badge>
        </div>
        <CardDescription className="mt-2 line-clamp-2 text-sm">
          {product.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow">
        {product.isCustomizable && (
          <span className="rounded-full bg-rose-50 px-2 py-1 text-xs font-medium text-rose-600">
            Arma tu bowl
          </span>
        )}
      </CardContent>

      <CardFooter>
        {product.isCustomizable ? (
          <ProductConfigurator product={product} />
        ) : (
          <Button className="w-full font-bold">
            Agregar
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}