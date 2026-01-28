import {getDB} from "./db";
import { Item } from "../types/items"; 

// Types
export type ItemInfo = {
  id: number;  
  name: string;     
  quantity: number; 
};

// Functions to manage items in the inventory
export async function createItem(
    name: string,
    quantity: number
) {
    const db = await getDB();
    await db.runAsync(
        "INSERT INTO items (name, quantity) VALUES (?, ?);",
        [name, quantity]
    );
}

// Retrieves all items from the inventory
export async function getItems() : Promise<Item[]>{
    const db = await getDB();
    return await db.getAllAsync(
        "SELECT * FROM items;"
    );
}


// Increases the quantity of a specific item
export async function increaseItemQuantity(
    id: number,
    quantity: number
) {
    const db = await getDB();
    await db.runAsync(
        "UPDATE items SET quantity = quantity + ? WHERE id = ?;",
        [quantity, id]
    );
}

// Decreases the quantity of a specific item
export async function decreaseItemQuantity(
    itemID: number,
    quantity: number
) {
    const db = await getDB();

    const item = await db.getAllAsync(
        "SELECT quantity FROM items WHERE id = ?;",
        [itemID]
    ) as { quantity: number }[];

    if (!item || item.length === 0) {
        throw new Error(`Item with ID ${itemID} not found`);
    }

    const currentQuantity = item[0].quantity;

    if (currentQuantity < quantity) {
        throw new Error(
            `Cannot decrease item ID ${itemID} by ${quantity}. Only ${currentQuantity} in stock.`
        );
    }

    await db.runAsync(
        "UPDATE items SET quantity = quantity - ? WHERE id = ?;",
        [quantity, itemID]
    );
}


// Deletes an item from the inventory
export async function deleteItem(id: number) {
    const db = await getDB();
    await db.runAsync(
        "DELETE FROM items WHERE id = ?;",
        [id]
    );
}
