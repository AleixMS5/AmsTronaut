import Phaser from 'phaser';

import backGround from '../assets/img_1.png';
import gitHub from '../assets/github.png';
import { PlayButton } from '../components/buttonStart';

export default class GameOver extends Phaser.Scene
{
    constructor ()
    {
        super('GameOver');
        this.playButton = new PlayButton(this);
    }

    preload ()
    {
        this.load.image('back', backGround);
        this.load.image('over', gameover);
        this.load.image('github', gitHub);
        this.load.spritesheet('playbutton', './src/images/playbutton.png', { frameWidth: 200, frameHeight: 49 });

    }

    create (data)
    {
        this.add.image(800,300,'back')
        this.playButton.create();
        const over = this.add.image(830, 50, 'over');

        this.scoreText = this.add.text(760, 350, 'Score: '+ data.score, { fontSize: '32px', fill: '#fff' });


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