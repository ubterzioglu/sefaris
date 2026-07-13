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

# wget: healthcheck için. tini: PID 1 olarak sinyal yönetimi üstlenir,
# "docker stop" / rolling update sırasında SIGTERM'i JVM'e doğru iletir
# (tini olmadan JVM sert kesilebilir, graceful shutdown çalışmaz).
RUN apk add --no-cache wget tini

RUN addgroup --system --gid 1001 spring \
  && adduser --system --uid 1001 spring
COPY --from=build --chown=spring:spring /app/target/sefaris-backend-*.jar app.jar
USER spring
EXPOSE 8080

# Container'a resource limit konursa JVM heap'i buna göre otomatik ayarlar.
ENV JAVA_OPTS="-XX:MaxRAMPercentage=75.0"

# start-period=60s: Flyway migration + uzak DB bağlantısı (Hikari retry'leri)
# ilk açılışta 30sn'yi aşabiliyordu, bu erken "unhealthy" + rollback'e sebep oluyordu.
# liveness: sadece JVM/process ayakta mı kontrolü — DB'den bağımsız, bu yüzden
# DB henüz bağlanmamışken container haksız yere öldürülmez.
HEALTHCHECK --interval=10s --timeout=5s --start-period=60s --retries=6 \
  CMD wget -q --spider http://127.0.0.1:8080/api/v1/actuator/health/liveness || exit 1

ENTRYPOINT ["tini", "--"]
CMD ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]