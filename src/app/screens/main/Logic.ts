import type { GameScreen } from "./GameScreen";
import { CustomerSprite, DIRECTION } from "./CustomerSprite";
import { STATE } from "./CustomerSprite";
import {
  randomBool,
  randomFloat,
  randomInt,
} from "../../../engine/utils/random";

import { Ticker } from "pixi.js";
import { userSettings } from "../../utils/userSettings";


interface DrinkIngredient {
  type: 'milk' | 'boba' | 'cup' | 'tea' | 'thai' | 'straw' | 'brown' | 'taro';
  quantity?: number; // Optional quantity, defaults to 1
}

interface Drink {
  ingredients: DrinkIngredient[];
}


export class Logic {
  private screen!: GameScreen;
  private allowSpawning = true;
  private CUSTOMER_TYPES = ["blueboy", "girl", "pinkboy"];
  private currentCustomer: CustomerSprite | null = null;
  private customerQueue: string[] = [];
  public drinks: Drink[] = [];
  private startingX = 1300;
private targetX = 700;
private exitX = 450;

private costs = {
    cup: 0.10,
    milk: 0.20,
    tea: 0.10,
    boba: 0.30,
    thai: 0.50,
    straw: 0.30,
    brown: 0.75,
    taro: 0.40
  };



public sell(): boolean {
  const cups = userSettings.getCups();
  const milk = userSettings.getMilk();
  const tea = userSettings.getTeas();
  const boba = userSettings.getBoba();
  const thai = userSettings.getThaiTea();
  const straw = userSettings.getStrawberry();
  const brownsugar = userSettings.getBrownSugar();
  const taro = userSettings.getTaro();

  // Base ingredients required for every drink
  const BASE_RECIPE = {
    cup: 1,
    milk: 5,
    tea: 5,
    boba: 5,
  };

  // Available flavors and their inventory
  const FLAVORS = [
    { type: 'thai' as const, inventory: thai, required: 5 },
    { type: 'straw' as const, inventory: straw, required: 5 },
    { type: 'brown' as const, inventory: brownsugar, required: 5 },
    { type: 'taro' as const, inventory: taro, required: 5 },
  ];

  // Check if we have enough base ingredients
  if (cups < BASE_RECIPE.cup || 
      milk < BASE_RECIPE.milk || 
      tea < BASE_RECIPE.tea || 
      boba < BASE_RECIPE.boba) {
    return false;
  }

  // Filter flavors that have enough inventory
  const availableFlavors = FLAVORS.filter(flavor => flavor.inventory >= flavor.required);
  
  if (availableFlavors.length === 0) {
    return false; // No flavors available
  }

  // Randomly select a flavor
  const selectedFlavor = availableFlavors[randomInt(0, availableFlavors.length - 1)];

  // Deduct base ingredients
  userSettings.setCups(cups - BASE_RECIPE.cup);
  userSettings.setMilk(milk - BASE_RECIPE.milk);
  userSettings.setTeas(tea - BASE_RECIPE.tea);
  userSettings.setBoba(boba - BASE_RECIPE.boba);

  // Deduct selected flavor ingredient
  switch (selectedFlavor.type) {
    case 'thai':
      userSettings.setThaiTea(thai - selectedFlavor.required);
      break;
    case 'straw':
      userSettings.setStrawberry(straw - selectedFlavor.required);
      break;
    case 'brown':
      userSettings.setBrownsugar(brownsugar - selectedFlavor.required);
      break;
    case 'taro':
      userSettings.setTaro(taro - selectedFlavor.required);
      break;
  }

  // Create the drink and add to drinks array
  const newDrink: Drink = {
    ingredients: [
      { type: 'cup', quantity: BASE_RECIPE.cup },
      { type: 'milk', quantity: BASE_RECIPE.milk },
      { type: 'tea', quantity: BASE_RECIPE.tea },
      { type: 'boba', quantity: BASE_RECIPE.boba },
      { type: selectedFlavor.type, quantity: selectedFlavor.required }
    ]
  };

  this.drinks.push(newDrink);

  console.log(`Made drink with ${selectedFlavor.type} flavor!`);
  return true;
}

// Helper function to calculate cost of all drinks made
public calculateTotalCost(): number {
  let totalCost = 0;
  
  for (const drink of this.drinks) {
    for (const ingredient of drink.ingredients) {
      const quantity = ingredient.quantity || 1;
      const unitCost = this.costs[ingredient.type];
      
      if (unitCost !== undefined) {
        totalCost += unitCost * quantity;
      }
    }
  }
  
  return Math.round(totalCost * 100) / 100;
}

// Helper function to calculate profit from all drinks
public calculateTotalProfit(sellingPricePerDrink: number): number {
  const totalCost = this.calculateTotalCost();
  const totalRevenue = this.drinks.length * sellingPricePerDrink;
  const netProfit = totalRevenue - totalCost;
  
  return Math.round(netProfit * 100) / 100;
}

// Clear drinks array (useful for resetting or after calculating profits)
public clearDrinks(): void {
  this.drinks = [];
}


  
  private spawnDelay = 60; // frames
  private delayCounter = 0;

  public newCharacter(screen: GameScreen) {
    this.screen = screen;
    this.customerQueue = []; // reset queue
  }

  public calculateCost(drinks: Drink[]): number {
    let totalCost = 0;

    for (const drink of drinks) {
      for (const ingredient of drink.ingredients) {
        const quantity = ingredient.quantity || 1;
        const unitCost = this.costs[ingredient.type];
        
        if (unitCost !== undefined) {
          totalCost += unitCost * quantity;
        } else {
          console.warn(`Unknown ingredient type: ${ingredient.type}`);
        }
      }
    }

    return Math.round(totalCost * 100) / 100;
  }
  public calculateProfit(drinks: Drink[], sellingPrice: number): number {
    const totalCost = this.calculateCost(drinks);
    const netProfit = sellingPrice - totalCost;
    
    return Math.round(netProfit * 100) / 100; 
  }
  public getIngredientCost(ingredientType: keyof typeof this.costs): number {
    return this.costs[ingredientType];
  }



  public animate(ticker: Ticker, screen: GameScreen): void {
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
            this.sell();
            screen.updateProfitDisplay(screen.profitVal+=userSettings.getPrice());
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