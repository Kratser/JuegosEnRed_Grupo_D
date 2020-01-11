package CoreRoom.MangoMambo;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class ChooseCharacterHandler extends TextWebSocketHandler{

    ObjectMapper mapper = new ObjectMapper();

    @Override
    protected void handleTextMessage(WebSocketSession session,TextMessage message)throws Exception {
        System.out.println("Message received: " + message.getPayload());

      
        JsonNode node = mapper.readTree(message.getPayload(););

        String id = node.get("id").asText();
        String key = node.get("key").asText();

        ObjectNode responseNode = mapper.createObjectNode();

        responseNode.put("id", id);
        responseNode.put("key", key);

        
        session.sendMessage(new TextMessage(responseNode.toString()));


}