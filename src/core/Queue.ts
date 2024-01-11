export default class Message {
  #_id: string
  #name: string
  #greeting: string
  #color: string
  #isActive: boolean

  constructor(color: string, name: string, id: string = null, greeting: string = "") {
    this.#_id = id
    this.#name = name
    this.#greeting = greeting
    this.#color = color
    this.#isActive = false
  }

  static empty() {
    return new Message("", "")
  }

  get _id() {
    return this.#_id
  }

  get name() {
    return this.#name
  }

  get greeting() {
    return this.#greeting
  }

  get color() {
    return this.#color
  }

  get isActive() {
    return this.#isActive
  }
}