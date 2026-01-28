import {getDB} from "./db";
import { Dish, DishItem } from "../types/dishes";

export async function createDish(
    dishName: string,
    dishPrice: number,
    dishItems: DishItem[]
) {
    const db = await getDB();
    await db.execAsync("BEGIN");

    try {
        const dish = await db.runAsync(
            "INSERT INTO dishes (dishName, dishPrice) VALUES (?, ?);",
            [dishName, dishPrice]
        );
        const dishID = dish.lastInsertRowId;

        for (const item of dishItems) {
            await db.runAsync(
                "INSERT INTO dish_item (dishID, itemID, quantity) VALUES (?, ?, ?);",
                [dishID, item.itemID, item.quantity]
            );
        }

        await db.execAsync("COMMIT");
        return dishID;
    } catch (err) {
        await db.execAsync("ROLLBACK");
        throw err;
    }
}   

export async function getDishItems(
    dishID: number
) : Promise<DishItem[]> {
    const db = await getDB();
    return await db.getAllAsync(
       `SELECT items.id, items.name, dish_item.quantity
        FROM dish_item
        JOIN items ON dish_item.itemID = items.id
        WHERE dish_item.dishID = ?;`,
        [dishID]
    );
}


export async function assignItemsToDish(
    dishID: number,
    itemID: number,
    quantity: number
) { 
    const db = await getDB();
    await db.runAsync(
        "INSERT INTO dish_item (dishID, itemID, quantity) VALUES (?, ?, ?);",
        [dishID, itemID, quantity]
    );
}

export async function getDishes() : Promise<Dish[]>{
    const db = await getDB();
    return await db.getAllAsync(
        "SELECT * FROM dishes;"
    );
}

export async function deleteDish(id: number) {
    const db = await getDB();
    await db.runAsync(
        "DELETE FROM dishes WHERE id = ?;",
        [id]
    );
}