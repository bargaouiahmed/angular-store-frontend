import { Injectable, signal } from "@angular/core";
import { Product } from "../models/products.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = signal<Product[]>([]);

  addToCart(product: Product) {
    // Find if the product already exists in the cart
    const existingProductIndex = this.cart().findIndex(p => p.id === product.id);

    if (existingProductIndex === -1) {
      // Product not in cart, add it with howManyInCart set to 1
      this.cart.update(currentCart => [
        ...currentCart,
        { ...product, howManyInCart: 1 }
      ]);
    } else {
      // Product exists, increment howManyInCart
      this.cart.update(currentCart => {
        const updatedCart = [...currentCart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          howManyInCart: updatedCart[existingProductIndex].howManyInCart + 1
        };
        return updatedCart;
      });
    }
  }

  removeFromCart(product: Product) {
    this.cart.update(currentCart => {
      // If product quantity is more than 1, decrease quantity
      const existingProductIndex = currentCart.findIndex(p => p.id === product.id);

      if (existingProductIndex !== -1) {
        const updatedCart = [...currentCart];
        const existingProduct = updatedCart[existingProductIndex];

        if (existingProduct.howManyInCart > 1) {
          // Decrease quantity
          existingProduct.howManyInCart -= 1;
          return updatedCart;
        } else {
          // Remove product entirely if quantity is 1
          return currentCart.filter(p => p.id !== product.id);
        }
      }

      return currentCart;
    });
  }

  removeItemFromCart(product: Product) {
    this.cart.update(currentCart =>
      currentCart.filter(p => p.id !== product.id)
    );
  }
  returnTotalPrice(): number {
    return this.cart().reduce(
      (acc: number, product:Product) => acc + product.price * product.howManyInCart,
      0,
    );
  }
  clearCart() {
    this.cart.set([]);
  }
}
