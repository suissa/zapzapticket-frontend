export default class User {
  #_id: string
  #name: string
  #phone: string
  #status: string
  #city: string
  #state: string
  #country: string
  #level: string
  #isActive: boolean
  #isConnected: boolean

  constructor(
    name: string, phone: string, id: string = null, status: string = "", 
    city: string = "", state: string = "", country: string = "", level: string = "",
    isActive: true, isConnected: false) {
    this.#_id = id
    this.#name = name
    this.#phone = phone
    this.#status = status
    this.#city = city
    this.#state = state
    this.#country = country
    this.#level = level
    this.#isActive = this.#isActive
    this.#isConnected = false
  }

  static empty() {
    return new User("", "")
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

  get status() {
    return this.#status
  }

  get city() {
    return this.#city
  }

  get state() {
    return this.#state
  }

  get country() {
    return this.#country
  }

  get level() {
    return this.#level
  }

  get isActive() {
    return this.#isActive
  }

  get isConnected() {
    return this.#isConnected
  }
}
