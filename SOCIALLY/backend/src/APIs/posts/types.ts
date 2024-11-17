// src/features/posts/types.ts

export type PostCreateRequest = {
    title: string
    content: string
}

export type PostUpdateRequest = {
    title?: string
    content?: string
}
