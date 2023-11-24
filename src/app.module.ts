import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MollieModule } from './mollie/mollie.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import config from './config/configuration';

const conf = config();

@Module({
  imports: [
    AuthModule,
    MollieModule,

    // .env || https://docs.nestjs.com/techniques/configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),

    // Just free playground database
    // ElephantSQL: https://api.elephantsql.com/console/9ca44960-3a70-432b-a47d-5de3c46000d7/details
    TypeOrmModule.forRoot({
      type: conf.database.type as any,
      host: conf.database.host,
      port: conf.database.port,
      username: conf.database.username,
      password: conf.database.password,
      database: conf.database.name,
      // entities: [],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
