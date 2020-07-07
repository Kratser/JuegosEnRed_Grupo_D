class Story extends Phaser.Scene {
    constructor(){
        super({key: "story"});
    }// Fin constructor

    preload(){
        // Pantalla de Carga
        var loadingImg = this.add.image(0, 0, "loading_background").setOrigin(0, 0);
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(100, 500, 1000, 50);
        var percentText = this.make.text({
            x: 600,
            y: 525,
            text: "0%",
            style: {
                fontSize: '25px',
                fontFamily: 'Berlin Sans FB',
                fontStyle: 'bold',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        this.load.on("progress", function(value){
            console.log(value);
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0x00ff00, 1);
            progressBar.fillRect(110, 510, 980 * value, 30);
        });
        this.load.on("complete", function(){
            console.log("Complete");
            progressBar.destroy();
            progressBox.destroy();
            percentText.destroy();
            loadingImg.destroy();
        });
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
        // Fondo
        this.background;
        // Historia
        this.story1;
        this.story2;
        this.story3;
        this.story4;
        // Título que se mueve
        this.mangoMamboTitle;
        // Botón
        this.skipButton;
        // Tecla Enter
        this.enterKey;
        // La canción loopeada
        this.loop;

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
        this.load.image("online_button_disable", "./Design/Objects/Buttons/online_button_disable.png"); //FASE 5
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
        ///////////SELECT MAP//////////////
        ///////////////////////////////////

        // Cargar la imagen de fondo
        this.load.image("select_map_background", "./Design/Stages/Backgrounds/select_map_background.png");
        // Botones seleccionados
        this.load.image("select_map_button_left", "./Design/Objects/Buttons/change_map_button_left.png");
        this.load.image("select_map_button_right", "./Design/Objects/Buttons/change_map_button_right.png");
        // Imágenes de los mapas
        this.load.image("tiki_jungle_map", "./Design/Objects/tiki_jungle_map.png");
        this.load.image("neon_caves_map", "./Design/Objects/neon_caves_map.png");
        // Imágenes de los iconos de los mapas
        this.load.image("tiki_jungle_icon", "./Design/Objects/tiki_jungle_icon.png");
        this.load.image("neon_caves_icon", "./Design/Objects/neon_caves_icon.png");
        // Boton de ready para pasar a jugar
        this.load.image("cc_ready_button", "./Design/Objects/Buttons/cc_ready_button.png");
        this.load.image("cc_ready_button_selected", "./Design/Objects/Buttons/cc_ready_button_selected.png");
        // Efectos de Sonido
        this.load.audio("choose_options", "./Design/Audio/SoundFX/choose_options.mp3");
        this.load.audio("change_options", "./Design/Audio/SoundFX/change_options.mp3");

        ///////////////////////////////////
        ///////////HOW TO PLAY/////////////
        ///////////////////////////////////

         // Cargar imagen
         this.load.image("how_to_play_scene_background_tiki_jungle", "./Design/Stages/Backgrounds/how_to_play_scene.png");
         this.load.image("how_to_play_scene_background_neon_caves", "./Design/Stages/Backgrounds/how_to_play_scene2.png");
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
        // Fondo de Neon Cave
        this.load.image("lvl2_background", "./Design/Stages/Backgrounds/level_2_background.png");
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
        this.load.image("solar_beams_neon_caves", "./Design/Stages/Backgrounds/solar_beams.png");
        this.load.image("solar_beams_tiki_jungle", "./Design/Stages/Backgrounds/solar_beams_tiki_jungle.png");
        // Plataformas Tiki Jungle
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
        // Plataformas Neon Cave
        this.load.image("floor_neon_caves", "./Design/Stages/Platforms/floor.png");
        this.load.image("l1_p1_neon_caves", "./Design/Stages/Platforms/level_1_plat_1.png");
        this.load.image("l1_p2_neon_caves", "./Design/Stages/Platforms/level_1_plat_2.png");
        this.load.image("l1_p3_neon_caves", "./Design/Stages/Platforms/level_1_plat_3.png");
        this.load.image("l1_p4_neon_caves", "./Design/Stages/Platforms/level_1_plat_4.png");
        this.load.image("l2_c1_neon_caves", "./Design/Stages/Platforms/level_2_colum_1.png");
        this.load.image("l2_c2_neon_caves", "./Design/Stages/Platforms/level_2_colum_2.png");
        this.load.image("l2_c3_neon_caves", "./Design/Stages/Platforms/level_2_colum_3.png");
        this.load.image("l2_p1_neon_caves", "./Design/Stages/Platforms/level_2_plat_1.png");
        this.load.image("l2_p2_neon_caves", "./Design/Stages/Platforms/level_2_plat_2.png");
        this.load.image("l2_p3_neon_caves", "./Design/Stages/Platforms/level_2_plat_3.png");
        this.load.image("l2_p4_neon_caves", "./Design/Stages/Platforms/level_2_plat_4.png");
        this.load.image("l2_p5_neon_caves", "./Design/Stages/Platforms/level_2_plat_5.png");
        this.load.image("l3_c_neon_caves", "./Design/Stages/Platforms/level_3_colum.png");
        this.load.image("l3_mp_neon_caves", "./Design/Stages/Platforms/level_3_mov_plat.png");
        this.load.image("l3_p1_neon_caves", "./Design/Stages/Platforms/level_3_plat_1.png");
        this.load.image("l3_p2_neon_caves", "./Design/Stages/Platforms/level_3_plat_2.png");
        // Detalles Neon Caves
        this.load.image("details_neon_caves", "./Design/Stages/Backgrounds/details_neon_caves.png");
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
        this.load.audio("minigame_loop_neon_caves", "./Design/Audio/MinigameSong/level_2_song_loop.mp3");
        this.load.audio("hit", "./Design/Audio/SoundFX/hit.wav");
        this.load.audio("mango_explosion", "./Design/Audio/SoundFX/mango_explosion.mp3");
        this.load.audio("dino_win", "./Design/Audio/SoundFX/dino_win.wav");
        this.load.audio("palm_win", "./Design/Audio/SoundFX/palm_win.mp3");
        this.load.audio("lemur_win", "./Design/Audio/SoundFX/lemur_win.mp3");
        this.load.audio("toucan_win", "./Design/Audio/SoundFX/toucan_win.mp3");
        this.load.audio("birds", "./Design/Audio/SoundFX/birds.mp3");
        this.load.audio("cave_sound", "./Design/Audio/SoundFX/cave_sound.wav");
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
        this.cameras.main.fadeIn(500);
        // Fondo
        this.background = this.add.image(0, 0, "story_background").setOrigin(0,0).setDepth(0);
        // Crear texto de historia
        this.story1 = this.add.image(237, 151, "story_1").setDepth(1);
        this.story2 = this.add.image(240, 436, "story_2").setDepth(1);
        this.story3 = this.add.image(832, 191, "story_3").setDepth(1);
        this.story4 = this.add.image(657, 470, "story_4").setDepth(1);
        this.story1.alpha = 0;
        this.story2.alpha = 0;
        this.story3.alpha = 0;
        this.story4.alpha = 0;
        // Movimiento story 1
        var tween = this.tweens.add({
            targets: this.story1,
            alpha: 1,
            ease: 'Sine.easeInOut',
            duration: 1500,
        });
        // Movimiento story 2
        var tween = this.tweens.add({
            targets: this.story2,
            alpha: 1,
            ease: 'Sine.easeInOut',
            duration: 1500,
            delay: 5000
        });
        // Movimiento story 3
        var tween = this.tweens.add({
            targets: this.story3,
            alpha: 1,
            ease: 'Sine.easeInOut',
            duration: 1500,
            delay: 10000
        });
        // Movimiento story 4.1
        var tween = this.tweens.add({
            targets: this.story4,
            alpha: 1,
            ease: 'Sine.easeInOut',
            duration: 1500,
            delay: 17000
        });
        // Movimiento story 4.2
        var tween = this.tweens.add({
            targets: this.story4,
            angle: 2,
            ease: 'Sine.easeInOut',
            duration: 100,
            yoyo: true,
            repeat: -1,
            delay: 17000
        });
        // Título que se mueve
        this.mangoMamboTitle = this.add.image (989, 456, "mango_mambo_title").setScale(0.65, 0.65).setAngle(10).setDepth(1);
        this.mangoMamboTitle.alpha = 0;
        // Movimiento título 1
        var tween = this.tweens.add({
            targets: this.mangoMamboTitle,
            alpha: 1,
            ease: 'Sine.easeInOut',
            duration: 500,
            delay: 18500
        });
        // Movimiento título 2
        var tween = this.tweens.add({
            targets: this.mangoMamboTitle,
            scaleX: 0.70,
            scaleY: 0.70,
            ease: 'Sine.easeInOut',
            duration: 500,
            yoyo: true,
            repeat: -1,
            delay: 18500
        });
        // Crear botón
        this.skipButton = this.add.image(1130, 30, "skip_button").setDepth(1);
        // Tecla Enter
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        // Música
        this.sound.pauseOnBlur = false;
        this.choose_options = this.sound.add("choose_options");
        this.loop = this.sound.add("how_to_play_song");
        this.loop.play({
            loop : true,
            volume: this.vol
        });
    }// Fin create

    update(){
        // Cambio de pantalla
        if(this.enterKey.isDown){
            this.choose_options.play({
                volume: this.vol
            });
            this.scene.start("main_menu");
            // Se para la música
            this.loop.stop();
        }
    }// Fin update
}    