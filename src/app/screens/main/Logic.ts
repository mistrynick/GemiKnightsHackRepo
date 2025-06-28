import type { GameScreen } from "./GameScreen";
import { CustomerSprite, DIRECTION } from "./CustomerSprite";


export class Logic {

    private screen!: GameScreen;
    private CUSTOMERS_TYPES = ["blueboy", "girl", "pinkboy"];

    private CUSTOMERS: CustomerSprite[] = [];
    private startingLocationX = 500;
    private startingLocationY = 250;
    
    

    public async newCharacter(screen: GameScreen, character:string): Promise<void> {
        this.screen = screen;
        if (character == "blueboy") {
            const cust = new CustomerSprite("blueboy1.png");
            cust.x = this.startingLocationX;
            cust.y = this.startingLocationY;
            this.CUSTOMERS.push(cust);
            this.screen.addChild(cust);
        } else if (character == "girl") {
            const cust = new CustomerSprite("girl1.png");
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

    

}