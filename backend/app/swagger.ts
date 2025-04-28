import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setUpSwagger(app: INestApplication): void {
  const documentBuilder = new DocumentBuilder()
    .setTitle("Task Management")
    .setDescription(
      "Task management handles creation of tasks",
    )
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        in: "header",
      },
      "bearerAuth",
    )
    .addSecurityRequirements("bearerAuth")
    .setContact("Rishu Anand", "-", "anand.rishu07@gmail.com");

  const config = documentBuilder.build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("swagger", app, document, {
    jsonDocumentUrl: "swagger.json",
    yamlDocumentUrl: "swagger.yaml",
  });
}
