export type MessageType = {
    content?: string,
    imageUrl?: string,
    createdAt: string,
    from: { id: string, name: string, avatar: string | null },
    id: string
    roomId: string
    userName: string
    tool?: {
        id: string
        highlight?: string
        value: string
        text: string
        image: 'action' | 'question' | 'sentences'
        color: string
    }
}
