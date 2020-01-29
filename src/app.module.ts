import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticalsModule } from './modules/articals/articals.module';
import { UsersModule } from './modules/users/users.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/tpl'),
    UsersModule,
    ArticalsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
