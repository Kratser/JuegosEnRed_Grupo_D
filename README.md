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

## **Link de Trello**
https://trello.com/invite/b/7I8TCMOV/fe154fa115b009a4f2465ad2b9ad3d65/mango-mambo-grupo-d

* * *

# **Organización del tag fase1**

* Aparte del GDD incluido en este README, este tag tiene adjunto un documento pdf (MangoMamboGDD_V01.pdf) donde se encuentra toda la información al completo y que se irá actualizando en cada fase junto con este README.  
* También hemos incluido la presentación con la que introduciremos nuestro juego en la fase 1 (MangoMamboFase1.pptx).
* Para clasificar los distintos elementos que vayamos a usar para el juego hay distintas carpetas creadas.

* * *

# **GDD**

## **1. Introducción**

Documento de Diseño del juego para ordenador Mango Mambo. Videojuego 2D multijugador, tanto local
como online, desarrollado en JavaScript y Java con ayuda del framework Phaser 3.

### **1.1. Concepto del juego**

Mango Mambo es un juego festivo de plataformas basado en minijuegos de hasta 4
jugadores en el que podremos controlar a distintos personajes con características
distintas, para poder ganar los minijuegos, obtener puntos y superar a los otros
jugadores.

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
Por ejemplo, el minijuego pensado, consistirá en una versión de la patata caliente (pero
con un mango), donde el jugador deberá aguantar con el mango hasta que explote, y el
resto de jugadores deberán chocar con él para quitárselo. El primero en explotar se
llevará la mayor puntuación, mientras que los siguientes ganarán menos puntos, de tal
forma que el último que quede vivo se quedará sin puntos.
Además, cada personaje tendrá unas características únicas que le servirán durante los
minijuegos.
ya existentes, pero invirtiendo su flujo original. Además, cada personaje tendrá unas
características únicas que le servirán durante los minijuegos.

**Minijuegos que podremos encontrar:**

  * Minijuego 1: se llevará a cabo en la selva y consistirá en una versión de la patata 
caliente (pero con un mango), donde el jugador deberá aguantar con el mango hasta que explote,
y el resto de jugadores deberán chocar con él para quitárselo. El primero en explotar se
llevará la mayor puntuación. A continuación, este desaparece y si queda más de un jugador
volverán a jugar entre ellos pero obtendrán menos puntos que el primero al que le explotó.
Así hasta que solo queden 2 jugadores y quien se haya hecho con el mango no ganará puntos.

  * Minijuego 2: se jugará en el interior de una cueva y estará basado en el juego
  del escondite. En el escondite una persona es elegida para bucar al resto de jugadores
  que se han escondido donde no se les vea para que no ser encontrados. En nuestro minijuego,
  el jugador seleccionado tendrá un círculo de visión alrededor, y el resto de la pantalla estará 
  a oscuras. El resto de jugadores deberán llegar hasta el jugador elegido y chocar con él para 
  ganar. Si el jugador elegido consigue aguantar sin encontrar a nadie, sólo él se llevara puntos.

### **2.3. Personajes y habilidades**

A continuación, se van a nombrar y mostrar todos los personajes que el jugador tiene
disponibles durante la selección de personajes junto con sus características especiales:
  * **Congalmera:** La habilidad única de la palmera será caer de forma rápida
siempre y cuando al jugador le interese.
  * **Jose Diplodo:** La característica principal del dinosaurio será tener una esquiva.
  * **Chamán Neón:** El lémur tendrá una aceleración y velocidad máxima superior al
resto de personajes.
  * **Tufat:** El tucán podrá dar saltos mucho mayores a los del resto.
  
### **2.4. Condiciones de victoria**
 
Tras terminar un minijuego, los jugadores recibirán puntos según la posición en la que
hayan quedado. Al acabar todas las rondas y minijuegos el jugador con más puntos
ganará la partida.

## **3. Interfaz**

Tanto en el menú principal como en los propios niveles buscamos
una interfaz sencilla e intuitiva, fácil de entender y muy representativa.

**Las imágenes que ilustran este apartado se encuentran en el PDF del GDD adjuntado.**

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
  *	**Congalmera:** Palmera pequeña y con aspecto “mono” que se encuentra metida en una maceta y se moverá dando saltitos.
  *	**Jose Diplodo:** Un diplodocus con estilo playero que llevará como complementos: unas gafas de sol, un gorro, crema solar, un atuendo hawaiano y un cóctel. 
  *	**Chamán Neón:** Lémur que se moverá deprisa a cuatro patas y llevará una máscara tiki adornada con vistosos colores.
  *	**Tufat:** Tucán con sobrepeso que irá aleteando.

### **4.2. Escenarios**

El diseño visual de los escenarios cambiará dependiendo de en que nivel nos encontremos, pero siempre manteniendo la ambientación tropical. Para su composición, se hará uso de una superposición de capas de colores planos y con las mismas tonalidades, pero con diferente brillo para dar sensación de profundidad.
Por otro lado, las plataformas que se superpondrán al fondo mantendrán la estética cartoon y los colores cálidos e intensos.

### **4.3. Objetos**

Mango explosivo: Su diseño irá acorde con la estética cartoon.

### **4.4. Audio**

#### **4.4.1. Música**

Usaremos un estilo que recuerde a lo hawaino, con instrumentos como la marimba y con ritmos rápidos y marcados, usando armonías alegres en modo mayor. 
Según se va acabando el tiempo en los niveles el ritmo de la música aumenta.
El formato será “.wav”.

#### **4.4.1. Efectos**

*	Al seleccionar un botón de cualquier parte del juego.
*	Al cambiar entre botones en cualquier parte del juego.
*	Robo a otro jugador.
*	Al seleccionar un personaje.
*	Explosión del mango.
*	Al ganar la partida, sonido de celebración(uno distinto para cada personaje).

## **5. Referencias**

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

* Referencias Sonoras

Sonido de victoria del lémur, sonido de victoria del tucán, sonido de victoria de la palmera y sonido de ambiente durante la partida -> https://www.zapsplat.com

Sonido de victoria del dinosaurio -> https://www.noiseforfun.com/waves/voice-and-speech/NFF-yahoo.wav

Sonido para selección de personajes y al robar el mango en partida -> https://www.pacdv.com/sounds/miscellaneous_sounds/bottle_pop_2.wav
