import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { join } from 'path';
import { AppModule } from './app.module';
import { AppConfig, Cors, serverUrl, ValidationPipeConfig } from './config';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { PrismaClientExceptionFilter } from './filters/prisma-client-exception.filter';

const { prefix, uploadFolder, name } = AppConfig;

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.use(cookieParser());
    app.enableCors(Cors);
    app.use(`/${prefix}/${uploadFolder}`, express.static(join(process.cwd(), uploadFolder)));

    app.useGlobalPipes(new ValidationPipe(ValidationPipeConfig));

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
    app.useGlobalFilters(new HttpExceptionFilter());

    app.setGlobalPrefix(AppConfig.prefix);

    const config = new DocumentBuilder()
        .setTitle(name)
        .setDescription(`${name} API documentation`)
        .setVersion('1.0')
        .addTag('')
        .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' })
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);

    await app.listen(AppConfig.port);

    Logger.log(`🚀 Application is running on:  ${serverUrl}`);
}
bootstrap().catch((error) => {
    Logger.error('Error starting the application', error);
});
