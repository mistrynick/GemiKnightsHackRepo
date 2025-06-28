import { FancyButton } from "@pixi/ui";
import { animate } from "motion";
import type { AnimationPlaybackControls } from "motion/react";
import { MenuSprite } from "./MenuSprite";
import type { Ticker } from "pixi.js";
import { Container, Text } from "pixi.js";
import { inventory } from "../../ui/inventory";
import { inventory } from "../../ui/inventory";



import { GameScreen } from "./GameScreen";

import { engine } from "../../getEngine";
import { PausePopup } from "../../popups/PausePopup";
import { SettingsPopup } from "../../popups/SettingsPopup";
import { Button } from "../../ui/Button";



/** The screen that holds the app */

export class MainScreen extends Container {
  public static assetBundles = ["main"];
  public mainContainer: Container;
  
  
  private menuImage: MenuSprite;
  private startButton: Button;

  startGame() {
    const eng = engine();
    eng.navigation.showScreen(GameScreen);
  }

  constructor() {
    super();
    this.menuImage = new MenuSprite();
    this.mainContainer = new Container();
    this.addChild(this.mainContainer);
    this.addChild(this.menuImage);

    this.startButton = new Button({
      text: "Start",
      width: 250,
      height: 70,
    });
    this.startButton.onPress.connect(() => this.startGame());
    this.addChild(this.startButton);
  }

  public resize(width: number, height: number) {
    const centerX = width * 0.5;
    const centerY = height * 0.5;

    this.mainContainer.x = centerX;
    this.mainContainer.y = centerY;
    
    this.menuImage.x = centerX;
    this.menuImage.y = centerY;

    this.startButton.x = centerX;
    this.startButton.y = 900;

  }
}
