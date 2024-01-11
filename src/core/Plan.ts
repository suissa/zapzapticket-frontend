export default class Plan {
  #_id: string
  #name: string
  #users: number
  #connections: number
  #queues: number
  #value: number
  #isActive: boolean

  constructor(id: string = null, name: string, users: number, connections: number, queues: number, value: number) {
    this.#_id = id || null;
    this.#name = name;
    this.#users = users;
    this.#connections = connections;
    this.#queues = queues;
    this.#value = value;
    this.#isActive = true;
  }

  static empty() {
    return new Plan(null, "", 1, 1, 1, 100);
  }

  get _id() {
    return this.#_id
  }

  get name() {
    return this.#name
  }

  get users() {
    return this.#users
  }

  get connections() {
    return this.#connections
  }

  get queues() {
    return this.#queues
  }

  get value() {
    return this.#value
  }

  get isActive() {
    return this.#isActive
  }

}