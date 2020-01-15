package CoreRoom.MangoMambo;

// 10.10.144.80 Ip Ordenador Clase;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@SpringBootApplication
@EnableWebSocket
public class App implements WebSocketConfigurer
{
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry){
        registry.addHandler(chooseCharacterHandler(), "/ws-choose-character")
        .setAllowedOrigins("*");
        registry.addHandler(howToPlayHandler(), "/ws-how-to-play")
        .setAllowedOrigins("*");
    }

    @Bean
    public ChooseCharacterHandler chooseCharacterHandler(){
        return new ChooseCharacterHandler();
    }

     @Bean
    public HowToPlayHandler howToPlayHandler(){
        return new HowToPlayHandler();
    }

    public static void main( String[] args )
    {
    	SpringApplication.run(App.class, args);
    }
}
