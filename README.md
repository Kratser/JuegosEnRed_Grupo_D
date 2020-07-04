# **Información JuegosEnRed_Grupo_D**

## **Título del juego**
Mango Mambo
  
## **Descripción de la temática**

Se trata de un juego para varios jugadores de temática tropical desarrollado para ordenador. Consistirá en supererar minijuegos competitivos, todos contra todos. 

La característica especial de los minijuegos será que las reglas de estos 
estarán invertidas con respecto a los minijuegos clásicos ya existentes.

## **Integrantes del grupo**

| Nombres y apellidos | Correo de la universidad | Nombre de usuario GitHub |
| :---------: | :---------: | :---------: |
| Mario Belén Rivera | m.belen.2017@alumnos.urjc.es | Kratser|
| Enrique Sánchez de Francisco | e.sanchezd.2017@alumnos.urjc.es | enriuop|
| Mireya Funke Prieto | m.funke.2017@alumnos.urjc.es | mfpheras|
| Sergio Cruz Serrano | s.cruzs.2017@alumnos.urjc.es | Sergypulga|

## **Link de GitHub**
https://github.com/Kratser/JuegosEnRed_Grupo_D

## **Link de Trello**
https://trello.com/invite/b/7I8TCMOV/fe154fa115b009a4f2465ad2b9ad3d65/mango-mambo-grupo-d

* * *

# **Organización del tag fase1**

* Aparte del GDD incluido en este README, este tag tiene adjunto un documento pdf (MangoMamboGDD_V01.pdf) donde se encuentra toda la información al completo y que se irá actualizando en cada fase junto con este README.  
* También hemos incluido la presentación con la que introduciremos nuestro juego en la fase 1 (MangoMamboFase1.pptx).
* Para clasificar los distintos elementos que vayamos a usar para el juego hay distintas carpetas creadas.

# **Organización del tag fase2**

* Aparte de lo comentado en el tag fase1, se adjunta un nuevo documento pdf (MangoMamboGDD_V02.pdf) donde se encuentra la información completa del Documento de Diseño actualizada de esta fase.
* También se adjunta la presentación con la que mostraremos el avance del juego en la fase 2 (MangoMamboFase2.pptx).
* Además, el contenido de este README también ha sido actualizado según el progreso realizado.

# **Organización del tag fase3**

* Aparte de lo comentado en el tag fase1 y fase2, se adjunta un nuevo documento pdf (MangoMamboGDD_V03.pdf) donde se encuentra el documento de diseño actualizado. 
* También se adjunta la presentación con la que mostraremos el trabajo de la fase 3 (MangoMamboFase3.pptx).
* Se han creado carpetas para almacenar los anteriores documentos (Slides y GDDs).
* En este README y en el GDD hemos actualizado las imágenes de la interfaz y hemos añadido un nuevo apartado   **5. Diagrama de clases y API REST**, en el que hemos adjuntado los diagramas de clases de la aplicación, un esquema de las peticiones de API REST que utilizamos y en el punto **5.5. ¿Cómo se ejecuta?**, explicamos los pasos para ejecutar el servidor.

# **Organización del tag fase4**

* Aparte de lo comentado en el tag fase1, fase2 y fase 3, se adjunta la presentación con la que enseñaremos lo realizado en la fase 4 y algunas mejoras planteadas. También se ha actualizado el pdf GDD y este README. 
* En el punto 5 hemos añadido un apartado que explica un poco qué hemos hecho en Websockets.  
* Finalmente, se adjunta un video al principio de este README para mostrar las funcionalidades de juego y qué hemos hecho en cada parte.

* * *

# **GDD**

## **1. Introducción**

Documento de Diseño del juego para ordenador Mango Mambo. Videojuego 2D multijugador, tanto local
como online, desarrollado en JavaScript y Java con ayuda del framework Phaser 3.

### **1.1. Concepto del juego**

