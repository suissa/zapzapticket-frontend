export default class Company {
  #_id: string
  #name: string
  #phone: string
  #password: string
  #status: string
  #planId: string
  #dueDate: Date
  #recurrence: boolean
  #isActive: boolean

  constructor(id: string = null, name: string, phone: string, password: string,
    status: string, planId: string, dueDate: Date = new Date(), recurrence: boolean) {
    this.#_id = id || null;
    this.#name = name;
    this.#phone = phone;
    this.#password = password;
    this.#status = status;
    this.#planId = planId;
    this.#dueDate = dueDate || new Date(); // Definindo valor padrão aqui, caso dueDate seja null/undefined
    this.#recurrence = recurrence;
    this.#isActive = true;
  }

  static empty() {
    return new Company(null, "", "", "", "", "", new Date(), true);
  }

  get _id() {
    return this.#_id
  }

  get name() {
    return this.#name
  }

  get phone() {
    return this.#phone
  }

  get password() {
    return this.#password
  }

  get status() {
    return this.#status
  }

  get planId() {
    return this.#planId
  }

  get dueDate() {
    return this.#dueDate
  }

  get recurrence() {
    return this.#recurrence
  }

  get isActive() {
    return this.#isActive
  }

}