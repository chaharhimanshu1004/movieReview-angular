import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import * as cors from 'cors';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { Movie } from './movie/movie.entity';
import { MovieService } from './movie/movie.service';
import { MovieModule } from './movie/movie.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'sqlite',
        database: 'db.sqlite',
        entities: [User,Movie],
        synchronize: true,
        logging: true,
    }), 
    // PostModule,
    UserModule,
    MovieModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly movieService: MovieService) {}

  // async onModuleInit() {
  //   await this.movieService.seedMovies();
  // }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}


