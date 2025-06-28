import { Sprite, Texture } from "pixi.js";


export class MenuSprite extends Sprite {
    constructor() {
        const tex = "menupage.png";
        super({ texture: Texture.from(tex), anchor: 0.5, scale: 1.0 });
    }
}