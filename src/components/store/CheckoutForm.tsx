'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useCartStore } from "@/store/cartStore";
import { generateWhatsAppLink, CustomerData } from "@/lib/whatsapp";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  address: z.string().min(5, { message: "Por favor ingresa una dirección completa." }),
  paymentMethod: z.enum(["nequi", "daviplata", "efectivo"], {
    message: "Debes seleccionar un método de pago.",
  }),
  notes: z.string().optional(),
});

interface CheckoutFormProps {
  onBack: () => void;
  onSuccess: () => void;
}

export function CheckoutForm({ onBack, onSuccess }: CheckoutFormProps) {
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const link = generateWhatsAppLink(items, getTotalPrice(), values as CustomerData);

    clearCart();
    onSuccess();

    window.open(link, "_blank");
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onBack} className="h-8 w-8">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h3 className="font-bold text-lg">Datos de Entrega</h3>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-1 flex-col gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
               <FormItem>
                 <FormLabel>Nombre y Apellido</FormLabel>
                 <FormControl>
                   <Input placeholder="Ej: Juan Pérez" {...field} />
                 </FormControl>
                 <FormMessage />
               </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
               <FormItem>
                 <FormLabel>Dirección (Tunja)</FormLabel>
                 <FormControl>
                   <Input placeholder="Ej: Calle 12 #34-56, Apto 201" {...field} />
                 </FormControl>
                 <FormMessage />
               </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Método de Pago</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl><RadioGroupItem value="nequi" /></FormControl>
                      <FormLabel className="font-normal">Nequi</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl><RadioGroupItem value="daviplata" /></FormControl>
                      <FormLabel className="font-normal">Daviplata</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl><RadioGroupItem value="efectivo" /></FormControl>
                      <FormLabel className="font-normal">Efectivo contra entrega</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
               <FormItem>
                 <FormLabel>Notas (Opcional)</FormLabel>
                 <FormControl>
                   <Textarea placeholder="Ej: Timbre dañado, llamar al llegar..." className="resize-none" {...field} />
                 </FormControl>
                 <FormMessage />
               </FormItem>
            )}
          />

          <div className="mt-auto pt-4 border-t">
             <Button type="submit" className="w-full bg-green-600 font-bold text-white hover:bg-green-700">
               Enviar Pedido a WhatsApp
             </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}