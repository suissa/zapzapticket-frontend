import Connection from "./Connection";

export default interface ConnectionRepository {
  save(cliente: Connection): Promise<Connection>
  delete(cliente: Connection): Promise<void>
  get(): Promise<Connection[]>
  getAll(): Promise<Connection[]>
}