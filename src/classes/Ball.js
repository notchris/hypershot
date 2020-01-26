import Phaser from 'phaser';
const { Body, Bodies } = Phaser.Physics.Matter.Matter;

export default class Ball extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene.matter.world, x, y, texture, frame);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.frame = frame;

        const gfx = this.scene.add.graphics();
        gfx.fillStyle(0x666666, 1);
        gfx.fillCircle(15, 15, 15);
        gfx.generateTexture('ball', 30, 30);
        gfx.destroy();

        this.setTexture('ball', 0);

        this.displayHeight = 30;
        this.displayWidth = 30;

        let body = Bodies.circle(x, y, 15);
        this.setExistingBody(body);
        scene.add.existing(this);
        this.setPosition(this.x, this.y);
        this.setFixedRotation(true);
        this.setBounce(1);
        this.setFriction(0, 0, 0);
    }
    
    update() {
        if (!this.scene.gameActive) return;
        if (this.body.velocity.x > 0) {
            Body.setVelocity(this.body, {
              x: 9,
              y: this.body.velocity.y
            });
        }
        if (this.body.velocity.x < 0) {
            Body.setVelocity(this.body, {
              x: -9,
              y: this.body.velocity.y
            });
        }
    }
}