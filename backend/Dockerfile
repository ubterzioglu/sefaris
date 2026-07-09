# syntax=docker/dockerfile:1

# ---- Build ----
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
# 1) Sadece pom → bağımlılıkları çöz. Bu katman yalnızca pom.xml değişince
#    yeniden çalışır; kod değişikliklerinde cache'ten gelir.
COPY pom.xml .
RUN --mount=type=cache,target=/root/.m2 mvn -B -q -T 1C dependency:go-offline
# 2) Kaynak → paketle. Taze container'da "clean" gereksiz; test yok, derlemesini
#    de atla (-Dmaven.test.skip=true). -T 1C: çekirdek başına paralel derleme.
COPY src ./src
RUN --mount=type=cache,target=/root/.m2 mvn -B -q -T 1C package -Dmaven.test.skip=true

# ---- Runtime ----
FROM eclipse-temurin:21-jre-alpine AS runtime
WORKDIR /app
ENV SPRING_PROFILES_ACTIVE=postgres
RUN addgroup --system --gid 1001 spring \
  && adduser --system --uid 1001 spring
COPY --from=build --chown=spring:spring /app/target/sefaris-backend-*.jar app.jar
USER spring
EXPOSE 8080

# Kısa aralık → app açılınca "healthy" durumu hızlı yakalanır (deploy süresi düşer).
# start-period uzun tutulur: ilk açılışta Flyway migration + uzak DB bağlantısı sürebilir.
HEALTHCHECK --interval=10s --timeout=5s --start-period=30s --retries=6 \
  CMD wget -qO- http://127.0.0.1:8080/api/v1/public/team || exit 1

CMD ["java", "-jar", "app.jar"]
