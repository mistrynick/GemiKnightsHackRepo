import { Container } from "pixi.js";
import { VolumeSlider } from "./VolumeSlider";
import { Sprite } from "pixi.js";
import { Button } from "./Button";
import { engine } from "../getEngine";
import { userSettings } from "../utils/userSettings";

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
  private priceSlider: VolumeSlider;



  constructor() {

    super();

    this.inventoryImage = Sprite.from("inventory.png");
    this.inventoryImage.anchor.set(0.5);
    this.addChild(this.inventoryImage);

    this.cupSlider = new VolumeSlider("Cup " + userSettings.getCups(), 0, 50);
    this.cupSlider.value = userSettings.getCups();
    this.cupSlider.onUpdate.connect((v) => {
        this.cupSlider.messageLabel.text = "Cups " + v;
        userSettings.setCups(v);
    });
    this.addChild(this.cupSlider);

    this.milkSlider = new VolumeSlider("Milk "+ userSettings.getMilk(), 0, 100);
    this.milkSlider.value = userSettings.getMilk();
    this.milkSlider.onUpdate.connect((v) => {
        this.milkSlider.messageLabel.text = "Milk " + v;
        userSettings.setMilk(v);
    });
    this.addChild(this.milkSlider);

    this.teaSlider = new VolumeSlider("Tea "+ userSettings.getTeas(), 0, 100);
    this.teaSlider.value = userSettings.getTeas();
    this.teaSlider.onUpdate.connect((v) => {
        this.teaSlider.messageLabel.text = "Tea " + v;
        userSettings.setTeas(v);
    });
    this.addChild(this.teaSlider);

    this.bobaSlider = new VolumeSlider("Boba "+ userSettings.getBoba(), 0, 100);
    this.bobaSlider.value = userSettings.getBoba();
    this.bobaSlider.onUpdate.connect((v) => {
        this.bobaSlider.messageLabel.text = "Boba " + v;
        userSettings.setBoba(v);
    });
    this.addChild(this.bobaSlider);

    this.thaiSlider = new VolumeSlider("Thai Tea "+ userSettings.getThaiTea(), 0, 100);
    this.thaiSlider.value = userSettings.getThaiTea();
    this.thaiSlider.onUpdate.connect((v) => {
        this.thaiSlider.messageLabel.text = "Thai Tea " + v;
        userSettings.setThaiTea(v);
    });
    this.addChild(this.thaiSlider);

    this.strawberrySlider = new VolumeSlider("Strawberry "+ userSettings.getStrawberry(), 0, 100);
    this.strawberrySlider.value = userSettings.getStrawberry();
    this.strawberrySlider.onUpdate.connect((v) => {
        this.strawberrySlider.messageLabel.text = "Strawberry " + v;
        userSettings.setStrawberry(v);
    });
    this.addChild(this.strawberrySlider);

    this.brownSlider = new VolumeSlider("Brown Sugar " + userSettings.getBrownSugar(), 0, 100);
    this.brownSlider.value = userSettings.getBrownSugar();
    this.brownSlider.onUpdate.connect((v) => {
        this.brownSlider.messageLabel.text = "Brown Sugar " + v;
        userSettings.setBrownsugar(v);
    });
    this.addChild(this.brownSlider);

    this.taroSlider = new VolumeSlider("Taro "+ userSettings.getTaro(), 0, 100);
    this.taroSlider.value = userSettings.getTaro();
    this.taroSlider.onUpdate.connect((v) => {
        this.taroSlider.messageLabel.text = "Taro " + v;
        userSettings.setTaro(v);
    });
    this.addChild(this.taroSlider);

    this.priceSlider = new VolumeSlider("Price " + userSettings.getPrice(), 1, 20);
    this.priceSlider.onUpdate.connect((v) => {
        this.priceSlider.messageLabel.text = "Price " + v;
        userSettings.setPrice(v);
    });
    this.addChild(this.priceSlider);

    this.closeButton = new Button({
      text: "Close",
      width: 250,
      height: 70,
    });
    this.closeButton.onPress.connect(() => {
  engine().navigation.dismissPopup();});
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
      this.priceSlider
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
