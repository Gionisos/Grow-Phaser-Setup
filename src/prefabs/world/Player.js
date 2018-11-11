import Prefab from '../Prefab';

export default class Player extends Prefab {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
        
        this.walking_speed = 150;
        
        this.body.collideWorldBounds = true;
        
        this.scene.physics.add.collider(this, this.scene.layers.buildings);
        
        this.moving = {left: false, right: false, up: false, down: false};
        
        if (!this.scene.anims.anims.has('walking_down')) {
            this.scene.anims.create({
                key: 'walking_down',
                frames: this.scene.anims.generateFrameNumbers(this.texture.key, {frames: [0, 1, 2]}),
                frameRate: 6,
                repeat: -1
            });
        }
        
        if (!this.scene.anims.anims.has('walking_up')) {
            this.scene.anims.create({
                key: 'walking_up',
                frames: this.scene.anims.generateFrameNumbers(this.texture.key, {frames: [9, 10, 11]}),
                frameRate: 6,
                repeat: -1
            });
        }
        
        if (!this.scene.anims.anims.has('walking_left')) {
            this.scene.anims.create({
                key: 'walking_left',
                frames: this.scene.anims.generateFrameNumbers(this.texture.key, {frames: [3, 4, 5]}),
                frameRate: 6,
                repeat: -1
            });
        }
        
        if (!this.scene.anims.anims.has('walking_right')) {
            this.scene.anims.create({
                key: 'walking_right',
                frames: this.scene.anims.generateFrameNumbers(this.texture.key, {frames: [6, 7, 8]}),
                frameRate: 6,
                repeat: -1
            });
        }

        // Probably needs to be changed
        this.stopped_frames = [0, 1, 0, 2, 3]
    }
    
    update () {
        if (this.body) {
            if (this.moving.left && this.body.velocity.x <= 0) {
                this.body.velocity.x = -this.walking_speed;
                if (this.body.velocity.y === 0) {
                    this.anims.play('walking_left', true);
                }
            } else if (this.moving.right && this.body.velocity.x >= 0) {
                this.body.velocity.x = this.walking_speed;
                if (this.body.velocity.y === 0) {
                    this.anims.play('walking_right', true);
                }
            } else {
                this.body.velocity.x = 0;
            }

            if (this.moving.up && this.body.velocity.y <= 0) {
                this.body.velocity.y = -this.walking_speed;
                if (this.body.velocity.x === 0) {
                    this.anims.play('walking_up', true);
                }
            } else if (this.moving.down && this.body.velocity.y >= 0) {
                this.body.velocity.y = this.walking_speed;
                if (this.body.velocity.x === 0) {
                    this.anims.play('walking_down', true);
                }
            } else {
                this.body.velocity.y = 0;
            }

            if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
                this.anims.stop();
                this.setFrame(this.stopped_frames[this.body.facing - 10]);
            } 
        }
    }
    
    change_movement(direction, move) {
        this.moving[direction] = move;
    }
    
    stop () {
        this.moving = {left: false, right: false, up: false, down: false};
    }
}
