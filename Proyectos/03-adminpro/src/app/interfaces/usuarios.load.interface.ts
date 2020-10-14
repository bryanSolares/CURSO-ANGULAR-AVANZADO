import { Usuario } from '../models/usuario.model';
export interface UsersLoad {
  count: number;
  users: Usuario[];
}
