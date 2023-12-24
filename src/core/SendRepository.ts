import User from "./User";

export default interface UserRepository {
  save(user: User): Promise<User>
  delete(user: User): Promise<void>
  get(): Promise<User[]>
  getAll(): Promise<User[]>
}