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

import java.util.Timer;
import java.util.TimerTask;
import java.util.Calendar;

public class ChooseCharacterHandler extends TextWebSocketHandler {

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
		// Cuando un jugador establece conexión, manda un mensaje de tipo CONNECT, para 
		// así poder acceder a su id, y no al id de la sessión
	}
	
	// Método que se ejecuta cada segundo, y comprueba si los jugadores llevan
	// 5 segundos o más sin actualizar
	public void checkPlayer(String idPlayer) throws Exception {
		long actualTime = Calendar.getInstance().getTime().getTime();
		// Si lleva menos de 5 segundos sin actualizar, se hace un mensaje de eco para 
		// que el cliente actualice su tiempo
		if (actualTime - timerCheck.get(idPlayer) <= 5000) {
			ObjectNode responseNode = mapper.createObjectNode();
			responseNode.put("type", TYPE_CHECK);
			System.out.println("Checkeando al jugador " + idPlayer);
			try {
				sessions.get(idPlayer).sendMessage(new TextMessage(responseNode.toString()));
			}catch (Exception e) {
				// Si no se puede establecer la conexión con el cliente...
				System.out.println("Fallo de conexión,intentando reconectar, Error - "+e);
			}
		} else {
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

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		// Cuando un jugador cierra la conexión, se comprueba si ha ocurrido de
		// forma intencionada (pulsando "Escape", en "handleTextMessage") o por un fallo
		// de conexión (se comprueba a los 5 segundos en checkPlayer)
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		// Se recoge el id y el tipo de mensaje del cliente
		JsonNode node = mapper.readTree(message.getPayload());
		String type = node.get("type").asText();
		String id = node.get("id").asText();
		System.out.println("Message received in choose character from player " +id+", "+type);
		// Si el tipo de mensaje es de evento (el cliente pulsa alguna tecla)
		if (type.equals(TYPE_EVENT)) {
			String key = node.get("key").asText();
			System.out.println("Id: " + id + ", Key: " + key);
			// Si la tecla pulsada es "Escape", se desconecta al jugador de la partida
			if (key.equals("Escape")) {
				System.out.println("Session closed in choose character: " + id);
				sessions.remove(id);
				System.out.println("Parando temporizadores del jugador "+id);
				timers.get(id).cancel();
				timerCheck.put(id, Long.parseLong("0"));
			}
			// Se notifica a los jugadores de que el cliente ha abandonado la partida
			ObjectNode responseNode = mapper.createObjectNode();
			responseNode.put("type", TYPE_EVENT);
			responseNode.put("id", id);
			responseNode.put("key", key);
			for (WebSocketSession participant : sessions.values()) {
				participant.sendMessage(new TextMessage(responseNode.toString()));
			}
			// Si el tipo de mensaje es de actualización, se reinicia el tiempo de conexión
		} else if (type.equals(TYPE_CHECK)) {
			timerCheck.put(id, Calendar.getInstance().getTime().getTime());
			// Si el tipo de mensaje es de conexión
		} else if (type.equals(TYPE_CONNECT)) {
			// Se añade la sesión y se crean los temporizadores para la actualización
			System.out.println("New session in choose character: " + id);
			sessions.put(id, session);
			timers.put(id, new Timer());
			timerCheck.put(id, Calendar.getInstance().getTime().getTime());
			// Se llama a la función checkPlayer cada segundo, para comprobar si el jugador
			// sigue conectado
			timers.get(id).scheduleAtFixedRate(new TimerTask() {
				@Override
				public void run() {
					try {
						checkPlayer(id);
						System.out.println(id +": Todo en orden");
					} catch (Exception e) {
						e.printStackTrace();
						System.out.println(id +": Error");
					}
				}
			}, 1000, 1000);
		} else if (type.equals(TYPE_LEAVE)) {
			// El jugador ha pasado de pantalla
			System.out.println("Session closed in choose character: " + id);
			sessions.remove(id);
			timers.get(id).cancel();
			timerCheck.put(id, Long.parseLong("0"));
			
		}
	}
}