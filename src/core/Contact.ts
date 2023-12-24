export class Contact {
  #_id: string;
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
  #isSelected: boolean;

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

  get _id() {
    return this.#_id;
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

  get city() {
    return this.#city;
  }

  get state() {
    return this.#state;
  }

  get country() {
    return this.#country;
  }

  get ticketStatus() {
    return this.#ticketStatus;
  }

  get ticketCreatedAt() {
    return this.#ticketCreatedAt;
  }

  get ticketClosedAt() {
    return this.#ticketClosedAt;
  }


  get badges() {
    return this.#badges;
  }

  get messages() {
    return this.#messages;
  }

  get isSelected() {
    return this.#isSelected;
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

