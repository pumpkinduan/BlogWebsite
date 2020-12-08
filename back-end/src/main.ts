import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'common/filters'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('博客API')
    .setDescription('第一次使用Nest')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('v1-docs', app, document);
  await app.listen(5000);
}
bootstrap();
