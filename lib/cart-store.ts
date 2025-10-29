import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CartItem {
  productId: number
  productVariantId: number
  title: string
  price: number
  quantity: number
  size?: string
  color?: string
  imageUrl?: string
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productVariantId: number) => void
  updateQuantity: (productVariantId: number, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.productVariantId === item.productVariantId)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productVariantId === item.productVariantId ? { ...i, quantity: i.quantity + item.quantity } : i,
              ),
            }
          }
          return { items: [...state.items, item] }
        }),
      removeItem: (productVariantId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productVariantId !== productVariantId),
        })),
      updateQuantity: (productVariantId, quantity) =>
        set((state) => ({
          items: state.items.map((i) => (i.productVariantId === productVariantId ? { ...i, quantity } : i)),
        })),
      clearCart: () => set({ items: [] }),
      getTotalPrice: () => {
        const state = get()
        return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
      },
      getTotalItems: () => {
        const state = get()
        return state.items.reduce((total, item) => total + item.quantity, 0)
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)
