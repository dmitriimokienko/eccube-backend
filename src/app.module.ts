import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MollieModule } from './mollie/mollie.module';
import {
  TypeOrmModule,
  // TypeOrmModuleOptions
} from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/configuration';

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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', // configService.get('DB_DIALECT') as TypeOrmModuleOptions['type'],
        url: configService.get('DB_HOST'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true, // entities: ['dist/**/*.entity.js'],
        synchronize: true, // TODO: shouldn't be used in production - otherwise you can lose production data.
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
