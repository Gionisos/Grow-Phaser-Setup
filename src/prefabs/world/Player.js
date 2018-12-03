import Prefab from '../Prefab';

export default class Player extends Prefab {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);

        this.walking_speed = 150;

        console.log(this.texture)
        this.body.collideWorldBounds = true;
        
        this.moving = {left: false, right: false, up: false, down: false};
        

        this.scene.physics.add.collider(this, this.scene.layers['Collision Layer']);


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

        const camera = this.scene.cameras.main;
        camera.startFollow(this);
  
        let moveMapX = 0;
        let moveMapY = 0;

        if (this.scene.map.widthInPixels < 800){
        // Move map to the right, so that it is centered
          moveMapX = (800 - this.scene.map.widthInPixels) / 2
        } 

        if (this.scene.map.widthInPixels < 600){
        // Move map down, so that it is centered
          moveMapY = (600 - this.scene.map.heightInPixels) / 2
        }
      
        camera.setBounds(-moveMapX, -moveMapY, this.scene.map.widthInPixels, this.scene.map.heightInPixels);

    // Sensorfield!
      this.sensorField = scene.physics.add.sprite(this.x, this.y);
      this.sensorField.frame.width = 30;
      this.sensorField.frame.height = 40;



    // Create circle of group
      let current_player = 'Gionisos';
      let circle_color = this.scene.player_details.party_data[current_player].group;
      this.graphics = this.scene.add.graphics({

            lineStyle: {
             width: 2,
             color: circle_color,
             alpha: 1
            },

            add: true
       });

       this.graphics.strokeCircle(this.x - 383, this.y - 208, 17);

       this.setDepth(5);
 }
    
    update () {
        if (this.body) {          
          this.prevVelocity = this.body.velocity.clone();
          this.body.setVelocity(0);

          if (this.moving.left) {
            this.body.setVelocityX(-this.walking_speed);
            this.sensorField.x = this.x - 13
            this.sensorField.y = this.y + 15
          } else if (this.moving.right) {
            this.body.setVelocityX(this.walking_speed);
            this.sensorField.x = this.x + 10
            this.sensorField.y = this.y + 15
          } else if (this.moving.up) {
            this.body.setVelocityY(-this.walking_speed);
            this.sensorField.x = this.x 
            this.sensorField.y = this.y - 5
          } else if (this.moving.down) {
            this.body.setVelocityY(this.walking_speed);
            this.sensorField.x = this.x 
            this.sensorField.y = this.y + 28    
          }

          
          if (this.moving.left) {
            this.anims.play("walking_left", true);
          } else if (this.moving.right) {
            this.anims.play("walking_right", true);
          } else if (this.moving.up) {
            this.anims.play("walking_up", true);
          } else if (this.moving.down) {
            this.anims.play("walking_down", true);
          } else {
            this.anims.stop();

            // If we were moving, pick an idle frame to use
            if      (this.prevVelocity.x < 0) this.setFrame(4);
            else if (this.prevVelocity.x > 0) this.setFrame(7);
            else if (this.prevVelocity.y < 0) this.setFrame(10);
            else if (this.prevVelocity.y > 0) this.setFrame(1);
          }  

          this.graphics.x = this.x;
          this.graphics.y = this.y;

        }
    }
    
    change_movement(direction, move) {
        this.moving[direction] = move;
    }
    
    stop () {
        this.moving = {left: false, right: false, up: false, down: false};
    }
}
