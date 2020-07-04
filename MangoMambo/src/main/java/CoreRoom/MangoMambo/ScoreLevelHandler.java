package CoreRoom.MangoMambo;

import java.io.IOException;
import java.util.Map;
import java.util.Calendar;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class ScoreLevelHandler extends TextWebSocketHandler{

    ObjectMapper mapper = new ObjectMapper();
    private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

    private Map<String, Timer> timers = new ConcurrentHashMap<>();
    private Map<String, Long> timerCheck = new ConcurrentHashMap<>();
    
    private final String TYPE_CHECK = "check";
    private final String TYPE_EVENT = "event";
    private final String TYPE_CONNECT = "connect";
    private final String TYPE_LEAVE = "leave";

    private int numPlayers = 0;

    @Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
	}
    
    @Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
	}
    
    @Override
    protected void handleTextMessage(WebSocketSession session,TextMessage message)throws Exception {
        JsonNode node = mapper.readTree(message.getPayload());
        String id = node.get("id").asText();
        String type = node.get("type").asText();

        if (!type.equals(TYPE_CHECK)) {
        	System.out.println("Message received in score level from player: "+ id + ", " + type);
        }

        switch (type) {
            case TYPE_CHECK:
            timerCheck.put(id, Calendar.getInstance().getTime().getTime());
            break;

            case TYPE_EVENT:
                String key = node.get("key").asText();
                String idx = node.get("idx").asText();
                
                // Si la tecla pulsada es "Escape", se desconecta al jugador de la partida
			    if (key.equals("Escape")) {
				    System.out.println("Session closed in score level: " + id);
				    sessions.remove(id);
				    System.out.println("Parando temporizadores del jugador "+id);
				    timers.get(id).cancel();
				    timerCheck.put(id, Long.parseLong("0"));
			    }
			    
			    ObjectNode responseNodeEvent = mapper.createObjectNode();
			    responseNodeEvent.put("type", TYPE_EVENT);
                responseNodeEvent.put("key", key);
			    responseNodeEvent.put("idx", idx);
			    responseNodeEvent.put("id", id);
        		for (WebSocketSession participant : sessions.values()) {
        			try {
                        synchronized(participant) {
                            participant.sendMessage(new TextMessage(responseNodeEvent.toString()));
                        }
        			}catch(Exception e) {
        				System.out.println("Catch, Event - " + e);
        			}
        		}
            break;

            case TYPE_CONNECT:
                // Se añade la sesión y se crean los temporizadores para la actualización
        		System.out.println("New session in score level: " + id);
        		sessions.put(id, session);
        		timers.put(id, new Timer());
        		timerCheck.put(id, Calendar.getInstance().getTime().getTime());
        		// Se llama a la función checkPlayer cada segundo, para comprobar si el jugador
        		// sigue conectado
        		timers.get(id).scheduleAtFixedRate(new TimerTask() {
        		    @Override
        		    public void run() {
        			    checkPlayer(id);
        		    }
                }, 1000, 1000);
                numPlayers = Integer.parseInt(node.get("numPlayers").asText());
            break;

            case TYPE_LEAVE:
                System.out.println("Session closed in score level: " + id);
                sessions.remove(id);
                numPlayers--;
        		System.out.println("Parando temporizadores del jugador " + id);
        		timers.get(id).cancel();
        		timerCheck.put(id, Long.parseLong("0"));
            break;
        
            default:
            break;
        }
    }

    public void checkPlayer(String idPlayer) {
    	long actualTime = Calendar.getInstance().getTime().getTime();
    	
    	if (actualTime - timerCheck.get(idPlayer) >= 5000) {
    		// El jugador lleva más de 5 segundos sin responder, por lo que se envía un
            // mensaje de desconexión
            numPlayers--;
    		ObjectNode responseNode = mapper.createObjectNode();
			responseNode.put("type", TYPE_LEAVE);
			responseNode.put("id", idPlayer);
			for (WebSocketSession participant : sessions.values()) {
				try {
					synchronized(participant) {
						participant.sendMessage(new TextMessage(responseNode.toString()));
					}
				}catch(Exception e) {
					System.out.println("Catch, Check - " + e);
				}
			}
			System.out.println("El jugador "+ idPlayer +" se ha desconectado");
			timers.get(idPlayer).cancel();
			System.out.println("Parando temporizadores del jugador " + idPlayer);
			timerCheck.put(idPlayer, Long.parseLong("0"));
			sessions.remove(idPlayer);
    	}
    }
}