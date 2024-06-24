import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
    FastifyAdapter,
    NestFastifyApplication
} from '@nestjs/platform-fastify';
import { QueryExceptionFilter } from './filters/exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter()
    );
    app.useGlobalFilters(new QueryExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
}
bootstrap();
