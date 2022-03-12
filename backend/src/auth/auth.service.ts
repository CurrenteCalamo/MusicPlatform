import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, pass: string) {
    const user = await this.userService.findOne(username);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }
  async login(user: any) {
    const payload = { username: user.username, sub: user.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
