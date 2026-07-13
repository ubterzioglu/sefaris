# syntax=docker/dockerfile:1

# ---- Build ----
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN --mount=type=cache,target=/root/.m2 mvn -B -q -T 1C dependency:go-offline
COPY src ./src
RUN --mount=type=cache,target=/root/.m2 mvn -B -q -T 1C package -Dmaven.test.skip=true

# ---- Runtime ----
FROM eclipse-temurin:21-jre-alpine AS runtime
WORKDIR /app
ENV SPRING_PROFILES_ACTIVE=postgres

RUN apk add --no-cache wget tini

RUN addgroup --system --gid 1001 spring \
  && adduser --system --uid 1001 spring
COPY --from=build --chown=spring:spring /app/target/sefaris-backend-*.jar app.jar
USER spring
EXPOSE 8080

ENV JAVA_OPTS="-XX:MaxRAMPercentage=75.0"

# NOT: context-path /api/v1 olduğu için healthcheck URL'si de buna göre ayarlandı
# Healthcheck kaldırıldı — Coolify kendi healthcheck'ini kullanıyor
# HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
#   CMD wget -qO- http://127.0.0.1:8080/api/v1/actuator/health/liveness || exit 1

ENTRYPOINT ["tini", "--"]
CMD ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]