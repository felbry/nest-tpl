import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Controller,
  Injectable,
  Post,
  Get,
  Body,
  UseGuards,
} from '@nestjs/common';
const jwt = require('jsonwebtoken');

import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../constant';

import { User } from './user.interface';
import { ReqRegistry } from './dto/registry.dto';
import { ReqLogin, ResLogin } from './dto/login.dto';
import { secretKey } from 'src/config';

@Injectable()
@Controller('users')
export class UsersController {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  @Post('login')
  async login(@Body() userInfo: ReqLogin): Promise<ResLogin> {
    const { qq, password } = userInfo;
    const userRet: User | null = await this.userModel
      .findOne({
        qq,
        password,
      })
      .exec();
    if (userRet) {
      return {
        token: jwt.sign(
          {
            id: userRet._id,
          },
          secretKey,
        ),
      } as ResLogin;
    } else {
      throw Error('qq或密码错误');
    }
  }

  @Post('registry')
  async registry(@Body() userInfo: ReqRegistry): Promise<User> {
    const { qq, password, nickName, email } = userInfo;
    const userRet: User | null = await this.userModel
      .findOne({
        qq,
      })
      .exec();
    if (userRet) {
      throw Error('用户已存在');
    } else {
      return this.userModel.create({
        email,
        password,
        nickName,
        qq,
      });
    }
  }

  @Get('info')
  @Roles([Role.Common])
  @UseGuards(AuthGuard, RolesGuard)
  async getInfo(): Promise<any> {
    return Promise.resolve({});
  }
}
