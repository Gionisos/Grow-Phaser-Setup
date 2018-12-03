import { AssetLoader } from 'phaser-manifest-loader'

import manifest from '../../../assets/manifest'

const req = require.context('../../../assets', true, /.*\.png|json|ttf|woff|woff2|xml|mp3|jpg$/);


export default class LoadingScene extends Phaser.Scene {
    constructor() {
        super({key: 'LoadingScene'});
    }
    
    init (data) {
        this.level_data = data.level_data;
        
        let loading_message = this.add.text(240, 240, "Loading", {font: "48px Kells", fill: "#ffffff"});
    }
    
    preload () {

      // Load assets through manifest loader
      this.game.plugins.add(AssetLoader, req).loadManifest(manifest)

      /*  Loads assets the old way
      let assets = this.level_data.assets;
        for (let asset_key in assets) {
            let asset = assets[asset_key];
            switch (asset.type) {
                case 'image':
                    this.load.image(asset_key, asset.source);
                    break;
                case 'spritesheet':
                    this.load.spritesheet(asset_key, asset.source, {frameWidth: asset.frame_width, frameHeight: asset.frame_height, frames: asset.frames, margin: asset.margin, spacing: asset.spacing});
                    break;
                case 'tilemap':
                    this.load.tilemapTiledJSON(asset_key, asset.source);
                    break;
            }
        } */

        // LOAD Player_details 
        let currentPlayer = 'Jabol'
        this.player_details = this.cache.json.get('player_information');
        //console.log(this.player_details.party_data[currentPlayer])
        let player_spritesheet = this.player_details.party_data[currentPlayer].spritesheet;
        this.load.spritesheet('player_spritesheet', player_spritesheet.source, {frameWidth: player_spritesheet.frame_width, frameHeight: player_spritesheet.frame_height, frames: player_spritesheet.frames, margin: player_spritesheet.margin, spacing: player_spritesheet.spacing});

        for (let user_input_key in this.level_data.user_input) {
            let user_input_path = this.level_data.user_input[user_input_key];
            this.load.json(user_input_key, user_input_path);
        }
    }
    
    create (data) {
        this.scene.start(data.scene, {level_data: this.level_data, player_details: this.player_details});
    }
}
