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

import java.util.concurrent.Semaphore;

public class Level1Handler extends TextWebSocketHandler{

    ObjectMapper mapper = new ObjectMapper();
    private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

    private Map<String, Timer> timers = new ConcurrentHashMap<>();
    private Map<String, Long> timerCheck = new ConcurrentHashMap<>();
    
    //private final String TYPE_CHECK = "check";
    private final String TYPE_UPDATE = "update";
    private final String TYPE_EVENT = "event";
    private final String TYPE_CONNECT = "connect";
    private final String TYPE_START = "start";
    private final String TYPE_READY = "ready";
    private final String TYPE_RESET = "reset";
    private final String TYPE_LEAVE = "leave";
    
    private int numPlayers = 0;
    // id del jugador que tiene el mango
    private int mango = -1;
    // Tiempo de robo del mango
    private long maxCollisionTime = 1000;
    private long collisionTime = 0;

    private Timer mangoUpdate = new Timer();
    private int mangoTime = 30;

    // Sincronización
    Semaphore mutex = new Semaphore(1);
    private int numPlayersWaiting = 0;

    @Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        //System.out.println("New session in level 1: " + session.getId());
		//sessions.put(session.getId(), session);
	}
    
    @Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		//System.out.println("Session closed in level 1: " + session.getId());
		//sessions.remove(session.getId());
	}
    
    @Override
    protected void handleTextMessage(WebSocketSession session,TextMessage message)throws Exception {
        JsonNode node = mapper.readTree(message.getPayload());
        String id = node.get("id").asText();
        String type = node.get("type").asText();

        System.out.println("Message received in level 1 from player: "+ id + ", " + type);
        
        switch (type) {
            case TYPE_UPDATE:
                // Se actualiza el tiempo y se reenvía la información
                timerCheck.put(id, Calendar.getInstance().getTime().getTime());
                float posX = Float.parseFloat(node.get("posX").asText());
                float posY = Float.parseFloat(node.get("posY").asText());
                float accX = Float.parseFloat(node.get("accX").asText());
                float accY = Float.parseFloat(node.get("accY").asText());
                ObjectNode responseNodeUpdate = mapper.createObjectNode();
		        responseNodeUpdate.put("type", TYPE_UPDATE);
		        responseNodeUpdate.put("id", id);
		        responseNodeUpdate.put("posX", posX);
		        responseNodeUpdate.put("posY", posY);
		        responseNodeUpdate.put("accX", accX);
		        responseNodeUpdate.put("accY", accY);
                for (WebSocketSession participant : sessions.values()) {
			        try {
			        	synchronized(participant) {
			        		participant.sendMessage(new TextMessage(responseNodeUpdate.toString()));
			        	}
			        }catch(Exception e) {
				        System.out.println("Catch, Update - " + e);
			        }
                }
                break;
        
            case TYPE_EVENT:
                mutex.acquire();
                String msg = node.get("msg").asText();
                ObjectNode responseNodeEvent = mapper.createObjectNode();
                responseNodeEvent.put("type", TYPE_EVENT);
                responseNodeEvent.put("msg", msg);
                switch (msg){
                    case "getMango":
                        if (mango == -1){
                            mango = Integer.parseInt(id);
                            mangoUpdate = new Timer();
                            mangoUpdate.scheduleAtFixedRate(new TimerTask() {
                                @Override
                                public void run() {
                                    updateMangoTime();
                                }
                            }, 1000, 1000);
                            responseNodeEvent.put("id", mango);
                            for (WebSocketSession participant : sessions.values()) {
                            	try {
                            		synchronized(participant) {
                            			participant.sendMessage(new TextMessage(responseNodeEvent.toString()));
                            		}
                            	}catch(Exception e) {
                            		System.out.println("Catch, Get Mango - " + e);
                            	}
                            }
                        }
                    break;

                    case "stealMango":
                        if (Calendar.getInstance().getTime().getTime() - collisionTime >= maxCollisionTime){ 
                            String id2 = node.get("id2").asText();
                            if (mango == Integer.parseInt(id2)){
                                collisionTime = Calendar.getInstance().getTime().getTime();
                                mango = Integer.parseInt(id);

                                responseNodeEvent.put("id", mango);
                                for (WebSocketSession participant : sessions.values()) {
                                    try {
                                    	synchronized(participant) {
                                    		participant.sendMessage(new TextMessage(responseNodeEvent.toString()));
                                    	}
                                    }catch(Exception e) {
                                        System.out.println("Catch, StealMango - " + e);
                                    }
                                }
                            }
                        }
                    break;

                    case "leaveGame":
                        ObjectNode responseNode = mapper.createObjectNode();
			            responseNode.put("type", TYPE_LEAVE);
                        responseNode.put("id", id);
                        if (Integer.parseInt(id) == mango) {
                        	responseNode.put("reset", true);
                        	mangoUpdate.cancel();
                        	mangoTime = 30;
                        	mango = -1;
                        }else {
                        	responseNode.put("reset", false);
                        }
                        
                        for (WebSocketSession participant : sessions.values()) {
                            try {
                            	synchronized(participant) {
                            		participant.sendMessage(new TextMessage(responseNode.toString()));
                            	}
                            }catch(Exception e) {
                                System.out.println("Catch, LeaveGame - " + e);
                            }
                        }
                        System.out.println("El jugador "+ id +" se ha desconectado");
                        System.out.println("Parando temporizadores del jugador " + id);
                        timers.get(id).cancel();
                        timerCheck.put(id, Long.parseLong("0"));
                        sessions.remove(id);
                    break;

                    default:
                    break;
                }
                mutex.release();
                break;

            case TYPE_CONNECT:
                // Se añade la sesión y se crean los temporizadores para la actualización
        		System.out.println("New session in Level 1: " + id);
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
                mutex.acquire();
                numPlayersWaiting++;
                // Si soy el último jugador
                if (numPlayersWaiting == numPlayers){
                    numPlayersWaiting = 0;
                    mutex.release();
                    ObjectNode responseNodeConnect = mapper.createObjectNode();
                    responseNodeConnect.put("type", TYPE_START);
			        for (WebSocketSession participant : sessions.values()) {
				        try {
				        	synchronized(participant) {
				        		participant.sendMessage(new TextMessage(responseNodeConnect.toString()));
				        	}
				        }catch(Exception e) {
					        System.out.println("Catch, Connect - " + e);
				        }
                    }
                }else{
                    mutex.release();
                }
                break;

            case TYPE_READY:
                mutex.acquire();
                numPlayersWaiting++;
                System.out.println("Player " + id + " is ready to start");
                System.out.println(numPlayersWaiting + " / " + numPlayers);
                if (numPlayersWaiting == numPlayers){
                    numPlayersWaiting = 0;
                    mutex.release();
                    ObjectNode responseNodeReady = mapper.createObjectNode();
                    responseNodeReady.put("type", TYPE_START);
                    for (WebSocketSession participant : sessions.values()) {
				        try {
				        	synchronized(participant) {
				        		participant.sendMessage(new TextMessage(responseNodeReady.toString()));
				        	}
				        }catch(Exception e) {
					        System.out.println("Catch, Ready - " + e);
				        }
                    }
                }else{
                    mutex.release();
                }
            break;
                
            case TYPE_RESET:
                mutex.acquire();
                numPlayersWaiting++;
                if (numPlayersWaiting == numPlayers){
                    numPlayersWaiting = 0;
                    numPlayers--;
                    mangoUpdate.cancel();
                    mutex.release();
                    ObjectNode responseNodeReset = mapper.createObjectNode();
                    responseNodeReset.put("type", TYPE_RESET);
                    responseNodeReset.put("id", mango);
                    for (WebSocketSession participant : sessions.values()) {
				        try {
				        	synchronized(participant) {
				        		participant.sendMessage(new TextMessage(responseNodeReset.toString()));
				        	}
				        }catch(Exception e) {
					        System.out.println("Catch, Reset - " + e);
				        }
                    }
                    mango = -1;
                    mangoTime = 30;
                }else{
                    mutex.release();
                }
            break;

            case TYPE_LEAVE:
                System.out.println("Session closed in Level 1: " + id);
        		sessions.remove(id);
        		System.out.println("Parando temporizadores del jugador " + id);
        		timers.get(id).cancel();
        		timerCheck.put(id, Long.parseLong("0"));
                break;

            default:
            break;
        }
    }

    public void updateMangoTime(){
    	try {
    		mutex.acquire();
            if (mangoTime >= 1){
                mangoTime--;
                ObjectNode responseNode = mapper.createObjectNode();
                responseNode.put("type", "updateMango");
                responseNode.put("time", mangoTime);
                for (WebSocketSession participant : sessions.values()) {
                    try {
                    	synchronized(participant) {
                    		participant.sendMessage(new TextMessage(responseNode.toString()));
                    	}
                    }catch(Exception e) {
                        System.out.println("Catch, UpdateTime - " + e);
                    }
                }
            }
    	}catch(InterruptedException ex){
    		System.out.println("Timer cancelado");
    	}finally {
    		mutex.release();
    	}
    }

    public void checkPlayer(String idPlayer) {
        long actualTime = Calendar.getInstance().getTime().getTime();
        
    	if (actualTime - timerCheck.get(idPlayer) >= 5000) {
    		// El jugador lleva más de 5 segundos sin responder, por lo que se envía un
    		// mensaje de desconexión
    		System.out.println("El jugador "+ idPlayer +" se ha desconectado");
			timers.get(idPlayer).cancel();
			timerCheck.put(idPlayer, Long.parseLong("0"));
			sessions.remove(idPlayer);
			
    		ObjectNode responseNode = mapper.createObjectNode();
			responseNode.put("type", TYPE_LEAVE);
			responseNode.put("id", idPlayer);
			if (Integer.parseInt(idPlayer) == mango) {
            	responseNode.put("reset", true);
            	mangoUpdate.cancel();
            	mangoTime = 30;
            	mango = -1;
            }else {
            	responseNode.put("reset", false);
            }
			for (WebSocketSession participant : sessions.values()) {
				try {
					synchronized(participant) {
						participant.sendMessage(new TextMessage(responseNode.toString()));
					}
				}catch(Exception e) {
					System.out.println("Catch, Check - " + e);
				}
			}
    	}
    }
}