export default class User {
  #_id: string
  #title: string
  #text: string
  #isActive: boolean

  constructor(title: string, text: string, id: string = null) {
    this.#_id = id
    this.#title = text
    this.#text = text
    this.#isActive = false
  }

  static empty() {
    return new User("", "")
  }

  get id() {
    return this.#_id
  }

  get title() {
    return this.#title
  }

  get text() {
    return this.#text
  }

  get isActive() {
    return this.#isActive
  }
}