import { Container, Text } from "pixi.js";
import { Sprite, Texture } from "pixi.js";
import { Logic } from "./Logic";

export class GameScreen extends Container { 
    public static assetBundles = ["main"];
    private Scene: Sprite;
    public mainContainer: Container;
    private logic: Logic;

    constructor() {
        super();
        this.mainContainer = new Container();
        this.logic = new Logic();
        
        const tex = "gamescene.png";
        this.Scene = new Sprite({texture: Texture.from(tex), anchor: 0.5, scale: 1.0});
        this.addChild(this.Scene);
        this.logic.newCharacter(this,"blueboy");


    }
    public resize(width: number, height: number) {
        const centerX = width * 0.5;
        const centerY = height * 0.5;
        this.mainContainer.x = centerX;
        this.mainContainer.y = centerY;
        this.Scene.x = centerX;
        this.Scene.y = centerY;
        this.logic.resize(width, height);

    }


}