export default class Connection {
  #_id: string
  #name: string
  #phone: string
  #instanceName: string
  #instanceStatus: boolean

  constructor(name: string, phone: string, id: string = null, instanceName: string = null, instanceStatus: boolean = false) {
    this.#name = name
    this.#phone = phone
    this.#_id = id
  }

  static empty() {
    return new Connection("", "")
  }

  get id() {
    return this.#_id
  }

  get name() {
    return this.#name
  }

  get phone() {
    return this.#phone
  }

  get instanceName() {
    return this.#instanceName
  }

  get instanceStatus() {
    return this.#instanceStatus
  }
}