import Phaser from 'phaser';
import logoImg from '../assets/logo.png';
import { PlayButton } from '../components/buttonStart';
import gitHub from "../assets/github.png";
import play from '../images/playbutton.png';

export default class Portada extends Phaser.Scene
{
    constructor ()
    {
        super('Portada');
        this.playButton = new PlayButton(this);
    }

    preload ()
    {
        this.load.image('logo', logoImg);
        this.load.image('github', gitHub);
        this.load.spritesheet('playbutton', play, { frameWidth: 190, frameHeight: 49 });

    }

    create ()
    {
        const logo = this.add.image(400, 400, 'logo');

        this.playButton.create();


        this.githubVal = this.add.image(95,460,'github').setInteractive();
        this.githubVal.setScale(0.39);
        this.githubVal.on('pointerdown', () => {
            var s = window.open('https://github.com/AleixMS5/AmsTronaut', '_blank');
            s.focus();
        });



    }
}