Mango Mambo es un juego festivo de plataformas con físicas arcade basado en minijuegos de hasta 4 
jugadores en el que podremos controlar a distintos personajes con características distintas, para 
poder ganar los minijuegos, obtener puntos y superar a los otros jugadores.

### **1.2. Características principales**

  * **Dinámico:** Los modos de juego serán contrarreloj y los jugadores tendrán que
moverse por todo el mapa interactuando constantemente entre ellos.
  * **Divertido:** El juego está pensado para partidas rápidas con amigos. Al ser
rondas rápidas y mecánicas simples, cualquiera puede ganar, lo que hace que
se cree un ambiente de competición entre amigos sin llegar a ser serio.
  * **Sencillo:** El juego no cuenta con ninguna trama a seguir, tampoco hay que usar
controles complejos.

### **1.3. Género**

Mango Mambo está compuesto por diferentes géneros:
  * **Minijuegos:** Mango Mambo estará compuesto por distintos minijuegos
competitivos, que los jugadores podrán seleccionar antes de empezar a jugar.
Los minijuegos tendrán una duración corta, para darle un mayor dinamismo y
velocidad al juego.
  * **Plataformas:** El escenario estará compuesto por varias plataformas por las que
los jugadores podrán correr, saltar y escapar de sus contrincantes.

### **1.4. Propósito y público objetivo**

El objetivo del juego es ofrecer una experiencia divertida a los jugadores, ya sea jugando
en local o por la red. Mango Mambo No está dedicado a un tipo de persona ni a una
edad concreta, pero probablemente sea más llamativo para gente joven y grupos de
amigos.

### **1.5. Estilo visual**

Mango Mambo tiene un estilo visual cartoon y sencillo. Está ambientado en una isla tropical, por tanto, contamos con los colores vivos y saturados propios de dicha ambientación. Acompañan escenarios de selvas y playas, y los personajes también combinan con la temática, utilizando elementos como máscaras tiki, animales y plantas propias de ésta. El estilo visual de dichos personajes es simple y llamativo, con elementos característicos y propios de cada uno, añadiéndoles personalidad propia.

### **1.6. Alcance**

La idea es distribuir el videojuego por páginas red de manera gratuita para todos los que
quieran acceder, en un principio queremos desarrollar un juego sólido, en el que se
puedan jugar algunas partidas, y más tarde ampliar con más contenido para dotarlo de
más variedad.

### **1.7. Historia introductoria**

La tribu de la isla donde sucede el juego se ha quedado sin gurú. Dado que este no tenía sucesor,
se disponen a buscar a alguien digno, así que emprenden una búsqueda por toda la isla para encontrar
a cuatro contendientes y retarlos a superar distintas pruebas, en las que tendrán que competir entre
ellos, para comprobar si son aptos para el liderazgo. Los elegidos son: una palmera a la que el chamán
anterior le dio vida, un marginado de su tribu (que por fin tendrá la oportunidad de demostrar su valor),
un tucán de elevado peso (le costaba demasiado salir huyendo) y un turista curioso que pasaba
sus vacaciones en la isla.
Al tener que demostrar su valía, las pruebas se basarán en quién se sacrifica primero. En caso de negarse
a competir serán prisioneros de la tribu de por vida.
Es momento de descubrir quién es digno del título de chamán.

## **2. Jugabilidad y mecánicas**

### **2.1. Jugabilidad**

La jugabilidad será muy sencilla, basada en el movimiento y los saltos a lo largo de las
plataformas del nivel. Los controles serán diferentes en función de si estamos jugando
en línea o en local:
  * En el caso de estar jugando en línea, todos los clientes usarán la misma
combinación de teclas, cada uno desde su propio host. W para saltar, A y D para
moverse a los lados y S para algunas habilidades especiales (no todos los
personajes tienen habilidades especiales).
  * En el modo local cada jugador tendrá asociadas distintas teclas. El jugador 1
usará WASD, el jugador 2 IJKL, el jugador 3 las flechas y el jugador 4 los
números 8456 del “numpad”.

