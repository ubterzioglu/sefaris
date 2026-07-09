# syntax=docker/dockerfile:1

# ---- Build ----
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN --mount=type=cache,target=/root/.m2 mvn -B -q dependency:go-offline
COPY src ./src
RUN --mount=type=cache,target=/root/.m2 mvn -B -q clean package -DskipTests

# ---- Runtime ----
FROM eclipse-temurin:21-jre-alpine AS runtime
WORKDIR /app
ENV SPRING_PROFILES_ACTIVE=postgres
RUN addgroup --system --gid 1001 spring \
  && adduser --system --uid 1001 spring
COPY --from=build --chown=spring:spring /app/target/sefaris-backend-*.jar app.jar
USER spring
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/api/v1/public/team || exit 1

CMD ["java", "-jar", "app.jar"]
