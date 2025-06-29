import { Container, Sprite } from "pixi.js";

export class profits extends Container {
  private popupImage: Sprite;

  constructor() {
    super();

    this.popupImage = Sprite.from("profits.png");
    this.popupImage.anchor.set(0.5);
    this.addChild(this.popupImage);
  }

  public resize(width: number, height: number) {
    this.popupImage.x = width * 0.5;
    this.popupImage.y = height * 0.5;
  }
}
