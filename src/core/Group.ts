type Participant = {
  id: string;
  admin: string | null;
};

export default class Group {
  #_id: string
  #subject: string
  #size: string
  #desc: boolean
  #participants: Participant[];

  constructor(subject: string, size: string, id: string = null) {
    this.#_id = id
    this.#subject = subject
    this.#size = size
    this.#desc = false
  }

  static empty() {
    return new Group("", "")
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
}