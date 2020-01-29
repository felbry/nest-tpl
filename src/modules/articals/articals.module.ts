import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticalsController } from './articals.controller';
import { ArticalSchema } from './artical.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Artical', schema: ArticalSchema }]),
  ],
  controllers: [ArticalsController],
})
export class ArticalsModule {}
