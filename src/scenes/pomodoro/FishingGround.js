import JSONLevelScene from './../loading_scenes/JSONLevelScene';
import Prefab from '../../prefabs/Prefab.js';
import TextPrefab from '../../prefabs/TextPrefab.js';
import Player from '../../prefabs/world/Player.js';

export default class FishingGround extends JSONLevelScene {
    constructor() {
        super('WorldScene');
        
        this.prefab_classes = {
            player: Player.prototype.constructor
        }
        
        this.TEXT_STYLE = {font: "14px Kells", fill: "#FFFFFF"};
    }
    
    create() {
        // create map and set tileset
        this.map = this.add.tilemap(this.level_data.map.key);
        let tileset_index = 0;
        this.tilesets = {};
        this.map.tilesets.forEach(function (tileset) {
            let map_tileset = this.map.addTilesetImage(tileset.name, this.level_data.map.tilesets[tileset_index]);
            this.tilesets[this.level_data.map.tilesets[tileset_index]] = map_tileset;
            tileset_index += 1;
        }, this);
	
        // create map layers before groups
        this.layers = {};
        this.map.layers.forEach(function (layer) {
            this.layers[layer.name] = this.map.createStaticLayer(layer.name, this.tilesets[layer.properties.tileset]);
            if (layer.properties.collision) { // collision layer
                this.map.setCollisionByExclusion([-1]);
            }
        }, this);

        super.create();
        
        this.map.objects.forEach(function (object_layer) {
            object_layer.objects.forEach(this.create_object, this);
        }, this);
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
    
    update () {
        for (let prefab_name in this.prefabs) {
            this.prefabs[prefab_name].update();
        }
    }

}