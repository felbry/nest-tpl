import { Model } from 'mongoose';
import {
  Controller,
  Injectable,
  UseInterceptors,
  UploadedFile,
  Request,
  Get,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectModel } from '@nestjs/mongoose';

import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../constant';

import { Artical } from './artical.interface';
import { MulterFile } from '../multer-file.interface';

@Injectable()
@Controller('articals')
export class ArticalsController {
  constructor(
    @InjectModel('Artical') private readonly articalModel: Model<Artical>,
  ) {}

  @Get()
  @Roles([Role.Admin])
  @UseGuards(AuthGuard, RolesGuard)
  async getArticals(): Promise<Artical[]> {
    return await this.articalModel.find();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createArtical(
    @UploadedFile() file: MulterFile,
    @Body() artical: any,
    @Request() req,
  ): Promise<any> {
    // 这里是为了抛错，验证错误捕获机制
    return this.articalModel.create({
      title: '111',
    });
  }
}
