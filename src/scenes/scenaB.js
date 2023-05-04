import Phaser from 'phaser';
import {config} from "../index";

let map;
let player;
let cursors;
let groundLayer, coinLayer;
let text;
let vidasText
let score = 0;
let vidas = 3;
let objetoPeligroso
let perderVida
let puerta
let next
export default class ScenaB extends Phaser.Scene {

    constructor ()
    {
        super('ScenaB');

    }
    preload () {
        // map made with Tiled in JSON format
        this.load.tilemapTiledJSON('map', './src/assets/map.json');
        // tiles in spritesheet
        this.load.spritesheet('tiles', './src/assets/tiles.png', {frameWidth: 70, frameHeight: 70});
        // simple coin image
        this.load.image('coin', './src/assets/coinGold.png');
        this.load.image('enemy', './src/assets/img.png');
        this.load.image('puerta', './src/assets/puerta.png');
        // player animations
        this.load.atlas('player', './src/assets/player.png', './src/assets/player.json');
    }


     create() {

         puerta = this.physics.add.sprite(2050, 200, 'puerta');
         puerta.setCollideWorldBounds(true);
         puerta.setBounce(0.2); // our player will bounce from items
         puerta.body.setSize(puerta.width, puerta.height-8);
         next = () => {
             this.scene.start('Scena2');
         }
         perderVida = () => {
             // Desactiva la detección de colisiones temporalmente
             player.setTint(0xff0000);
             this.physics.pause();

             setTimeout(() => {
                 player.clearTint();
                 // Resta una vida y actualiza el texto
                 vidas--;
                 vidasText.setText('Vidas: ' + vidas);

                 // Comprueba si el jugador todavía tiene vidas
                 if (vidas > 0) {
                     // Si todavía hay vidas, reinicia la escena
                     this.scene.restart();
                     score=0;
                 } else {
                     // Si no quedan vidas, muestra "Game Over" y desactiva el objeto peligroso
                     vidasText.setText('GAME OVER');

                     let restartButton = this.add.text(400, 400, 'Reiniciar', { fontSize: '32px', fill: '#fff' });
                     restartButton.setOrigin(0.5);
                     restartButton.setInteractive();
                     restartButton.on('pointerdown', () => {
                         window.location.reload()
                     });
                     objetoPeligroso.disableBody(true, true);
                 }

                 // Reactiva la detección de colisiones después de un corto retraso
                 setTimeout(() => {
                     this.physics.resume();
                 }, 1000);
             }, 1000);
         }
        // load the map
        map = this.make.tilemap({key: 'map'});
        vidasText = this.add.text(16, 16, 'Vidas: ' + vidas, { fontSize: '32px', fill: '#fff' });
        // tiles for the ground layer
        var groundTiles = map.addTilesetImage('tiles');
        // create the ground layer
        groundLayer = map.createDynamicLayer('World', groundTiles, 0, 0);
        // the player will collide with this layer
        groundLayer.setCollisionByExclusion([-1]);

        // coin image used as tileset
        var coinTiles = map.addTilesetImage('coin');
        // add coins as tiles
        coinLayer = map.createDynamicLayer('Coins', coinTiles, 0, 0);

        // set the boundaries of our game world
         // set the boundaries of our game world
         this.physics.world.bounds.width = groundLayer.width;
         this.physics.world.bounds.height = groundLayer.height;

        // create the player sprite
         objetoPeligroso =this.physics.add.sprite(600, 300, 'enemy');
         objetoPeligroso.setCollideWorldBounds(true);
         objetoPeligroso.setBounce(0.2); // our player will bounce from items
         objetoPeligroso.body.setSize(objetoPeligroso.width, objetoPeligroso.height-8);

        player = this.physics.add.sprite(200, 200, 'player');
        player.setBounce(0.2); // our player will bounce from items
        player.setCollideWorldBounds(true); // don't go out of the map

        // small fix to our player images, we resize the physics body object slightly
        player.body.setSize(player.width, player.height-8);

        // player will collide with the level tiles
        this.physics.add.collider(groundLayer, player);
         this.physics.add.collider(groundLayer, objetoPeligroso);
         this.physics.add.collider(groundLayer, puerta);
        coinLayer.setTileIndexCallback(17, collectCoin, this);
        // when the player overlaps with a tile with index 17, collectCoin
        // will be called
        this.physics.add.overlap(player, coinLayer);
         this.physics.add.overlap(player, objetoPeligroso, perderVida, null, this);
         this.physics.add.overlap(player, puerta, next, null, this);
        // player walk animation
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('player', {prefix: 'p1_walk', start: 1, end: 11, zeroPad: 2}),
            frameRate: 10,
            repeat: -1
        });
        // idle with only one frame, so repeat is not neaded
        this.anims.create({
            key: 'idle',
            frames: [{key: 'player', frame: 'p1_stand'}],
            frameRate: 10,
        });
         this.anims.create({
             key: 'parpadeo',
             frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 3 }),
             frameRate: 10,
             repeat: -1
         });


        cursors = this.input.keyboard.createCursorKeys();

        // set bounds so the camera won't go outside the game world
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // make the camera follow the player
        this.cameras.main.startFollow(player);

        // set background color, so the sky is not black
        this.cameras.main.setBackgroundColor('#ccccff');

        // this text will show the score
        text = this.add.text(20, 570, '0', {
            fontSize: '20px',
            fill: '#ffffff'
        });
        // fix the text to the camera
        text.setScrollFactor(0);
         vidasText.setScrollFactor(0);
    }


    update(time, delta) {
        // if (player.y > 600) {
        //     player.y= 500
        //     perderVida();
        // }
        if (cursors.left.isDown)
        {
            player.body.setVelocityX(-200);
            player.anims.play('walk', true); // walk left
            player.flipX = true; // flip the sprite to the left
        }
        else if (cursors.right.isDown)
        {
            player.body.setVelocityX(200);
            player.anims.play('walk', true);
            player.flipX = false; // use the original sprite looking to the right
        } else {
            player.body.setVelocityX(0);
            player.anims.play('idle', true);
        }
        // jump
        if (cursors.up.isDown && player.body.onFloor())
        {
            player.body.setVelocityY(-500);
        }
    }

}
function collectCoin(sprite, tile) {
    coinLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
    score++; // add 10 points to the score
    text.setText(score); // set the text to show the current score
    return false;
}




