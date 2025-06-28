import { Container, Sprite, Graphics, FederatedPointerEvent } from "pixi.js";

export class inventory extends Container {
  private background: Graphics;
  private inventoryImage: Sprite;
  private dragging: boolean = false;
  private dragHandle?: Graphics;
  private dragStartX: number = 0;
  private slider: Graphics;

  constructor() {
    super();

    this.background = new Graphics();
    this.background.interactive = true;
    this.addChild(this.background);

    // Inventory image
    this.inventoryImage = Sprite.from("inventory.png");
    this.inventoryImage.anchor.set(0.5);
    this.addChild(this.inventoryImage);

    // Close popup on background click
    this.background.on("pointertap", this.close.bind(this));

    // Create slider
    const sliderWidth = 320;
    this.slider = new Graphics()
      .beginFill(0xffb3dc)
      .drawRect(0, 0, sliderWidth, 4)
      .endFill();
    this.addChild(this.slider);

    // Create handle
    const handle = new Graphics()
      .beginFill(0xffffff)
      .drawCircle(0, 0, 8)
      .endFill();

    handle.x = sliderWidth / 2;
    handle.y = 2; // Half of 4 (slider height)
    handle.eventMode = 'static';
    handle.cursor = 'pointer';

    this.dragHandle = handle;

    handle
      .on("pointerdown", this.onDragStart, this)
      .on("pointerup", this.onDragEnd, this)
      .on("pointerupoutside", this.onDragEnd, this)
      .on("pointermove", this.onDragMove, this);

    this.slider.addChild(handle);
  }

  private onDragStart(e: FederatedPointerEvent) {
    this.dragging = true;
    this.dragStartX = e.global.x;
  }

  private onDragEnd() {
    this.dragging = false;
  }

  private onDragMove(e: FederatedPointerEvent) {
    if (!this.dragging || !this.dragHandle) return;

    const localPos = this.slider.toLocal(e.global);
    const minX = 0;
    const maxX = this.slider.width;

    this.dragHandle.x = Math.max(minX, Math.min(maxX, localPos.x));
  }

  public resize(screenWidth: number, screenHeight: number) {
    const centerX = screenWidth * 0.5;
    const centerY = screenHeight * 0.5;

    // Inventory Image Centered
    this.inventoryImage.x = centerX;
    this.inventoryImage.y = centerY;

    // Place slider at bottom-right corner of image
    const margin = 120;
    const imageHalfWidth = this.inventoryImage.width * 0.5;
    const imageHalfHeight = this.inventoryImage.height * 0.5;

    this.slider.x = centerX + imageHalfWidth - this.slider.width - margin;
    this.slider.y = centerY + imageHalfHeight - this.slider.height - margin;
  }

  public close() {
    this.destroy({ children: true });
    if (this.parent) {
      this.parent.removeChild(this);
    }
  }
}
