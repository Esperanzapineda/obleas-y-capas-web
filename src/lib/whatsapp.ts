import { CartItem } from '@/types';
import { formatCurrency } from './format';

export interface CustomerData {
  name: string;
  address: string;
  paymentMethod: string;
  notes?: string;
}

export const generateWhatsAppLink = (
  items: CartItem[],
  total: number,
  customer: CustomerData
) => {
  
  const phoneNumber = "573133229599"; 
  
  let message = `¡Hola Oblea & Capas! 🍨\nQuiero hacer el siguiente pedido:\n\n`;
  
  items.forEach((item) => {
    message += `*${item.quantity}x ${item.name}* - ${formatCurrency(item.totalItemPrice)}\n`;
    if (item.selectedSauces && item.selectedSauces.length > 0) {
      message += `   Salsas: ${item.selectedSauces.join(', ')}\n`;
    }
    if (item.selectedToppings && item.selectedToppings.length > 0) {
      message += `   Toppings: ${item.selectedToppings.join(', ')}\n`;
    }
  });
  
  message += `\n*Total a pagar: ${formatCurrency(total)}*\n\n`;
  message += `*Datos de entrega:*\n`;
  message += `👤 Nombre: ${customer.name}\n`;
  message += `📍 Dirección: ${customer.address} (Tunja)\n`;
  message += `💳 Método de pago: ${customer.paymentMethod.toUpperCase()}\n`;
  
  if (customer.notes) {
    message += `📝 Notas adicionales: ${customer.notes}\n`;
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};