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

public class Level1Handler extends TextWebSocketHandler{

    ObjectMapper mapper = new ObjectMapper();
    private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

    @Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("New session in level 1: " + session.getId());
		sessions.put(session.getId(), session);
	}
    
    @Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Session closed in level 1: " + session.getId());
		sessions.remove(session.getId());
	}
    
    @Override
    protected void handleTextMessage(WebSocketSession session,TextMessage message)throws Exception {
        System.out.println("Message received");

        JsonNode node = mapper.readTree(message.getPayload());
        ObjectNode responseNode = mapper.createObjectNode();

        /*String id = node.get("id").asText();
        String key = node.get("key").asText();
        System.out.println("Id: "+id+", Key: "+key);*/
        String level1 = node.get("level1").asText();

        String id = node.get("id").asText();

        responseNode.put("level1", level1);
        responseNode.put("id", id);

        if (level1 == "true"){
            String mangoTime = node.get("mangoTime").asText();
            String positionX = node.get("positionX").asText();
            String positionY = node.get("positionY").asText();
            String accelerationX = node.get("accelerationX").asText();
            String accelerationY = node.get("accelerationY").asText();

            responseNode.put("mangoTime", mangoTime);
            responseNode.put("positionX", positionX);
            responseNode.put("positionY", positionY);
            responseNode.put("accelerationX", accelerationX);
            responseNode.put("accelerationY", accelerationY);
        }

        for(WebSocketSession participant : sessions.values()) {
            if (participant.getId() != session.getId()){
                participant.sendMessage(new TextMessage(responseNode.toString()));
            }
		}
    }
}