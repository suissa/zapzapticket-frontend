export default class Contact {
  #name: string;
  #phone: string;
  #status: string;
  #city: string;
  #state: string;
  #country: string;
  #ticketStatus: string;
  #ticketCreatedAt: string;
  #ticketClosedAt: string;
  #badges: string[];
  #messages: Message[]; // Assumindo que Message é uma classe ou interface definida

  constructor(
    name: string = "",
    phone: string = "",
    status: string = "Lista fria",
    city: string = "",
    state: string = "",
    country: string = "",
    ticketStatus: string = "inativo",
    ticketCreatedAt: string = "",
    ticketClosedAt: string = "",
    badges: string[] = [],
    messages: Message[] = [] // Assumindo que Message é uma classe ou interface definida
  ) {
    this.#name = name;
    this.#phone = phone;
    this.#status = status;
    this.#city = city;
    this.#state = state;
    this.#country = country;
    this.#ticketStatus = ticketStatus;
    this.#ticketCreatedAt = ticketCreatedAt;
    this.#ticketClosedAt = ticketClosedAt;
    this.#badges = badges;
    this.#messages = messages;
  }

  static empty() {
    return new Contact();
  }

  get name() {
    return this.#name;
  }

  get phone() {
    return this.#phone;
  }

  get status() {
    return this.#status;
  }

  // ... outros métodos getter para as propriedades restantes ...

  get badges() {
    return this.#badges;
  }

  get messages() {
    return this.#messages;
  }

}

export class Message {
  #type: string;
  #text: string;
  #createdAt: Date;
  #phoneReply: string;

  constructor(
    type: string = 'text',
    text: string = '',
    createdAt: Date = new Date(),
    phoneReply: string = ''
  ) {
    this.#type = type;
    this.#text = text;
    this.#createdAt = createdAt;
    this.#phoneReply = phoneReply;
  }

  get type() {
    return this.#type;
  }

  set type(value: string) {
    this.#type = value;
  }

  get text() {
    return this.#text;
  }

  set text(value: string) {
    this.#text = value;
  }

  get createdAt() {
    return this.#createdAt;
  }

  set createdAt(value: Date) {
    this.#createdAt = value;
  }

  get phoneReply() {
    return this.#phoneReply;
  }

  set phoneReply(value: string) {
    this.#phoneReply = value;
  }
}

