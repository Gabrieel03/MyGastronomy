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
      return {
        _id: user._id,
        email: user.email,
        role: user.role,
        name: user.name
      };
    }
    return null;
  }

  async login(user: any) {
    const payload = { 
      sub: user._id, 
      email: user.email, 
      role: user.role
    };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}