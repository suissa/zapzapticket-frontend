import { ContactMessage } from "./ContactMessage";

export class Contact {
  #_id: string;
  #name: string;
  #phone: string;
  #status: string;
  #city: string;
  #state: string;
  #country: string;

  constructor(
    name: string = "",
    phone: string = "",
    status: string = "Lista fria",
    city: string = "",
    state: string = "",
    country: string = "",
    badges: string[] = [],
    messages: ContactMessage[] = [] // Assumindo que Message é uma classe ou interface definida
  ) {
    this.#name = name;
    this.#phone = phone;
    this.#status = status;
    this.#city = city;
    this.#state = state;
    this.#country = country;
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



  update(data: Partial<Contact>) {
    if (data.name !== undefined) this.#name = data.name;
    if (data.phone !== undefined) this.#phone = data.phone;
    if (data.status !== undefined) this.#status = data.status;
    if (data.city !== undefined) this.#city = data.city;
    if (data.state !== undefined) this.#state = data.state;
    if (data.country !== undefined) this.#country = data.country;
    if (data.badges !== undefined) this.#badges = data.badges;
    if (data.messages !== undefined) this.#messages = data.messages;
    if (data.isSelected !== undefined) this.#isSelected = data.isSelected;

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

