import { environment } from '../../environments/environment';
const base_URL = environment.base_URL;
export class Usuario {
  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public uid?: string,
    public role?: string
  ) {}

  get imageURL(): string {
    if (this.img && this.img.includes('https')) {
      return this.img;
    }

    return this.img
      ? `${base_URL}/uploads/usuarios/${this.img}`
      : `${base_URL}/uploads/usuarios/no-image`;
  }
}
