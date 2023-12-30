import ScheduleMessage from "./ScheduleMessage";

export default interface ScheduleMessageRepository {
  save(cliente: ScheduleMessage): Promise<ScheduleMessage>
  delete(cliente: ScheduleMessage): Promise<void>
  get(): Promise<ScheduleMessage[]>
  getAll(): Promise<ScheduleMessage[]>
}