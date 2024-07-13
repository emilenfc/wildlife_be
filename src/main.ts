import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //wew are going to use global validation pipe for validation in all our DTOs

  // we use whitelist: true to avoid unnecessary fields/properties from client requests,
  // where “non - whitelisted” means properties without any validation decorators.
  // It’s important to note that this option will filter all properties without validation decorators, even if they are defined in the DTO.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // We are going to use global class serializer interceptor
  // Interceptors in NestJS allow you to hook into
  // the request - response cycle and allow you to execute extra logic before
  // and after the route handler is executed. In this case,
  // we will use it to remove the "password" field from the
  // response body.
  // NestJS has a built-in ClassSerializerInterceptor that can be used to transform objects.
  // We will use this interceptor to remove the "password" field from the response object.
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  //here is to set up swagger document for API
  const config = new DocumentBuilder()
    .setTitle('Wildlife conservation Travel API')
    .setDescription('Wildlife conservation Travel API documantation')
    .setVersion('1.0')
    .addBearerAuth() //to add option for swagger to know that this is a protected route
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //for error handling
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

 await app.listen(process.env.PORT || 3000, () => {
  console.log(`Application is running on: http://localhost:${process.env.PORT || 3000}/api`);
});
}
bootstrap();
