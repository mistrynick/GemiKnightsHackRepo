import { Container, Text } from "pixi.js";
import { Sprite, Texture } from "pixi.js";
import { Logic } from "./Logic";
import { engine } from "../../getEngine";
import { inventory } from "../../ui/inventory";
import { Button } from "../../ui/Button";

export class GameScreen extends Container { 
    public static assetBundles = ["main"];
    private Scene: Sprite;
    public mainContainer: Container;
    private logic: Logic;

    private invButton: Button;

    constructor() {
        super();
        this.mainContainer = new Container();
        this.logic = new Logic();
        
        const tex = "gamescene.png";
        this.Scene = new Sprite({texture: Texture.from(tex), anchor: 0.5, scale: 1.0});
        this.addChild(this.Scene);
        this.logic.newCharacter(this);

        this.invButton = new Button({
            text: "Inventory",
            width: 250,
            height: 70,
        });
        this.invButton.onPress.connect(() => this.showInventory());
        this.addChild(this.invButton);


    }

    public showInventory() {
        
        const eng = engine();
        eng.navigation.presentPopup(inventory);
    }

    public resize(width: number, height: number) {
        const centerX = width * 0.5;
        const centerY = height * 0.5;
        this.mainContainer.x = centerX;
        this.mainContainer.y = centerY;
        this.Scene.x = centerX;
        this.Scene.y = centerY;
        this.logic.resize(width, height);
        this.invButton.x = centerX;
        this.invButton.y = centerY;

    }


}