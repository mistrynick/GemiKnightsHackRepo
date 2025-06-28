import { Sprite, Texture } from "pixi.js";


export enum DIRECTION {
  RIGHT,
  LEFT
}
export class CustomerSprite extends Sprite {
    public direction!: DIRECTION;

    constructor(name:string) {
        const tex = name;
        super({ texture: Texture.from(tex), anchor: 0.5, scale: 0.25 });
        this.direction = 1;
    }
}
