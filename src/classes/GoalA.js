import Phaser from 'phaser';
import Controller from './Controller';
const { Body, Bodies } = Phaser.Physics.Matter.Matter;

export default class GoalA extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene.matter.world, x, y, texture, frame);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.frame = frame;

        const gfx = this.scene.add.graphics();
        gfx.fillStyle(0xffffff, 1);
        gfx.fillRect(0, 0, 10, 392);
        gfx.generateTexture('goalA', 10, 392);
        gfx.destroy();
        this.setTexture('goalA', 0);

        const goalPerim = this.scene.add.graphics();
        goalPerim.lineStyle(4, 0xa11ab9, 1);
        goalPerim.strokeCircle(-512, 0, 198);
        let mask = goalPerim.createGeometryMask();

        const goalTest = this.scene.add.graphics();
        goalTest.fillGradientStyle(0x773cc1, 0x773cc1, 0xd609f8, 0xd609f8, 1);
        goalTest.fillRect(-512, -256, 512, 512);
        goalTest.setMask(mask);

        this.displayHeight = 392;
        this.displayWidth = 10;

        let body = Bodies.rectangle(x, y, 10, 392, {});
        this.setExistingBody(body);
        scene.add.existing(this);
        this.setPosition(this.x, this.y);
        this.setIgnoreGravity(true);
        this.setStatic(true);
        this.setSensor(true);
        this.setFixedRotation(true);
    }
}