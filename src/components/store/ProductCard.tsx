import Image from 'next/image';
import { Product } from '@/types';
import { formatCurrency } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-square w-full bg-slate-100">
        <div className="absolute inset-0 flex items-center justify-center text-slate-400">
          <span className="text-sm">Foto de {product.name}</span>
        </div>
      </div>

      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl leading-tight">{product.name}</CardTitle>
          <Badge variant="secondary" className="font-semibold text-primary">
            {formatCurrency(product.price)}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2 mt-2 text-sm">
          {product.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow">
        {product.isCustomizable && (
          <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
            Arma tu bowl
          </span>
        )}
      </CardContent>

      <CardFooter>
        <Button className="w-full font-bold">
          Configurar y Agregar
        </Button>
      </CardFooter>
    </Card>
  );
}