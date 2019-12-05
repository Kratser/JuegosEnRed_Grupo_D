package CoreRoom.MangoMambo;

public class Client {

	// Atributos
		private int id = -1;
		private boolean isConnected = false;
		private boolean isReady = false;
		
		// Constructores
		public Client() {
			
		}
		public Client(boolean iC) {
			this.isConnected = iC;
		}
		public Client(int i) {
			this.id = i;
		}
		
		// Getter y setter de Id
		public int getId() {
			return this.id;
		}
		public void setId(int i) {
			this.id = i;
		}
		
		// Getter y Setter de isConnected
		public boolean getIsConnected() {
			return this.isConnected;
		}
		public void setIsConnected(boolean iC) {
			this.isConnected = iC;
		}
		
		// Getter y Setter de isReady
		public boolean getIsReady() {
			return this.isReady;
		}
		public void setIsReady(boolean iR) {
			this.isReady = iR;
		}
	
		@Override
		public String toString() {
			return "Client [ Id: " + this.id + ", Is Connected: " 
					+ this.isConnected + ", Is Ready: "+ this.isReady + " ]";
		}
}
