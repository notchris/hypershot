import Phaser from 'phaser';
import Controller from './Controller';
const { Body, Bodies } = Phaser.Physics.Matter.Matter;

export default class PlayerB extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene.matter.world, x, y, texture, frame);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.frame = frame;
        this.name = 'Player B';

        this.setTexture('playerB', 0);

        this.displayHeight = 100;
        this.displayWidth = 15;

        let body = Bodies.rectangle(x, y, 15, 100, {
            chamfer: 6
        });
        this.setExistingBody(body);
        scene.add.existing(this);
        this.setPosition(this.x, this.y);
        this.setIgnoreGravity(true);
        this.setFixedRotation(true);
        this.setFriction(0, 0, 0);
        this.setMass(800)

        this.controller = new Controller(this.scene);
    }

    controls() {
        if (!this.scene.gameActive) {
            this.y = 0;
            this.x = 512 - 26;
            return;
        }
        this.y = this.scene.ball.y;

        if (this.y < -256 + 60 ){
            this.y = -256 + 60;
        }
        if (this.y > 256 - 60) {
            this.y = 256 - 60;
        }
        this.x = 512 - 26;
    }
    
    update() {
        this.controls();
    }
}