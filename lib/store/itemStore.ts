/**
 * itemStore - Example store for items
 */

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface Item {
  id: string
  name: string
  description: string
  created_at: string
}

export interface ItemStore {
  items: Item[]
  loading: boolean
  error: string | null
  query: string

  setQuery: (query: string) => void
  fetchItems: () => Promise<void>
  addItem: (item: Item) => void
  removeItem: (id: string) => void
  reset: () => void
}

export const useItemStore = create<ItemStore>(
  devtools(
    (set) => ({
      items: [],
      loading: false,
      error: null,
      query: '',

      setQuery: (query: string) => set({ query }),

      fetchItems: async () => {
        set({ loading: true })
        try {
          const response = await fetch('/api/items')
          if (!response.ok) throw new Error('Failed to fetch')

          const { data } = await response.json()
          set({ items: data, error: null })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Unknown error',
          })
        } finally {
          set({ loading: false })
        }
      },

      addItem: (item: Item) =>
        set((state) => ({
          items: [...state.items, item],
        })),

      removeItem: (id: string) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      reset: () =>
        set({
          items: [],
          loading: false,
          error: null,
          query: '',
        }),
    }),
    { name: 'ItemStore' }
  )
)
