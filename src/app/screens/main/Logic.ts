import type { GameScreen } from "./GameScreen";
import { CustomerSprite, DIRECTION } from "./CustomerSprite";
import {
  randomBool,
  randomFloat,
  randomInt,
} from "../../../engine/utils/random";

import { Ticker } from "pixi.js";


export class Logic {

    private screen!: GameScreen;
    private CUSTOMERS_TYPES = ["blueboy", "girl", "pinkboy"];

    private CUSTOMERS: CustomerSprite[] = [];
    private startingLocationX = 500;
    private startingLocationY = 250;
    
    
    

    public newCharacter(screen: GameScreen) {
        this.screen = screen;
        const index = randomInt(0,2);

        if (index == 0) {
            const cust = new CustomerSprite("blueboy1.png");
            cust.x = this.startingLocationX;
            cust.y = this.startingLocationY;
            this.CUSTOMERS.push(cust);
            this.screen.addChild(cust);
        } else if (index == 1) {
            const cust = new CustomerSprite("girl1.png");
            cust.x = this.startingLocationX;
            cust.y = this.startingLocationY;
            this.CUSTOMERS.push(cust);
            this.screen.addChild(cust);
        } else {
            const cust = new CustomerSprite("pinkboy1.png");
            cust.x = this.startingLocationX;
            cust.y = this.startingLocationY;
            this.CUSTOMERS.push(cust);
            this.screen.addChild(cust);
        }
        
    }
    public resize(w: number, h: number): void {
        const centerX = w * 0.5;
        const centerY = h * 0.5;

        this.CUSTOMERS.forEach((customer) => {
            customer.x += centerX;
            customer.y += centerY;
        });
    }

    public async animate(ticker: Ticker): Promise<void> {
        const speed = 1;
        let idx = 0;
        ticker.add(() => {
            this.CUSTOMERS.forEach((customer) => {
                customer.x += speed;
            });

        });
        
    }

    

}