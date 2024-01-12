class Plan {
  _id: string;
  name: string;

  constructor(_id: string, name: string) {
    this._id = _id;
    this.name = name;
  }
}

export default class Company {
  #_id: string
  #name: string
  #phone: string
  #password: string
  #status: string
  #planId: Plan
  #planName: string
  #campaignsEnabled: boolean
  #dueDate: Date
  #recurrence: boolean
  #isActive: boolean

  constructor(id: string = null, name: string, phone: string, password: string,
    status: string, planId: Plan, dueDate: Date = new Date(), recurrence: boolean, planName: string = null) {
    this.#_id = id || null;
    this.#name = name;
    this.#phone = phone;
    this.#password = password;
    this.#status = status;
    this.#planId = planId;
    this.#campaignsEnabled = true;
    this.#dueDate = dueDate || new Date(); // Definindo valor padrão aqui, caso dueDate seja null/undefined
    this.#recurrence = recurrence;
    this.#isActive = true;
    this.#planName = planName;
  }

  static empty() {
    return new Company(null, "", "", "", "", new Plan(null, ""), new Date(), true, null);
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

  get campaignsEnabled() {
    return this.#campaignsEnabled
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

  get planName() {
    return this.#planName
  }

}