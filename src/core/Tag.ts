export default class Message {
  #_id: string
  #name: string
  #color: string
  #isActive: boolean

  constructor(name: string, color: string, id: string = null) {
    this.#_id = id
    this.#name = name
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

  get color() {
    return this.#color
  }

  get isActive() {
    return this.#isActive
  }
}