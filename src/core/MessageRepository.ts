import Message from "./Message";

export default interface MessageRepository {
  save(cliente: Message): Promise<Message>
  delete(cliente: Message): Promise<void>
  get(): Promise<Message[]>
  getAll(): Promise<Message[]>
}