class Intro extends Phaser.Scene {
    constructor(){
        super({key: "intro"});
    }// Fin constructor

    preload(){
        // Imagen de fondo de carga
        this.load.image("loading_background", "./Design/Stages/Backgrounds/loading_background.png");
        // Cargar las imágenes
        this.load.image("black", "./Design/Stages/Backgrounds/black.png");
        this.load.image("core_room_logo", "./Design/Objects/core_room_logo.png");

        // Fondo
        this.background;
        // Título que se mueve
        this.logo;
        // texto
        this.texto;
        // Tecla Enter
        this.enterKey;

        ///////////////////////////////////
        /////////////STORY/////////////////
        ///////////////////////////////////

        // Imagen de fondo de carga
        this.load.image("story_background", "./Design/Stages/Backgrounds/story_background.png");
        // Cargar las imágenes
        this.load.image("story_1", "./Design/Objects/story_1.png");
        this.load.image("story_2", "./Design/Objects/story_2.png");
        this.load.image("story_3", "./Design/Objects/story_3.png");
        this.load.image("story_4", "./Design/Objects/story_4.png");
        this.load.image("mango_mambo_title", "./Design/Stages/Backgrounds/mango_mambo_title.png");
        // Cargar el botón
        this.load.image("skip_button", "./Design/Objects/Buttons/skip_button.png");
        // Cargar música
        this.load.audio("how_to_play_song", "./Design/Audio/HowToPlaySong/how_to_play_song.wav");
        // Se carga el efecto
        this.load.audio("choose_options", "./Design/Audio/SoundFX/choose_options.mp3");

        ///////////////////////////////////
        ///////////////MENU////////////////
        ///////////////////////////////////

        // Cargar la imagen de fondo
        this.load.image("menu_background", "./Design/Stages/Backgrounds/main_menu_background.png");
        this.load.image("title", "./Design/Stages/Backgrounds/mango_mambo_title.png");
        // Botones
        this.load.image("local_button", "./Design/Objects/Buttons/local_button.png");
        this.load.image("online_button", "./Design/Objects/Buttons/online_button.png");
        this.load.image("options_button", "./Design/Objects/Buttons/options_button.png");
        // Botones seleccionados
        this.load.image("local_button_select", "./Design/Objects/Buttons/local_button_select.png");
        this.load.image("online_button_select", "./Design/Objects/Buttons/online_button_select.png");
        this.load.image("options_button_select", "./Design/Objects/Buttons/options_button_select.png");
        //this.load.image("online_button_disable", "./Design/Objects/Buttons/online_button_disable.png"); FASE 5
        // Se carga la música
        this.load.audio("menu_begining", "./Design/Audio/MenuSong/menu_begining_with_edit.wav");
        this.load.audio("menu_loop", "./Design/Audio/MenuSong/menu_with_edit.wav");
        // Sonidos
        this.load.audio("change_options", "./Design/Audio/SoundFX/change_options.mp3");
        this.load.audio("choose_options", "./Design/Audio/SoundFX/choose_options.mp3");

        ///////////////////////////////////
        ////////CHOOSE CHARACTER///////////
        ///////////////////////////////////

        // Se cargan las imágenes
        this.load.image("character_background", "./Design/Stages/Backgrounds/choose_character_background.png");
        // Imagenes de los personajes
        this.load.image("palm_choose", "./Design/Characters/Palm/palm_choose.png");
        this.load.image("dino_choose", "./Design/Characters/Dino/dino_choose.png");
        this.load.image("toufat_choose", "./Design/Characters/Toucan/toufat_choose.png");
        this.load.image("lemur_choose", "./Design/Characters/Lemur/lemur_choose.png");
        // Nombre de los personajes
        // Verde
        this.load.image("palm_G_name", "./Design/Objects/Text/palm_G_name.png");
        this.load.image("dino_G_name", "./Design/Objects/Text/dino_G_name.png");
        this.load.image("toufat_G_name", "./Design/Objects/Text/toufat_G_name.png");
        this.load.image("lemur_G_name", "./Design/Objects/Text/lemur_G_name.png");
        // Rosa
        this.load.image("palm_P_name", "./Design/Objects/Text/palm_P_name.png");
        this.load.image("dino_P_name", "./Design/Objects/Text/dino_P_name.png");
        this.load.image("toufat_P_name", "./Design/Objects/Text/toufat_P_name.png");
        this.load.image("lemur_P_name", "./Design/Objects/Text/lemur_P_name.png");
        // Azul
        this.load.image("palm_B_name", "./Design/Objects/Text/palm_B_name.png");
        this.load.image("dino_B_name", "./Design/Objects/Text/dino_B_name.png");
        this.load.image("toufat_B_name", "./Design/Objects/Text/toufat_B_name.png");
        this.load.image("lemur_B_name", "./Design/Objects/Text/lemur_B_name.png");
        // Amarillo
        this.load.image("palm_Y_name", "./Design/Objects/Text/palm_Y_name.png");
        this.load.image("dino_Y_name", "./Design/Objects/Text/dino_Y_name.png");
        this.load.image("toufat_Y_name", "./Design/Objects/Text/toufat_Y_name.png");
        this.load.image("lemur_Y_name", "./Design/Objects/Text/lemur_Y_name.png");
        // Descripción habilidades de los personajes
        this.load.image("palm_hab", "./Design/Objects/Text/palm_hab.png");
        this.load.image("dino_hab", "./Design/Objects/Text/dino_hab.png");
        this.load.image("toufat_hab", "./Design/Objects/Text/toufat_hab.png");
        this.load.image("lemur_hab", "./Design/Objects/Text/lemur_hab.png");
        // Texto e imagenes que aparecen si no te has unido a la partida
        this.load.image("press_g_key", "./Design/Objects/Keypress/press_g_key.png");
        this.load.image("press_p_key", "./Design/Objects/Keypress/press_p_key.png");
        this.load.image("press_b_key", "./Design/Objects/Keypress/press_b_key.png");
        this.load.image("press_y_key", "./Design/Objects/Keypress/press_y_key.png");
        // Ready! para cuando el personaje se selecciona
        this.load.image("ready", "./Design/Objects/Text/ready.png");
        // Boton de escape
        this.load.image("escape_button", "./Design/Objects/Buttons/escape_button.png");
        // Boton de ready para pasar a jugar
        this.load.image("cc_ready_button", "./Design/Objects/Buttons/cc_ready_button.png");
        this.load.image("cc_ready_button_selected", "./Design/Objects/Buttons/cc_ready_button_selected.png");
        //sonido
        this.load.audio("hit", "./Design/Audio/SoundFX/hit.wav");
        this.load.audio("change_options", "./Design/Audio/SoundFX/change_options.mp3");

        ///////////////////////////////////
        ///////////HOW TO PLAY/////////////
        ///////////////////////////////////

        // Cargar imagen
        this.load.image("how_to_play_scene_background", "./Design/Stages/Backgrounds/how_to_play_scene.png");
        // Imágenes de las rocas
        this.load.image("how_to_play_rock", "./Design/Objects/how_to_play_rock.png");
        this.load.image("how_to_play_rock_details", "./Design/Objects/how_to_play_rock_details.png");
        // Cargar botones
        this.load.image("ready_button", "./Design/Objects/Buttons/ready_button.png");
        this.load.image("details_button", "./Design/Objects/Buttons/details_button.png");
        this.load.image("big_esc", "./Design/Objects/Buttons/big_esc.png");
        // Cargar botones seleccionados
        this.load.image("ready_button_select", "./Design/Objects/Buttons/ready_button_select.png");
        this.load.image("details_button_select", "./Design/Objects/Buttons/details_button_select.png");
        // Cargar música
        this.load.audio("how_to_play_song", "./Design/Audio/HowToPlaySong/how_to_play_song.wav");
        // Sonido
        this.load.audio("change_options", "./Design/Audio/SoundFX/change_options.mp3");
        this.load.audio("choose_options", "./Design/Audio/SoundFX/choose_options.mp3");

        ///////////////////////////////////
        /////////////LEVEL 1///////////////
        ///////////////////////////////////

        // Se cargan las imágenes de las plataformas
        this.load.image("lvl1_background", "./Design/Stages/Backgrounds/level_1_background.png");
        // Botón de pausa
        this.load.image("pause_button", "./Design/Objects/Buttons/pause_button.png");
        // 3 2 1 mango mambo
        this.load.spritesheet('3_2_1_mango_mambo', './Design/Objects/Text/3_2_1_mango_mambo.png',
        {
            frameWidth: 500,
            frameHeight: 500 
        });
        // Fondo contador
        this.load.image("cd_background", "./Design/Objects/countdown_background.png");
        // Get the mango
        this.load.image("get_the_mango", "./Design/Objects/Text/get_the_mango.png");
        // Plataformas
        this.load.image("big_plat", "./Design/Stages/Platforms/big_plat.png");
        this.load.image("bott_step1", "./Design/Stages/Platforms/bott_step1.png");
        this.load.image("bott_step2", "./Design/Stages/Platforms/bott_step2.png");
        this.load.image("ground_base", "./Design/Stages/Platforms/ground_base.png");
        this.load.image("tiki_leg", "./Design/Stages/Platforms/tiki_leg.png");
        this.load.image("mid_step1", "./Design/Stages/Platforms/mid_step1.png");
        this.load.image("mid_step2", "./Design/Stages/Platforms/mid_step2.png");
        this.load.image("tiki_arm", "./Design/Stages/Platforms/tiki_arm.png");
        this.load.image("tiki_arm1", "./Design/Stages/Platforms/tiki_arm1.png");
        this.load.image("tiki_plat", "./Design/Stages/Platforms/tiki_plat.png");
        this.load.image("top_step1", "./Design/Stages/Platforms/top_step1.png");
        this.load.image("top_step2", "./Design/Stages/Platforms/top_step2.png");
        this.load.image("yellow_plat", "./Design/Stages/Platforms/yellow_plat.png");
        this.load.image("side_plat", "./Design/Stages/Platforms/side_plat.png");
        // Se cargan las animaciones de los personajes
        // Palm
        this.load.spritesheet('palm_idle', './Design/Characters/Palm/palm_idle.png',
        {
            frameWidth: 80,
            frameHeight: 80 
        });
        this.load.spritesheet('palm_walk', './Design/Characters/Palm/palm_walk.png',
        {
            frameWidth: 80,
            frameHeight: 80 
        });
        // Dino
        this.load.spritesheet('dino_idle', './Design/Characters/Dino/dino_idle.png',
        {
            frameWidth: 80,
            frameHeight: 80 
        });
        this.load.spritesheet('dino_walk', './Design/Characters/Dino/dino_walk.png',
        {
            frameWidth: 80,
            frameHeight: 80 
        });
        //Lemur
        this.load.spritesheet('lemur_idle', './Design/Characters/Lemur/lemur_idle.png',
        {
            frameWidth: 80,
            frameHeight: 80 
        });
        this.load.spritesheet('lemur_walk', './Design/Characters/Lemur/lemur_walk.png',
        {
            frameWidth: 80,
            frameHeight: 80 
        });
        //Toufat
        this.load.spritesheet('toufat_idle', './Design/Characters/Toucan/toufat_idle.png',
        {
            frameWidth: 80,
            frameHeight: 80 
        });
        this.load.spritesheet('toufat_walk', './Design/Characters/Toucan/toufat_walk.png',
        {
            frameWidth: 80,
            frameHeight: 80 
        });
        // Explosión del mango
        this.load.spritesheet('mango_explosion', './Design/Objects/mango_explosion.png',
        {
            frameWidth: 80,
            frameHeight: 80 
        });
        // Se cargan los contornos de los pesonajes
        this.load.image("outline", "./Design/Objects/outline.png");
        // Se carga la música
        this.load.audio("minigame_begining", "./Design/Audio/MinigameSong/minigame_begining_with_edit.wav");
        this.load.audio("minigame_loop", "./Design/Audio/MinigameSong/minigame_with_edit.wav");
        this.load.audio("hit", "./Design/Audio/SoundFX/hit.wav");
        this.load.audio("mango_explosion", "./Design/Audio/SoundFX/mango_explosion.mp3");
        this.load.audio("dino_win", "./Design/Audio/SoundFX/dino_win.wav");
        this.load.audio("palm_win", "./Design/Audio/SoundFX/palm_win.mp3");
        this.load.audio("lemur_win", "./Design/Audio/SoundFX/lemur_win.mp3");
        this.load.audio("toucan_win", "./Design/Audio/SoundFX/toucan_win.mp3");
        this.load.audio("birds", "./Design/Audio/SoundFX/birds.mp3");
        // Se carga el mango
        this.load.image("mango", "./Design/Objects/mango.png");

        ///////////////////////////////////
        //////////////PAUSE////////////////
        ///////////////////////////////////
        
        // Se carga la imagen de fondo
        this.load.image("pause_background", "./Design/Stages/Backgrounds/pause_background.png");
        // Buttons
        this.load.image("resume_button", "./Design/Objects/Buttons/resume_button.png");
        this.load.image("quit_button", "./Design/Objects/Buttons/quit_button.png");
        // // Selected buttons
        this.load.image("resume_button_select", "./Design/Objects/Buttons/resume_button_select.png");
        this.load.image("quit_button_select", "./Design/Objects/Buttons/quit_button_select.png");
        // Sonido
        this.load.audio("change_options", "./Design/Audio/SoundFX/change_options.mp3");
        this.load.audio("choose_options", "./Design/Audio/SoundFX/choose_options.mp3");
        
        ///////////////////////////////////
        ///////////SCORE LEVEL/////////////
        ///////////////////////////////////

        // Cargar la imagen de fondo
       this.load.image("score_level_background", "./Design/Stages/Backgrounds/score_level_background.png");
       // Personas de fondo
      this.load.image("people", "./Design/Stages/Backgrounds/people_end_level.png");
       // Corona del ganador
       this.load.image("crown", "./Design/Objects/crown.png");
      // Totems
      this.load.image("g_totem", "./Design/Objects/Totems/green_totem.png");
       this.load.image("p_totem", "./Design/Objects/Totems/pink_totem.png");
       this.load.image("b_totem", "./Design/Objects/Totems/blue_totem.png");
       this.load.image("y_totem", "./Design/Objects/Totems/yellow_totem.png");
       // Botón next round
       this.load.image("next_level_button_selected", "./Design/Objects/Buttons/next_level_button_selected.png");
       // Se carga la música
       this.load.audio("score_level_music", "./Design/Audio/ScoreLevelSong/score_level_music.wav");
       // Se carga el efecto
       this.load.audio("choose_options", "./Design/Audio/SoundFX/choose_options.mp3");
       
        ///////////////////////////////////
        ////////////OPTIONS////////////////
        ///////////////////////////////////

        // Cargar la imagen de fondo
        this.load.image("options_background", "./Design/Stages/Backgrounds/options_background.png");
        // Buttons
        this.load.image("sound_button", "./Design/Objects/Buttons/sound_button.png");
        this.load.image("credits_button", "./Design/Objects/Buttons/credits_button.png");
        this.load.image("big_esc", "./Design/Objects/Buttons/big_esc.png");
        // Selected buttons
        this.load.image("sound_button_select", "./Design/Objects/Buttons/sound_button_select.png");
        this.load.image("credits_button_select", "./Design/Objects/Buttons/credits_button_select.png");
        // Imagenes para modificar el sonido
        this.load.image("volume_background", "./Design/Objects/volume_background.png");
        this.load.image("minus", "./Design/Objects/Buttons/minus.png");
        this.load.image("plus", "./Design/Objects/Buttons/plus.png");
        this.load.image("rectangle", "./Design/Objects/rectangle.png");
        // Se carga la música
        this.load.audio("character_selection", "./Design/Audio/CharacterSelectionScreenSong/characte_selection_screen.wav");
        this.load.audio("change_options", "./Design/Audio/SoundFX/change_options.mp3");
        this.load.audio("choose_options", "./Design/Audio/SoundFX/choose_options.mp3");

        ///////////////////////////////////
        ////////////CREDITS////////////////
        ///////////////////////////////////

        // Cargar la imagen de fondo
        this.load.image("credits_background", "./Design/Stages/Backgrounds/credits_background.png");
        // Cargar texto de créditos
        this.load.image("credits_text", "./Design/Objects/Text/credits_text.png");
        // Buttons
        this.load.image("big_esc", "./Design/Objects/Buttons/big_esc.png");
        // Se carga la música
        this.load.audio("hawaii", "./Design/Audio/CreditsSong/ZitronSound - Hula Lemon.mp3");
        // Se carga el efecto
        this.load.audio("choose_options", "./Design/Audio/SoundFX/choose_options.mp3");

    }// Fin preload

    create(){
        // Fondo
        this.background = this.add.image(0, 0, "black").setOrigin(0,0);
        // Título que se mueve
        this.logo = this.add.image (600, 300, "core_room_logo");
        // Crear texto
        this.texto = this.add.text(500, 250, "Press ENTER", { fontFamily: 'Berlin Sans FB', fontSize: 40, fontStyle: 'Bold' });
        this.logo.alpha = 0;
        this.texto.alpha = 0;
        // Movimiento
        var tween = this.tweens.add({
            targets: this.logo,
            alpha: 1,
            scaleX: 1.3,
            scaleY: 1.3,
            ease: 'Sine.easeInOut',
            duration: 6000,
        });
        var tween = this.tweens.add({
            targets: this.logo,
            alpha: 0,
            ease: 'Sine.easeInOut',
            duration: 2000,
            delay: 4000
        });
        var tween = this.tweens.add({
            targets: this.texto,
            alpha: 1,
            ease: 'Sine.easeInOut',
            duration: 1000,
            delay: 6000,
            yoyo: true,
            repeat: -1
        });
        // Tecla Enter
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }// Fin create

    update(){
        // Cambio de pantalla
        if(this.enterKey.isDown){
            this.scene.start("story");
        }
    }// Fin update
}    