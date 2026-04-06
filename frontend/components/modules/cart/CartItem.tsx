"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import type { CartItem as CartItemType } from "@/types/cart.types";
import styles from "./cart-item.module.scss";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { product, quantity } = item;
  const {
    incrementProductQuantity,
    decrementProductQuantity,
    removeProductFromCart,
  } = useCart();

  const handleIncrement = async () => {
    // Check stock limit before incrementing
    if (quantity < product.stock) {
      await incrementProductQuantity(product.id);
    } else {
      alert(`Only ${product.stock} items available in stock`);
    }
  };

  const handleDecrement = async () => {
    await decrementProductQuantity(product.id);
  };

  const handleRemove = async () => {
    if (window.confirm(`Remove ${product.name} from cart?`)) {
      await removeProductFromCart(product.id);
    }
  };

  const itemTotal = product.price * quantity;

  return (
    <div className={styles.cartItem}>
      <Link href={`/${product.id}`} className={styles.imageWrapper}>
        <Image
          src={
            product.imageUrl.trimEnd() ||
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80" ||
            "/placeholder.svg"
          }
          alt={product.name}
          width={120}
          height={120}
        />
      </Link>

      <div className={styles.details}>
        <div className={styles.info}>
          <Link href={`/${product.id}`} className={styles.name}>
            {product.name}
          </Link>
          <span className={styles.category}>{product.categoryId}</span>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
          {product.stock <= 5 && (
            <span className={styles.lowStock}>
              Only {product.stock} left in stock
            </span>
          )}
        </div>

        <div className={styles.actions}>
          <div className={styles.quantityControl}>
            <button
              onClick={handleDecrement}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className={styles.quantityButton}
            >
              −
            </button>
            <span className={styles.quantity}>{quantity}</span>
            <button
              onClick={handleIncrement}
              disabled={quantity >= product.stock}
              aria-label="Increase quantity"
              className={styles.quantityButton}
            >
              +
            </button>
          </div>

          <div className={styles.itemTotal}>${itemTotal.toFixed(2)}</div>

          <button
            onClick={handleRemove}
            className={styles.removeButton}
            aria-label="Remove item"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
