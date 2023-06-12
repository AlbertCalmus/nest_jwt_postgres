export class UserDto {
  id: number;
  phoneNumber: string;

  constructor(id: number, phoneNumber: string) {
    this.id = id;
    this.phoneNumber = phoneNumber;
  }
}
