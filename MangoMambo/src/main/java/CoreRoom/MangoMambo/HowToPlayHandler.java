package CoreRoom.MangoMambo;

import java.io.IOException;
import java.util.Map;
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

    @Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("New session in how to play: " + session.getId());
		sessions.put(session.getId(), session);
	}
    
    @Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Session closed in how to play: " + session.getId());
		sessions.remove(session.getId());
	}
    
    @Override
    protected void handleTextMessage(WebSocketSession session,TextMessage message)throws Exception {
        System.out.println("Message received in how to play");

        JsonNode node = mapper.readTree(message.getPayload());

        String id = node.get("id").asText();
        String key = node.get("key").asText();
        System.out.println("Id: "+id+", Key: "+key);
        
        ObjectNode responseNode = mapper.createObjectNode();

        responseNode.put("id", id);
        responseNode.put("key", key);

        for(WebSocketSession participant : sessions.values()) {
            if(participant.getId()!= session.getId()){
                participant.sendMessage(new TextMessage(responseNode.toString()));
            }
		}
    }
}