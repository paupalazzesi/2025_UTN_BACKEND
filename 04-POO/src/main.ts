class Item {
    name: string;
    price: number;
    id: number;
    description: string;

    constructor(name: string, price: number, id: number, description: string) {
        this.name = name;
        this.price = price;
        this.id = id;
        this.description = description;
    }
    
}

class Store {    
    accountBalance: number;
    id: number;
    description: string;
    items: Item[] = [];

    constructor( accountBalance: number, id: number, description: string) {        
        this.accountBalance = accountBalance;
        this.id = id;
        this.description = description;
    }

    searchItemById(id: number): Item | undefined {
        return this.items.find(item => item.id === id);
    }

    sellItem(itemId: number): string | void {
        const item = this.searchItemById(itemId);
        if (!item) {
        return console.log(`Item with ID ${itemId} not found.`);
        }        
        this.accountBalance += item.price;
        return console.log(`Successfully sold ${item.name} for $${item.price}. New accountBalance: $${this.accountBalance}.`);
    }

}

let store01 = new Store(1000, 1, "Main Store");
store01.items.push(new Item("Laptop", 800, 1, "High performance laptop"));

store01.sellItem(1);