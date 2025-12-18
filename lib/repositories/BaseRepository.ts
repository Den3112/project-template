/**
 * BaseRepository - Base class for all repositories
 * Handles common operations: list, get, create, update, delete
 */

import { CacheService } from '@/lib/cache'

export interface BaseEntity {
  id: string
  created_at: string
  updated_at: string
}

export interface ListParams {
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
}

export abstract class BaseRepository<T extends BaseEntity> {
  protected tableName: string
  protected cache: CacheService

  constructor(tableName: string, cache: CacheService) {
    this.tableName = tableName
    this.cache = cache
  }

  /**
   * Get cache key for operation
   */
  protected getCacheKey(...parts: string[]): string {
    return `${this.tableName}:${parts.join(':')}`
  }

  /**
   * Invalidate all cache for this table
   */
  protected async invalidateCache(): Promise<void> {
    // In a real app, you'd track keys and invalidate them
    // For now, we'll skip this
  }

  /**
   * List all items (with pagination)
   */
  async list(params: ListParams = {}): Promise<T[]> {
    const { page = 1, limit = 10, sort = 'created_at', order = 'desc' } = params

    const cacheKey = this.getCacheKey('list', `page:${page}`, `limit:${limit}`)
    const cached = await this.cache.get(cacheKey)

    if (cached) return cached

    // Query database
    const offset = (page - 1) * limit
    const items = await this.queryDatabase(
      `SELECT * FROM ${this.tableName} ORDER BY ${sort} ${order} LIMIT $1 OFFSET $2`,
      [limit, offset]
    )

    await this.cache.set(cacheKey, items, 3600) // 1 hour
    return items
  }

  /**
   * Get single item by ID
   */
  async getById(id: string): Promise<T | null> {
    const cacheKey = this.getCacheKey('id', id)
    const cached = await this.cache.get(cacheKey)

    if (cached) return cached

    const item = await this.queryDatabaseSingle(
      `SELECT * FROM ${this.tableName} WHERE id = $1`,
      [id]
    )

    if (item) {
      await this.cache.set(cacheKey, item, 86400) // 24 hours
    }

    return item || null
  }

  /**
   * Create new item
   */
  async create(data: Omit<T, 'id' | 'created_at' | 'updated_at'>): Promise<T> {
    const id = this.generateId()
    const now = new Date().toISOString()

    const item: T = {
      ...data,
      id,
      created_at: now,
      updated_at: now,
    } as T

    await this.queryDatabase(
      `INSERT INTO ${this.tableName} VALUES ($1, $2, $3, $4)`,
      [id, JSON.stringify(data), now, now]
    )

    await this.invalidateCache()
    return item
  }

  /**
   * Update item
   */
  async update(
    id: string,
    data: Partial<Omit<T, 'id' | 'created_at' | 'updated_at'>>
  ): Promise<T> {
    const now = new Date().toISOString()

    const item = await this.getById(id)
    if (!item) throw new Error(`${this.tableName} not found: ${id}`)

    const updated = {
      ...item,
      ...data,
      updated_at: now,
    }

    await this.queryDatabase(
      `UPDATE ${this.tableName} SET data = $1, updated_at = $2 WHERE id = $3`,
      [JSON.stringify(data), now, id]
    )

    await this.invalidateCache()
    return updated
  }

  /**
   * Delete item
   */
  async delete(id: string): Promise<void> {
    await this.queryDatabase(
      `DELETE FROM ${this.tableName} WHERE id = $1`,
      [id]
    )

    await this.invalidateCache()
  }

  /**
   * Override these in child classes
   */
  protected async queryDatabase(query: string, params: any[]): Promise<any[]> {
    throw new Error('queryDatabase not implemented')
  }

  protected async queryDatabaseSingle(query: string, params: any[]): Promise<any | null> {
    throw new Error('queryDatabaseSingle not implemented')
  }

  protected generateId(): string {
    return `${this.tableName}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
}
