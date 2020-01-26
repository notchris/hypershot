import Phaser from 'phaser';
import Controller from './Controller';
const { Body, Bodies } = Phaser.Physics.Matter.Matter;

export default class PlayerA extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene.matter.world, x, y, texture, frame);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.frame = frame;
        this.name = 'Player A';

        this.setTexture('playerA', 0);

        this.displayHeight = 100;
        this.displayWidth = 15;

        this.paddleBase = Bodies.rectangle(x, y, 15, 100);

        this.setExistingBody(this.paddleBase);
        scene.add.existing(this);
        this.setPosition(this.x, this.y);
        this.setIgnoreGravity(true);
        this.setFixedRotation(true);
        this.setFriction(0, 0, 0);
        this.setMass(800);
        
        this.controller = new Controller(this.scene);
    }

    controls() {
        if (!this.scene.gameActive) {
            this.y = 0;
            this.x = -512 + 26;
            return;
        }
        const pointer = this.scene.input.activePointer;
        this.setPosition(this.x, pointer.worldY);
        if (this.y < -256 + 60) {
            this.y = -256 + 60;
        }
        if (this.y > 256 - 60) {
            this.y = 256 - 60;
        }
        this.x = -512 + 26;
    }
    
    update() {
        this.controls();
    }
}