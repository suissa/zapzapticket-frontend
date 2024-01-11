class Card {
  #id: string;
  #title: string;
  #description: string;
  #label: string;
  #draggable: boolean;
  #metadata: any; // Ajuste este tipo conforme a necessidade real dos seus dados

  constructor(id: string, title: string, description: string, label: string, draggable: boolean, metadata: any) {
    this.#id = id;
    this.#title = title;
    this.#description = description;
    this.#label = label;
    this.#draggable = draggable;
    this.#metadata = metadata;
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  get description() {
    return this.#description;
  }

  get label() {
    return this.#label;
  }

  get draggable() {
    return this.#draggable;
  }

  get metadata() {
    return this.#metadata;
  }
}


export default class Lane {
  #id: string;
  #title: string;
  #label: string;
  #cards: Card[]; // Supondo que Card seja uma outra classe que você criou

  constructor(id: string, title: string, label: string, cards: Card[]) {
    this.#id = id;
    this.#title = title;
    this.#label = label;
    this.#cards = cards;
  }

  static empty() {
    return new Lane("", "", "", []);
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  get label() {
    return this.#label;
  }

  get cards() {
    return this.#cards;
  }
}