### **2.2. Mecánicas**

Cada nivel del juego consistirá en un minijuego diferente en el que tendrán que competir
todos los jugadores entre ellos. Las mecánicas irán variando en función del minijuego
elegido, pero, la mecánica principal en la que se basa el juego es el uso de minijuegos
ya existentes, pero invirtiendo su flujo original.

**Minijuegos que podremos encontrar:**

  * Minijuego 1: se llevará a cabo en la selva y consistirá en una versión de la patata 
  caliente (pero con un mango), donde el jugador deberá aguantar con el mango hasta que explote, 
  y el resto de los jugadores deberán chocar con él para quitárselo. El primero en explotar se llevará 
  la mayor puntuación. A continuación, este desaparece y si queda más de un jugador volverán a jugar 
  entre ellos, pero obtendrán menos puntos que el primero al que le explotó. Así hasta que solo queden 
  2 jugadores y quien se haya hecho con el mango no ganará puntos.

  * Minijuego 2: se jugará en el interior de una cueva y estará basado en el juego del escondite. En el 
  escondite una persona es elegida para buscar al resto de jugadores que se han escondido donde no se les 
  vea para que no ser encontrados. En nuestro minijuego, el jugador seleccionado tendrá un círculo de visión 
  alrededor, y el resto de la pantalla estará a oscuras. El resto de los jugadores deberán llegar hasta el jugador 
  elegido y chocar con él para ganar. Si el jugador elegido consigue aguantar sin encontrar a nadie, sólo él se 
  llevará puntos.
  
   * Minijuego 3: ambientado en la cima de un volcán en erupción. Se basa en un minijuego de trepar por unas plataformas
   para evitar caer al fondo del mapa. En nuestra versión, los jugadores deberán sacrificarse entrando por el cráter
   del volcán, evitando las rocas que expulsa, ya que éstas los empujarán hacia fuera. El primer jugador en caer al interior
   obtendrá la mayor puntuación.

### **2.3. Personajes y habilidades**

A continuación, se van a nombrar y mostrar todos los personajes que el jugador tiene
disponibles durante la selección de personajes junto con sus características especiales:
  * **Palm:** La habilidad única de la palmera será caer de forma rápida.
  * **Dino:** La característica principal del dinosaurio será tener un mayor control del personaje, pudiendo cambiar de dirección fácilmente.
  * **Lemur:** El lémur tendrá una aceleración y velocidad máxima superior al
resto de personajes.
  * **Toufat:** El tucán podrá dar saltos mucho mayores a los del resto.
  
### **2.4. Condiciones de victoria**
 
Tras terminar un minijuego, los jugadores recibirán puntos según la posición en la que
hayan quedado. Al acabar todas las rondas y minijuegos el jugador con más puntos
ganará la partida.

## **3. Interfaz**

Tanto en el menú principal como en los propios niveles buscamos
una interfaz sencilla e intuitiva, fácil de entender y muy representativa.

### **3.1. Diagrama de flujo**

Pantallas a lo largo del juego e interacción entre ellas:

