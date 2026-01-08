import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/service/users.service';
import { BcryptService } from '../bcrypt/bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private bcryptService: BcryptService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user && (await this.bcryptService.compare(pass, user.password))) {
      // --- DEBUG ---
      console.log('DEBUG AUTH: Usuário encontrado no banco:', user);
      console.log('DEBUG AUTH: Role do usuário:', user.role);
      // -------------

      // Em vez de usar spread (...user), retornamos um objeto limpo e explícito
      return {
        _id: user._id,
        email: user.email,
        role: user.role, // <--- Garantindo que a role vai junto
        name: user.name
      };
    }
    return null;
  }

  async login(user: any) {
    // --- DEBUG ---
    console.log('DEBUG LOGIN: Usuário recebido para criar token:', user);
    // -------------

    const payload = { 
      sub: user._id, 
      email: user.email, 
      role: user.role // <--- Aqui é onde o Token ganha o poder
    };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}