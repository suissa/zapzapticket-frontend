type Participant = {
  id: string;
  admin: string | null;
};

export default class Group {
  #_id: string
  #subject: string
  #size: number
  #desc: boolean
  #participants: Participant[];
  #isActive: boolean;

  constructor(id: string = null, subject: string, size: number, isActive: boolean = true) {
    this.#_id = id
    this.#subject = subject
    this.#size = size
    this.#desc = false
    this.#isActive = isActive
  }

  static empty() {
    return new Group("", "", 0, false)
  }

  get _id() {
    return this.#_id
  }

  get subject() {
    return this.#subject
  }

  get size() {
    return this.#size
  }

  get desc() {
    return this.#desc
  }

  get participants() {
    return this.#participants
  }

  get isActive() {
    return this.#isActive
  }
}