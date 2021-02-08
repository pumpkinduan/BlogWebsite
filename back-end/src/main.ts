import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'common/filters';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
async function bootstrap() {
	/**
	 * 创建nest实例
	 */
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	/**
	 * 配置静态目录文件
	 */
	app.useStaticAssets(join(__dirname, '..', 'statics'), {
		prefix: '/statics/', // 访问静态目录的路由前缀
		extensions: ['jpg', 'jpeg', 'png', 'gif'],
	});

	/**
	 * 跨域
	 */
	app.enableCors();

	/**
	 * 全局管道
	 */
	app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

	/**
	 * 接口地址前缀
	 */
	app.setGlobalPrefix('v1');

	/**
	 * 全局过滤器
	 */
	app.useGlobalFilters(new HttpExceptionFilter());

	/**
	 * swagger 配置
	 */
	const options = new DocumentBuilder()
		.addBearerAuth()
		.setTitle('博客API')
		.setDescription('第一次使用Nest')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('v1-docs', app, document);

	/**
	 * 启用端口
	 */
	await app.listen(5000);
}
bootstrap();
