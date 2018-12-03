import JSONLevelScene from './../loading_scenes/JSONLevelScene';
import Prefab from '../../prefabs/Prefab.js';
import TextPrefab from '../../prefabs/TextPrefab.js';
import Player from '../../prefabs/world/Player.js';
import LoadMap from '../../helpers/LoadMap.js';

export default class FishingGround extends JSONLevelScene {
    constructor() {
        super('FishingGround');
        
        this.prefab_classes = {
            player: Player.prototype.constructor
        }
        
        this.TEXT_STYLE = {font: "14px Kells", fill: "#FFFFFF"};
    }
    
    create() {
        super.create();
        LoadMap(this);

        let current_player = 'Jabol';
        let name = this.player_details.party_data[current_player].name;

        this.add
            .text(16, 16, "When you program, be in the moment " + name + "!", {
              font: "18px monospace",
              fill: "#000000",
              padding: { x: 20, y: 10 },
              backgroundColor: "#ffffff"
            })
            .setScrollFactor(0)
            .setDepth(30);   

        }



    create_object(object) {
        // tiled coordinates starts in the bottom left corner
        let object_y = (object.gid) ? object.y - (this.map.tileHeight / 2) : object.y + (object.height / 2);
        let position = {"x": object.x + (this.map.tileHeight / 2), "y": object_y};
        // create object according to its type
        if (this.prefab_classes.hasOwnProperty(object.type)) {
            let prefab = new this.prefab_classes[object.type](this, object.name, position, object.properties);
        }
    }


}
