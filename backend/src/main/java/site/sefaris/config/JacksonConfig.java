package site.sefaris.config;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.ser.BeanSerializerModifier;
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;

/**
 * Enum'ları JSON'da lowercase göster / case-insensitive oku (rehber API sözleşmesi
 * lowercase kullanır: "open", "in_progress"). DB'de ise @Enumerated(STRING) → UPPERCASE.
 */
@Configuration
public class JacksonConfig {

    @Bean
    Jackson2ObjectMapperBuilderCustomizer enumLowerCaseCustomizer() {
        return builder -> {
            builder.featuresToEnable(MapperFeature.ACCEPT_CASE_INSENSITIVE_ENUMS);
            SimpleModule module = new SimpleModule();
            module.setSerializerModifier(new BeanSerializerModifier() {
                @Override
                public JsonSerializer<?> modifyEnumSerializer(SerializationConfig config, JavaType valueType,
                                                              BeanDescription beanDesc, JsonSerializer<?> serializer) {
                    return new JsonSerializer<Enum<?>>() {
                        @Override
                        public void serialize(Enum<?> value, JsonGenerator gen, SerializerProvider sp) throws IOException {
                            gen.writeString(value.name().toLowerCase());
                        }
                    };
                }
            });
            builder.modulesToInstall(module);
        };
    }
}
