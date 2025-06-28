import { Sprite, Texture } from "pixi.js";


export enum DIRECTION {
  RIGHT,
  LEFT
}

export class CustomerSprite extends Sprite {
    public direction!: DIRECTION;
    public index: number;
    private custName: string;

    constructor(name:string, inx: number) {
        
        if (name == "blueboy") {
          super({ texture: Texture.from("blueboy1.png"), anchor: 0.5, scale: 0.35 });
          this.custName = name;
        } else if (name == "pinkboy") {
          super({ texture: Texture.from("pinkboy1.png"), anchor: 0.5, scale: 0.35 });
          this.custName = name;
        } else {
          super({ texture: Texture.from("pinkboy1.png"), anchor: 0.5, scale: 0.35 });
          this.name = name;

        }

        
        this.index = inx;
        this.direction = 1;
    }
    public update() {
      if (this.index == 1) {
          if (this.name == "blueboy") {
            this.texture = Texture.from("blueboy2.png");
            this.index = 2;
          }
      }
      if (this.index == 2) {
          if (this.name == "blueboy") {
            this.texture = Texture.from("blueboy1.png");
            this.index = 1;
          }
      }
      if (this.index == 3) {

      }

    }

}
