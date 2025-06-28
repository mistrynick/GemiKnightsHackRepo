import { Container } from "pixi.js";
import { VolumeSlider } from "./VolumeSlider";
import { Sprite } from "pixi.js";
import { Button } from "./Button";
import { engine } from "../getEngine";

export class inventory extends Container {
  private cupSlider: VolumeSlider;
  private milkSlider: VolumeSlider;
  private teaSlider: VolumeSlider;
  private bobaSlider: VolumeSlider;
  private thaiSlider: VolumeSlider;
  private strawberrySlider: VolumeSlider;
  private brownSlider: VolumeSlider;
  private taroSlider: VolumeSlider;
  private inventoryImage: Sprite;

  private closeButton: Button;

  public cupVal:number = 0;
  



  constructor() {
    super();

    this.inventoryImage = Sprite.from("inventory.png");
    this.inventoryImage.anchor.set(0.5);
    this.addChild(this.inventoryImage);

    this.cupSlider = new VolumeSlider("Cup " + this.cupVal, 0, 50);
    this.cupSlider.onUpdate.connect((v) => {
        this.cupVal = v;
        this.cupSlider.messageLabel.text = "Cups " + v;
    });
    this.addChild(this.cupSlider);

    this.milkSlider = new VolumeSlider("Milk", 0, 100);
    this.addChild(this.milkSlider);

    this.teaSlider = new VolumeSlider("Tea", 0, 100);
    this.addChild(this.teaSlider);

    this.bobaSlider = new VolumeSlider("Boba", 0, 100);
    this.addChild(this.bobaSlider);

    this.thaiSlider = new VolumeSlider("Thai Tea", 0, 100);
    this.addChild(this.thaiSlider);

    this.strawberrySlider = new VolumeSlider("Strawberry", 0, 100);
    this.addChild(this.strawberrySlider);

    this.brownSlider = new VolumeSlider("Brown Sugar", 0, 100);
    this.addChild(this.brownSlider);

    this.taroSlider = new VolumeSlider("Taro", 0, 100);
    this.addChild(this.taroSlider);

    this.closeButton = new Button({
      text: "Close",
      width: 250,
      height: 70,
    });
    this.closeButton.onPress.connect(() => engine().navigation.dismissPopup());
    this.addChild(this.closeButton);

    
 
  }
  public resize(width: number, height: number) {
    const centerX = width * 0.5;
    const centerY = height * 0.5;
    this.inventoryImage.x = centerX;
    this.inventoryImage.y = centerY;

    const sliders = [
      this.cupSlider,
      this.milkSlider,
      this.teaSlider,
      this.bobaSlider,
      this.thaiSlider,
      this.strawberrySlider,
      this.brownSlider,
      this.taroSlider,
    ];
    const spacing = 50; 
    let totalHeight = 0;

    for (const slider of sliders) {
      totalHeight += slider.height + spacing;
    }
    totalHeight -= spacing;

    let currentY = centerY * 0.65;

    for (const slider of sliders) {
      slider.x = centerX * 0.65;
      slider.y = currentY;
      currentY += spacing;
    }
    this.closeButton.x = centerX;
    this.closeButton.y = centerY * 1.7;

  }

  
}
