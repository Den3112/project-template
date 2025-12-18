# 🔌 API Route Patterns

## Basic Route

```typescript
// app/api/items/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { itemRepository } from '@/lib/repositories'
import { createItemSchema } from '@/lib/schemas'
import { logger } from '@/lib/logger'

export async function GET(req: NextRequest) {
  try {
    logger.info('Fetching items')
    const items = await itemRepository.list()
    return NextResponse.json({ data: items })
  } catch (error) {
    logger.error(error, 'Failed to fetch items')
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validated = createItemSchema.parse(body)
    
    logger.info({ item: validated }, 'Creating item')
    const item = await itemRepository.create(validated)
    
    return NextResponse.json({ data: item }, { status: 201 })
  } catch (error) {
    logger.error(error, 'Failed to create item')
    return NextResponse.json({ error: 'Failed to create item' }, { status: 400 })
  }
}
```

## Parameterized Route

```typescript
// app/api/items/[id]/route.ts
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const item = await itemRepository.getById(params.id)
    if (!item) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json({ data: item })
  } catch (error) {
    logger.error(error, 'Failed to fetch item')
    return NextResponse.json({ error: 'Failed to fetch item' }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()
    const validated = updateItemSchema.parse(body)
    
    const item = await itemRepository.update(params.id, validated)
    return NextResponse.json({ data: item })
  } catch (error) {
    logger.error(error, 'Failed to update item')
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await itemRepository.delete(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error(error, 'Failed to delete item')
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 })
  }
}
```

## Query Parameters

```typescript
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') ?? '1')
    const limit = parseInt(searchParams.get('limit') ?? '10')
    const query = searchParams.get('q')
    
    const params = {
      page,
      limit,
      query: query ?? undefined,
    }
    
    const result = await itemRepository.search(params)
    return NextResponse.json({ data: result })
  } catch (error) {
    logger.error(error, 'Search failed')
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}
```

## Error Handling

```typescript
import { DatabaseError, ValidationError, NotFoundError } from '@/lib/errors'

export async function GET(req: NextRequest) {
  try {
    // ...
  } catch (error) {
    if (error instanceof ValidationError) {
      logger.warn(error, 'Validation failed')
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    
    if (error instanceof NotFoundError) {
      logger.info('Item not found')
      return NextResponse.json(
        { error: 'Not found' },
        { status: 404 }
      )
    }
    
    if (error instanceof DatabaseError) {
      logger.error(error, 'Database error')
      return NextResponse.json(
        { error: 'Database error' },
        { status: 500 }
      )
    }
    
    logger.error(error, 'Unexpected error')
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

## Validation

```typescript
import { z } from 'zod'

const querySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  query: z.string().optional(),
})

export async function GET(req: NextRequest) {
  try {
    const params = querySchema.parse({
      page: req.nextUrl.searchParams.get('page'),
      limit: req.nextUrl.searchParams.get('limit'),
      query: req.nextUrl.searchParams.get('q'),
    })
    
    // params is now type-safe
    return NextResponse.json({ data: [] })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
```

## Logging

```typescript
export async function POST(req: NextRequest) {
  const startTime = Date.now()
  
  try {
    const body = await req.json()
    logger.info({ body }, 'Creating item')
    
    const item = await itemRepository.create(body)
    const duration = Date.now() - startTime
    
    logger.info(
      { item, duration },
      'Item created successfully'
    )
    
    return NextResponse.json({ data: item }, { status: 201 })
  } catch (error) {
    const duration = Date.now() - startTime
    logger.error(
      { error, duration },
      'Failed to create item'
    )
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
```

---

**Keep API routes clean and focused!** 🔌
