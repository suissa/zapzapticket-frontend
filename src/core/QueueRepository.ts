import Queue from "./Queue";

export default interface QueueRepository {
  save(cliente: Queue): Promise<Queue>
  delete(cliente: Queue): Promise<void>
  get(): Promise<Queue[]>
  getAll(): Promise<Queue[]>
}