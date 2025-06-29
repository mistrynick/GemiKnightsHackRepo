import type { GameScreen } from "./GameScreen";
import { CustomerSprite, DIRECTION } from "./CustomerSprite";
import { STATE } from "./CustomerSprite";
import {
  randomBool,
  randomFloat,
  randomInt,
} from "../../../engine/utils/random";

import { Ticker } from "pixi.js";

export class Logic {
  private screen!: GameScreen;
  private allowSpawning = true;
  private CUSTOMER_TYPES = ["blueboy", "girl", "pinkboy"];
  private currentCustomer: CustomerSprite | null = null;
  private customerQueue: string[] = [];
  private startingX = 1300;
private targetX = 700;
private exitX = 450;

  private spawnDelay = 60; // frames
  private delayCounter = 0;

  public newCharacter(screen: GameScreen) {
    this.screen = screen;
    this.customerQueue = []; // reset queue
  }

  public animate(ticker: Ticker): void {
    ticker.add(() => {
      if (this.allowSpawning && !this.currentCustomer && this.delayCounter <= 0) {
        const type = this.CUSTOMER_TYPES[randomInt(0, this.CUSTOMER_TYPES.length - 1)];
        const cust = new CustomerSprite(type, 1);
        cust.x = this.startingX;
        cust.y = 750;
        this.screen.addChild(cust);
        this.currentCustomer = cust;
      }

      if (this.currentCustomer) {
        const cust = this.currentCustomer;

        cust.updateAnimation();

        if (cust.state === STATE.ENTERING) {
          cust.x -= 2;
          if (cust.x <= this.targetX) {
            cust.state = STATE.STOPPED;
            cust.updateAnimation();
            setTimeout(() => {
              cust.state = STATE.EXITING;
              cust.updateAnimation();
              cust.direction = DIRECTION.LEFT;
            }, 1000);
          }
        } else if (cust.state === STATE.EXITING) {
          cust.x -= 3;
          if (cust.x <= this.exitX) {
            this.screen.removeChild(cust);
            this.currentCustomer = null;
            this.delayCounter = this.spawnDelay;
          }
        }
      }

      if (this.delayCounter > 0) {
        this.delayCounter--;
      }
    });

    ticker.start(); 
  }

  public resize(w: number, h: number): void {
    // Not needed unless screen resizes dynamically
  }
  public stopSpawning(): void {
    this.allowSpawning = false;
  }
  public resumeSpawning(): void {
    this.allowSpawning = true;
  }

}
