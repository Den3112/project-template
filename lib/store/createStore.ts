/**
 * createStore - Helper to create Zustand stores with common patterns
 */

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface StoreState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export interface StoreActions<T> {
  setData: (data: T) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

export type Store<T> = StoreState<T> & StoreActions<T>

/**
 * Create a simple store
 */
export function createSimpleStore<T>(
  name: string,
  initialData: T | null = null
) {
  return create<Store<T>>(
    devtools(
      (set) => ({
        data: initialData,
        loading: false,
        error: null,

        setData: (data: T) => set({ data, error: null }),
        setLoading: (loading: boolean) => set({ loading }),
        setError: (error: string | null) => set({ error, loading: false }),
        reset: () => set({ data: initialData, loading: false, error: null }),
      }),
      { name }
    )
  )
}

/**
 * Create a store with async operations
 */
export function createAsyncStore<T, P>(
  name: string,
  fetchFn: (params: P) => Promise<T>
) {
  return create<
    Store<T> & {
      fetch: (params: P) => Promise<void>
    }
  >(
    devtools(
      (set) => ({
        data: null,
        loading: false,
        error: null,

        setData: (data: T) => set({ data, error: null }),
        setLoading: (loading: boolean) => set({ loading }),
        setError: (error: string | null) => set({ error, loading: false }),
        reset: () => set({ data: null, loading: false, error: null }),

        fetch: async (params: P) => {
          set({ loading: true })
          try {
            const data = await fetchFn(params)
            set({ data, error: null })
          } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Unknown error' })
          } finally {
            set({ loading: false })
          }
        },
      }),
      { name }
    )
  )
}
