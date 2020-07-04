package CoreRoom.MangoMambo;

import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.LinkedList;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
// En "/mango-mambo" se encuentran los datos
@RequestMapping("/mango-mambo")
public class ClientController {
	// Atributos: mapa de clientes, número de clientes y chat
	private Map<Integer, Client> clients = new ConcurrentHashMap<>();
	private LinkedList<String> chat = new LinkedList<String>();
	private int contLines = 0;
	private int maxMessages = 9;
	private long maxTime = 100;
	private long[] times = new long[4];
	
	// Constructor del servidor, se llama cada vez que se inicia
	public ClientController() {
		clients.put(0, new Client(0));
		clients.put(1, new Client(1));
		clients.put(2, new Client(2));
		clients.put(3, new Client(3));
		ReadChat();
	}
	
	@GetMapping("")
	public Collection<Client> clients() {
		for (int i = 0; i < times.length; i++) {
			System.out.println("Player "+ i + ": " + times[i]);
		}
		return clients.values();
	}
	
	// Se añade un cliente a la sala
	@PostMapping("")
	@ResponseStatus(HttpStatus.CREATED)
	public Client newClient() {
		Client client = new Client();
		for (int i = 0; i < 4; i++) {
			if (!clients.get(i).getIsConnected() && !client.getIsConnected()) {
				client.setId(i);
				client.setIsConnected(true);
				clients.put(i, client);
				times[i] = 0;
			}
		}
		return client;
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Client> deleteClient(@PathVariable int id) {
		Client client = clients.get(id);
		if (client != null) {
			client.setIsConnected(false);
			client.setIsReady(false);
			return new ResponseEntity<>(client, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(client, HttpStatus.NOT_FOUND);
		}
	}
	// Se modifica un personaje en función de los datos recibidos del cliente
	@PutMapping("/{id}")
	public ResponseEntity<Client> updateClient(@PathVariable int id, @RequestBody Client client) {
		clients.put(id, client);
		times[client.getId()] = 0;
		for (int i = 0; i < clients.size(); i++) {
			if (i != client.getId()) {
				times[i] += 1;
			}
			if (times[i] >= maxTime) {
				times[i] = 0;
				clients.put(i, new Client(i));
			}
		}
		return new ResponseEntity<>(client, HttpStatus.OK);
	}
	// Se reciben los últimos 9 mensajes del chat
	@GetMapping("/chat")
	public LinkedList<String> getMessages(){
		LinkedList<String> chatAux = new LinkedList<String>();
		for (int i = (chat.size()-1); (i > (chat.size()-1) - maxMessages) && i >= 0; i--) {
			chatAux.addFirst(chat.get(i));
		}
		return chatAux;
	}
	// Se añade un nuevo mensaje al chat
	@PostMapping("/chat/{id}")
	public LinkedList<String> newMessage(@PathVariable int id, @RequestBody String[] msg) {
		try {
			String line;
			for (int i = 0; i < msg.length; i++) {
				msg[i] = "Player "+(id+1)+": " + msg[i];
				line = msg[i];
				chat.addLast(line);
				contLines++;
				System.out.println(msg[i]);
			}
			writeChat();
			return getMessages();
		}catch(Exception e) {
			System.out.println(e);
			return chat;
		}
	}
	
	public void ReadChat() {
		// Lectura del archivo del chat
		try {
			String line;
			FileReader fileR = new FileReader("chat_0.txt");
			BufferedReader bufferR = new BufferedReader(fileR);
			line = bufferR.readLine();
			// Se lee línea a línea el fichero y se guardan en el chat hasta 9 mensajes
			while(line != null) {
				chat.addLast(line);
				System.out.println(chat.get(contLines));
				contLines++;
				line = bufferR.readLine();
			}
			bufferR.close();
			System.out.println("Archivo leído correctamente");
		// Si hay algún error al leer
		}catch(Exception e) {
			System.out.println(e);
			try {
				FileWriter fileW = new FileWriter("chat_0.txt");
				BufferedWriter bufferW = new BufferedWriter(fileW);
				bufferW.close();
			}catch(Exception ex) {
				System.out.println(ex);
			}
		}
	}
	
	public void writeChat() {
		try {
			FileWriter fileW = new FileWriter("chat_0.txt");
			BufferedWriter bufferW = new BufferedWriter(fileW);
			for (int i = 0; i < chat.size(); i++) {
				bufferW.write(chat.get(i));
				bufferW.newLine();
			}
			bufferW.close();
		}catch(Exception e) {
			System.out.println(e);
		}
	}
}