![flowchart](https://user-images.githubusercontent.com/36482605/70080236-7bbfbe80-1606-11ea-9e4c-bd89f2c01c53.PNG)

### **3.2. Pantalla de grupo**

Una breve introducción al juego donde se muestran el nombre y logo del equipo. Se le pide al jugador que presione la tecla ENTER para pasar de pantalla.

![CoreRoomIntro](https://user-images.githubusercontent.com/36482605/68355603-0c8ea180-0110-11ea-800e-7808189e90be.png)

### **3.3. Pantalla de introducción**

En esta se narra de forma introductoria el contexto del videojuego y se presentan los personajes. Se puede saltar en cualquier momento pulsando de nuevo la tecla ENTER.

![Introduccion_Historia](https://user-images.githubusercontent.com/55460661/68350720-8b301280-0101-11ea-8d2e-e28021b5d2ea.png)

### **3.4. Menú principal**

Es la "pantalla central", ya que desde ella podremos acceder al juego en sí y a las opciones.

![main_menu](https://user-images.githubusercontent.com/36482605/70080280-8e39f800-1606-11ea-934f-ab73f9d59fd9.PNG)

### **3.5. Selección de personajes**

En esta pantalla se podrán seleccionar los distintos personajes, también se determinará cuántos jugadores van a jugar.

![select_characters_updated](https://user-images.githubusercontent.com/36482605/70087708-17f0c200-1615-11ea-9ca7-05a8fd7bd77e.PNG)

### **3.6. Detalles del minijuego**

Aquí se muestra un breve esquema que explica cómo jugar al minijuego. También se podrá expandir para una explicación más detallada.

![HowToPlay](https://user-images.githubusercontent.com/36482605/68355659-39db4f80-0110-11ea-9f9d-4af05f59e00f.png)

![HowToPlayDetails](https://user-images.githubusercontent.com/36482605/68355676-45c71180-0110-11ea-8ea8-8228132a4356.png)

### **3.7. Minijuego 1**

Donde tiene lugar el Minijuego 1, en el que los jugadores tendrán que obtener el mango y mantenerlo hasta que explote.

![level_1](https://user-images.githubusercontent.com/36482605/70087650-fee81100-1614-11ea-9edf-53e46c6e8940.png)

### **3.8. Menú de pausa**

Dicha pantalla se abre al pulsar la tecla Escape durante el Minijuego 1. Pausará el juego y nos permitirá regresar al menú principal y reanudar el minijuego.

![Pause](https://user-images.githubusercontent.com/36482605/68355690-524b6a00-0110-11ea-8cfa-446ea3591d3c.png)

### **3.9. Fin de nivel**

Esta es la pantalla final, donde se mostrará el progreso de puntuación de cada jugador. También se podrá volver a jugar, acumulando así los puntos, o volver al menú principal si se desea.

![ScoreLevel](https://user-images.githubusercontent.com/36482605/68355711-62fbe000-0110-11ea-8b64-90e77d81898a.png)

### **3.10. Menú de opciones**

Desde esta pantalla podremos pasar a los créditos y regular el sonido del juego.

![Options](https://user-images.githubusercontent.com/36482605/68355574-f4b71d80-010f-11ea-9e2a-261aa5b9459d.png)

### **3.11. Pantalla de carga**

Esta aparece en las transiciones entre pantallas, mostrando el progreso de carga de dichas pantallas.

![Loading](https://user-images.githubusercontent.com/36482605/68355778-95a5d880-0110-11ea-8c81-8bc65b502430.png)

### **3.12. Pantalla de carga del servidor**

Al entrar a local aparece una pantalla de carga con un icono que se actualiza mientras se esté realizando la conexión al servidor.

![loading_server](https://user-images.githubusercontent.com/36482605/70080469-e40ea000-1606-11ea-8e61-20581de639a4.png)

### **3.13. Mensaje de conexión fallida del servidor**

Si las peticiones no llegan, el servidor no responde o se ha producido un error, aparece esta imagen notificando lo que ha ocurrido.

![connection_failed](https://user-images.githubusercontent.com/36482605/70080523-00aad800-1607-11ea-8bf3-fe9ef2d6de12.PNG)

### **3.14. Servidor lleno**

Cuando hay cuatro jugadores en el servidor, si eres el quinto e intentas acceder no puedes y aparece esta imagen emergente.

![full_server](https://user-images.githubusercontent.com/36482605/70080584-1e783d00-1607-11ea-9beb-fc8903855156.PNG)

### **3.15. Lobby del servidor**

Cuando los jugadores entran a online pasan a esta sala en la que pueden chatear y ver su estado y el de otros jugadores (conectados al servidor o preparados para jugar).

![lobby_server](https://user-images.githubusercontent.com/36482605/70196753-09d09d80-170a-11ea-9f48-834e63d91ad4.png)

### **3.16. Créditos**

Aquí visionaremos los créditos del juego.

![credits_updated](https://user-images.githubusercontent.com/36482605/70087787-3c4c9e80-1615-11ea-94f5-1ec151650c61.PNG)

### **3.17. Selección de personajes online**

![ws_choose_character](https://user-images.githubusercontent.com/36482605/72500740-868c8680-3835-11ea-8cb7-b03e5b6b71cf.PNG)

## **4. Arte**

Con Mango Mambo queremos transmitir diversión y calidez para reforzar el género del
juego. Para ello hemos elegido una temática tropical y cartoon que cuenta con colores
cálidos, vivos y alegres:

![Palette1](https://user-images.githubusercontent.com/36482605/66060601-387d9c80-e53e-11e9-8298-f0da5bc86ec0.png)

Además, nos gustaría darle un toque con colores neón para resaltar algunos elementos del juego respecto a temática general:

![Pallete2](https://user-images.githubusercontent.com/36482605/66060663-53501100-e53e-11e9-99c8-9eaf7de9fc02.png)

Estos colores neón también servirán para diferenciar a los jugadores en la interfaz del juego. 

### **4.1. Personajes**

El formato de los personajes será una imagen PNG de 600x600, aunque luego la altura y la anchura de los personajes podrá variar en función de las características de estos, siempre y cuando no se salgan el tamaño establecido para la imagen.

Características visuales:
  *	**Palm:** Palmera pequeña y con aspecto “mono” que se encuentra metida en una maceta y se moverá dando saltitos.
  *	**Dino:** Un diplodocus con estilo playero que llevará como complementos: unas gafas de sol, un gorro, crema solar, un atuendo hawaiano y un cóctel. 
  *	**Lemur:** Lémur que se moverá deprisa a cuatro patas y llevará una máscara tiki adornada con vistosos colores.
  *	**Toufat:** Tucán con sobrepeso que irá aleteando.
  
  ![Characters](https://user-images.githubusercontent.com/36482605/68346938-c298c200-00f5-11ea-91df-776c0e665cfd.png)

### **4.2. Escenarios**

El diseño visual de los escenarios cambiará dependiendo de en que nivel nos encontremos, pero siempre manteniendo la ambientación tropical. Para su composición, se hará uso de una superposición de capas de colores planos y con las mismas tonalidades, pero con diferente brillo para dar sensación de profundidad.
Por otro lado, las plataformas que se superpondrán al fondo mantendrán la estética cartoon y los colores cálidos e intensos.

### **4.3. Objetos**

Mango explosivo: Su diseño irá acorde con la estética cartoon.

![mango](https://user-images.githubusercontent.com/55460661/68350625-4310f000-0101-11ea-8ee4-6571b598b1a2.png)

### **4.4. Audio**

#### **4.4.1. Música**

Usaremos un estilo que recuerde a lo hawaino, con instrumentos como la marimba y con ritmos rápidos y marcados, usando armonías alegres en modo mayor. 
Según se va acabando el tiempo en los niveles el ritmo de la música aumenta.
Para generar la música del juego utilizaremos la herramienta SoundMaker. 
El formato será “.wav” y ".mp3".

#### **4.4.1. Efectos**

*	Al seleccionar un botón de cualquier parte del juego.
*	Al cambiar entre botones en cualquier parte del juego.
*	Al robar el mango a otro jugador.
*	Al seleccionar un personaje.
*	Explosión del mango.
*	Al ganar la partida, sonido de celebración(uno distinto para cada personaje).

## **5. Diagrama de clases, API REST y Websockets**

### **5.1. Diagrama de clases del cliente**

![Diagram](https://user-images.githubusercontent.com/36482605/72498452-ac169180-382f-11ea-830f-20181b371ec3.PNG)

### **5.2. Diagrama de clases del servidor**

![server_diagramChart](https://user-images.githubusercontent.com/36482605/70196610-94fd6380-1709-11ea-9bb2-939b28d2087b.png)

### **5.3. Relación de peticiones API REST**

![ApiRestChart](https://user-images.githubusercontent.com/36482605/70196650-bd855d80-1709-11ea-89e4-c200170d26cd.PNG)

### **5.4. Websockets**

A partir de la escena de online lobby pasamos de usar API REST a utilizar el protocolo ws de WebSockets. Ahora ya no tendremos que realizar peticiones excepto cuando queramos volver al menú principal desde alguna otra escena. Para no enviar toda la inforación de golpe, hemos creado nuevas clases/escenas para este proceso y en cada escena abrimos una conexión Websockets y enviamos los mensajes con la información de los jugadores y de los elementos del juego. Este mensaje es recibdo por un manejador (handler) y este se encargará de actualizar la información al resto de jugadores.

### **5.5. ¿Cómo se ejecuta?**

Al descargar la fase 4, hay una carpeta en la ruta del proyecto llamada **“MangoMambo(exe)”** dentro, hay que abrir el archivo **“MangoMambo-0.0.1-SNAPSHOT.jar”**. Después de ejecutar el .jar, en la URL del navegador hay que poner la IP del host (IPv4) y el puerto 8080. 
Para cerrarlo, hay que acceder al administrador de tareas y en la pestaña de **“Detalles”** hay que finalizar la tarea: **“javaw.exe”**.

## **6. Referencias**

* Guión para hacer el GDD: 

https://github.com/dsaltares/sion-tower/blob/master/doc/gdd/gdd.pdf

* Inspiración para el tipo de juego:

Move or die: https://store.steampowered.com/app/323850/Move_or_Die/

![ReferenceMoD](https://user-images.githubusercontent.com/36482605/66061831-7c71a100-e540-11e9-93f5-d25fa78096db.PNG)

Toto temple deluxe: https://juicybeast.itch.io/toto-temple-deluxe

![ReferenceTTD](https://user-images.githubusercontent.com/36482605/66061317-86df6b00-e53f-11e9-94fb-78117e39358d.png)

* Inspiración para los personajes:

Ultimate Chicken Horse: https://www.cleverendeavourgames.com/ultimate-chicken-horse 

![ReferenceCH](https://user-images.githubusercontent.com/36482605/66061396-aa0a1a80-e53f-11e9-8cd2-2eae88449151.png)

* Inspiración para el estilo de fondos de escenarios:

Donkey Kong Country Returns. 

![ReferenceDKCR](https://user-images.githubusercontent.com/36482605/66062040-eb4efa00-e540-11e9-9343-470c1dc8462d.PNG)

* Inspiración para el estilo de plataformas de escenarios:

Jumpaii: https://frame-perfect.itch.io/jumpai

![ReferenceJumpaii](https://user-images.githubusercontent.com/36482605/66061515-e89fd500-e53f-11e9-8d20-75b877f2a8e6.png)

* Inspiración para el estilo de la pantalla de selección de personajes:

Shot hot burn: https://store.steampowered.com/app/801750/Hot_Shot_Burn/ 

![ReferenceSHB](https://user-images.githubusercontent.com/36482605/66061986-d4a8a300-e540-11e9-90a3-8b92057d782d.jpg)

* Referencias de efectos de sonido:

Sonido de victoria del lémur, sonido de victoria del tucán, sonido de victoria de la palmera y sonido de ambiente durante la partida: https://www.zapsplat.com

Sonido de victoria del dinosaurio: https://www.noiseforfun.com/waves/voice-and-speech/NFF-yahoo.wav

Sonido para selección de personajes y al robar el mango en partida: https://www.pacdv.com/sounds/miscellaneous_sounds/bottle_pop_2.wav

* Canción de pantalla de créditos:

https://zitronsound.bandcamp.com/track/hula-lemon

* Fuentes usadas dentro del juego:

Página web: https://www.dafont.com/mtheme.php?id=5

Título del juego y “Get the Mango”: https://www.dafont.com/tiki-tako.font

Resto de fuentes: https://www.dafont.com/cartoonlings.font

