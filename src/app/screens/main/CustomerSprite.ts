import { Sprite, Texture } from "pixi.js";


export enum DIRECTION {
  RIGHT,
  LEFT
}

export enum STATE {
  ENTERING,
  STOPPED,
  EXITING,
  DONE
}

export class CustomerSprite extends Sprite {
  public direction: DIRECTION = DIRECTION.RIGHT;
  public index: number;
  public state: STATE = STATE.ENTERING;
  private custName: string;
  private frameCounter = 0;

  constructor(custName: string, inx: number) {
    super({ texture: Texture.EMPTY, anchor: 0.6, scale: 0.52 });

    this.custName = custName;
    this.index = inx;

    this.setTexture(1); 
  }

  public updateAnimation() {
    this.frameCounter++;

    if (this.frameCounter % 20 !== 0) return;

    if (this.state === STATE.ENTERING || this.state === STATE.EXITING) {
      this.index = this.index === 1 ? 2 : 1;
      this.setTexture(this.index);
    }

    if (this.state === STATE.STOPPED) {
      this.setTexture("back");
    }
  }

  private setTexture(frame: number | "back") {
    const texName = frame === "back" ? `${this.custName}back.png` : `${this.custName}${frame}.png`;
    this.texture = Texture.from(texName);
  }
}