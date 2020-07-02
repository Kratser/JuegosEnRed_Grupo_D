package CoreRoom.MangoMambo;

import java.io.IOException;
import java.util.Calendar;
import java.util.Map;
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

public class HowToPlayHandler extends TextWebSocketHandler{

    ObjectMapper mapper = new ObjectMapper();
    private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
    private Map<String, Timer> timers = new ConcurrentHashMap<>();
	private Map<String, Long> timerCheck = new ConcurrentHashMap<>();
	
	private final String TYPE_CHECK = "check";
	private final String TYPE_EVENT = "event";
	private final String TYPE_CONNECT = "connect";
	private final String TYPE_LEAVE = "leave";

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
        System.out.println("Message received in How To Play from player " +id+", "+type);
        switch(type){
        	case TYPE_EVENT:
        		String key = node.get("key").asText();
        		System.out.println("Id: "+id+", Key: "+key);
        		ObjectNode responseNode = mapper.createObjectNode();
        		responseNode.put("type", TYPE_EVENT);
        		responseNode.put("id", id);
        		responseNode.put("key", key);
        		for (WebSocketSession participant : sessions.values()) {
        			try {
        				participant.sendMessage(new TextMessage(responseNode.toString()));
        			}catch(Exception e) {
        				System.out.println("Error de conexión - " + e);
        			}
        		}
			break;
				
        	case TYPE_CHECK:
        		timerCheck.put(id, Calendar.getInstance().getTime().getTime());
			break;
				
        	case TYPE_CONNECT:
        		// Se añade la sesión y se crean los temporizadores para la actualización
        		System.out.println("New session in how to play: " + id);
        		sessions.put(id, session);
        		timers.put(id, new Timer());
        		timerCheck.put(id, Calendar.getInstance().getTime().getTime());
        		// Se llama a la función checkPlayer cada segundo, para comprobar si el jugador
        		// sigue conectado
        		timers.get(id).scheduleAtFixedRate(new TimerTask() {
        		@Override
        		public void run() {
        			checkPlayer(id);
        			System.out.println(id +": Todo en orden");
        		}
        		}, 1000, 1000);
			break;
				
        	case TYPE_LEAVE:
        		System.out.println("Session closed in how to play: " + id);
        		sessions.remove(id);
        		System.out.println("Parando temporizadores del jugador "+id);
        		timers.get(id).cancel();
        		timerCheck.put(id, Long.parseLong("0"));
			break;
				
        	default:
        		System.out.println("Tipo de mensaje no controlado");
        	break;
        }
    }
    
    public void checkPlayer(String idPlayer) {
    	long actualTime = Calendar.getInstance().getTime().getTime();
    	
    	if (actualTime - timerCheck.get(idPlayer) >= 5000) {
    		// El jugador lleva más de 5 segundos sin responder, por lo que se envía un
    		// mensaje de desconexión
    		ObjectNode responseNode = mapper.createObjectNode();
			responseNode.put("type", TYPE_LEAVE);
			responseNode.put("id", idPlayer);
			for (WebSocketSession participant : sessions.values()) {
				try {
					participant.sendMessage(new TextMessage(responseNode.toString()));
				}catch(Exception e) {
					System.out.println("Sesión Cerrada - " + e);
				}
			}
			System.out.println("El jugador "+ idPlayer +" se ha desconectado");
			timers.get(idPlayer).cancel();
			timerCheck.put(idPlayer, Long.parseLong("0"));
			sessions.remove(idPlayer);
    	}
    }
}