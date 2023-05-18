import Phaser from 'phaser';

import backGround from 'assets/img_1.png';
import gitHub from 'assets/github.png';
import victory from 'assets/victory.png';

import { relaoadButton} from 'components/buttonStart';
let musica
export default class GameOver extends Phaser.Scene
{
    constructor ()
    {
        super('Victory');
        this.relaoadButton = new relaoadButton(this);
    }

    preload ()
    {
        this.load.image('back', backGround);
        this.load.image('over', victory);
        this.load.image('github', gitHub);
        this.load.spritesheet('playbutton', 'assets/playbutton.png', { frameWidth: 200, frameHeight: 49 });
        this.load.audio('musica', './src/assets/victoria.mp3');
    }

    create (data)
    {   musica = this.sound.add('musica');
        musica.play()
        this.add.image(400,300,'back')
        this.relaoadButton.create();
        const over = this.add.image(430, 50, 'over');

        this.scoreText = this.add.text(430, 830, 'Score: '+ data.score, { fontSize: '32px', fill: '#fff' });


        this.githubVal = this.add.image(95,460,'github').setInteractive();
        this.githubVal.setScale(0.39);



        this.tweens.add({
            targets: over,
            y: 300,
            duration: 2000,
            ease: "Power2",
            yoyo: true,
            loop: -1
        });
    }
}