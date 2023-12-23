export type MessageType = {
    content: string,
    createdAt: string,
    from: { id: string, name: string, avatar: string | null },
    id: string
    roomId: string
    userName: string
}
