import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { JwtAuthGuard } from '@src/auth/jwt-auth.guard';

const start = async () => {
  const PORT = process.env.PORT || 3002;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Nest js course')
    .setDescription('REST Api documentation')
    .setVersion('1.0.0')
    .addTag('Collapsed')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
};

start();
