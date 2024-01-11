import Company from "./Company";

export default interface CompanyRepository {
  save(cliente: Company): Promise<Company>
  delete(cliente: Company): Promise<void>
  get(): Promise<Company[]>
  getAll(): Promise<Company[]>
}