import Plan from "./Plan";

export default interface PlanRepository {
  save(cliente: Plan): Promise<Plan>
  delete(cliente: Plan): Promise<void>
  get(): Promise<Plan[]>
  getAll(): Promise<Plan[]>
}