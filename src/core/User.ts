export default class User {
  #_id: string
  #name: string
  #email: string
  #phone: string
  #city: string
  #state: string
  #country: string
  #level: string
  #isActive: boolean
  #isConnected: boolean

  constructor(
    id: string = null, name: string, phone: string, email= "", 
    city: string = "", state: string = "", country: string = "", level: string = "") {
    this.#_id = id
    this.#email = email
    this.#name = name
    this.#phone = phone
    this.#city = city
    this.#state = state
    this.#country = country
    this.#level = level
    this.#isActive = true
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

  get email() {
    return this.#email
  }

  get phone() {
    return this.#phone
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
