export default class Task {
  #_id: string
  #text: string
  #isActive: boolean

  constructor(text: string, id: string = null) {
    this.#_id = id
    this.#text = text
    this.#isActive = true
  }

  static empty() {
    return new Task("", "")
  }

  get _id() {
    return this.#_id
  }

  get text() {
    return this.#text
  }

  get isActive() {
    return this.#isActive
  }

}