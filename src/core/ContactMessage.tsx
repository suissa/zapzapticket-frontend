export class ContactMessage {
  type: string;
  typeMessage: string;
  text: string;
  createdAt: Date;
  phone: string;

  constructor(
    type: string = "sent",
    typeMessage: string = "text",
    text: string = "",
    createdAt: Date = new Date(),
    phone: string = ""
  ) {
    this.type = type;
    this.typeMessage = typeMessage;
    this.text = text;
    this.createdAt = createdAt;
    this.phone = phone;
  }
}