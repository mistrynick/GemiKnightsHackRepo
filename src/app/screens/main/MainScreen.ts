import { FancyButton } from "@pixi/ui";
import { animate } from "motion";
import type { AnimationPlaybackControls } from "motion/react";
import type { Ticker } from "pixi.js";
import { Container, Text } from "pixi.js";

import { engine } from "../../getEngine";
import { PausePopup } from "../../popups/PausePopup";
import { SettingsPopup } from "../../popups/SettingsPopup";
import { Button } from "../../ui/Button";


/** The screen that holds the app */

export class MainScreen extends Container {
  public static assetBundles = ["main"];
  public mainContainer: Container;
  private gameLogo: Text;
  

  constructor() {
    super();

    this.mainContainer = new Container();
    this.addChild(this.mainContainer);
    this.gameLogo = new Text("Boba Bucks", {
      fontFamily: "Playpen Sans Arabic",
      fontSize: 60,
      fill: "white",
    });
    this.addChild(this.gameLogo);

  }

  public resize(width: number, height: number) {
    const centerX = width * 0.5;
    const centerY = height * 0.5;

    this.mainContainer.x = centerX;
    this.mainContainer.y = centerY;
    this.gameLogo.x = centerX - 170;
    this.gameLogo.y = centerY - 200;

  }
}
