export default class ScheduleMessage {
  #_id: string
  #text: string
  #from: string
  #to: string
  #isActive: boolean
  #sended: boolean
  #dateToSend: string

  constructor(text: string, id: string = null, from: string = null, to: string = null, isActive: boolean = false, sended: boolean = false) {
    this.#_id = id
    this.#text = text
    this.#from = from
    this.#to = to
    this.#isActive = isActive
    this.#sended = sended
  }

  static empty() {
    return new ScheduleMessage("", "")
  }

  get _id() {
    return this.#_id
  }

  get text() {
    return this.#text
  }

  get from() {
    return this.#from
  }

  get to() {
    return this.#to
  }

  get isActive() {
    return this.#isActive
  }

  get sended() {
    return this.#sended
  }

  get dateToSend() {
    return this.#dateToSend
  }
}