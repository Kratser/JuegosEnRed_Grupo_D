# Introducción JuegosEnRed_Grupo_D

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

# Organización del tag fase1

* Aparte del GDD incluido en este README, este tag tiene adjunto un documento pdf (MangoMamboGDD_V01.pdf) donde se encuentra toda la información al completo y que se irá actualizando en cada fase junto con este README.  
* También hemos incluido la presentación con la que introduciremos nuestro juego en la fase 1 (MangoMamboFase1.pptx).
* Para clasificar los distintos elementos que vayamos a usar para el juego hay distintas carpetas creadas.

* * *

# GDD

## **1. Introducción**

Documento de Diseño del juego Mango Mambo. Videojuego 2D multijugador, tanto local
como online, desarrollado en JavaScript y Java con ayuda del framework Phaser 3.

### **1.1. Concepto del juego**

Mango Mambo es un juego festivo de plataformas basado en minijuegos de hasta 4
jugadores en el que podremos controlar a distintos personajes con características
distintas, para poder ganar los minijuegos, obtener puntos y superar a los otros
jugadores.

### **1.2. Características principales**

  * Dinámico: Los modos de juego serán contrarreloj y los jugadores tendrán que
moverse por todo el mapa interactuando constantemente entre ellos.
  * Divertido: El juego está pensado para partidas rápidas con amigos. Al ser
rondas rápidas y mecánicas simples, cualquiera puede ganar, lo que hace que
se cree un ambiente de competición entre amigos sin llegar a ser serio.
  * Sencillo: El juego no cuenta con ninguna trama a seguir, tampoco hay que usar
controles complejos.

### **1.3. Género**

Mango Mambo está compuesto por diferentes géneros:
  * Minijuegos: Mango Mambo estará compuesto por distintos minijuegos
competitivos, que los jugadores podrán seleccionar antes de empezar a jugar.
Los minijuegos tendrán una duración corta, para darle un mayor dinamismo y
velocidad al juego.
  * Plataformas: El escenario estará compuesto por varias plataformas por las que
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

### **2.3. Personajes y habilidades**

A continuación, se van a nombrar y mostrar todos los personajes que el jugador tiene
disponibles durante la selección de personajes junto con sus características especiales:
  * Congalmera: La habilidad única de la palmera será caer de forma rápida
siempre y cuando al jugador le interese.
  * Jose Diplodo: La característica principal del dinosaurio será tener una esquiva.
  * Chamán Neón: El lémur tendrá una aceleración y velocidad máxima superior al
resto de personajes.
  * Tufat: El tucán podrá dar saltos mucho mayores a los del resto.
  
### **2.4. Condiciones de victoria**
 
Tras terminar un minijuego, los jugadores recibirán puntos según la posición en la que
hayan quedado. Al acabar todas las rondas y minijuegos el jugador con más puntos
ganará la partida.

## **3. Interfaz**

Especificaciones sobre cómo se organizarán los menús y la interfaz en las diferentes
pantallas del juego. Tanto en el menú principal como en los propios niveles buscamos
una interfaz sencilla e intuitiva, fácil de entender y muy representativa.

### **3.1. Diagrama de flujo**
