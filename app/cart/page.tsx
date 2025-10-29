"use client"

import { useCart } from "@/lib/cart-store"
import Link from "next/link"
import Image from "next/image"
import { Trash2, Plus, Minus } from "lucide-react"
import styles from "./page.module.css"

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCart()
  const total = getTotalPrice()

  if (items.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <h1 className={styles.title}>Your Cart is Empty</h1>
        <p className={styles.emptyText}>Add some items to get started</p>
        <Link href="/" className={styles.continueButton}>
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Shopping Cart</h1>

      <div className={styles.grid}>
        {/* Cart Items */}
        <div className={styles.itemsSection}>
          <div className={styles.itemsList}>
            {items.map((item) => (
              <div key={item.productVariantId} className={styles.cartItem}>
                <div className={styles.itemImage}>
                  <Image
                    src={item.imageUrl || "/placeholder.svg?height=100&width=100&query=product"}
                    alt={item.title}
                    width={100}
                    height={100}
                  />
                </div>

                <div className={styles.itemDetails}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemVariant}>
                    {item.color} - Size {item.size}
                  </p>
                  <p className={styles.itemPrice}>PKR {item.price.toLocaleString()}</p>
                </div>

                <div className={styles.itemActions}>
                  <div className={styles.quantityControls}>
                    <button
                      onClick={() => updateQuantity(item.productVariantId, Math.max(1, item.quantity - 1))}
                      className={styles.quantityButton}
                    >
                      <Minus />
                    </button>
                    <span className={styles.quantity}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productVariantId, item.quantity + 1)}
                      className={styles.quantityButton}
                    >
                      <Plus />
                    </button>
                  </div>
                  <button onClick={() => removeItem(item.productVariantId)} className={styles.deleteButton}>
                    <Trash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className={styles.summarySection}>
          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            <div className={styles.summaryDetails}>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Subtotal</span>
                <span className={styles.summaryValue}>PKR {total.toLocaleString()}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Shipping</span>
                <span className={styles.summaryValue}>PKR 0</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Tax</span>
                <span className={styles.summaryValue}>PKR 0</span>
              </div>
            </div>
            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span className={styles.summaryTotalAmount}>PKR {total.toLocaleString()}</span>
            </div>
            <Link href="/checkout" className={styles.checkoutButton}>
              Proceed to Checkout
            </Link>
            <Link href="/" className={styles.continueShoppingButton}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
