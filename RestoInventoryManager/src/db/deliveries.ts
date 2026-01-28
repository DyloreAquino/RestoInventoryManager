import {getDB} from "./db";
import {increaseItemQuantity} from "./items";
import { Delivery, DeliveryItem } from "../types/deliveries";

export async function createDelivery(
    deliveryRider: string = "N/A",
    deliveryRiderNumber: string = "N/A",
    deliveryItems: DeliveryItem[]
) {
    const db = await getDB();
    const deliveryDate = new Date().toISOString().split('T')[0];

    await db.execAsync("BEGIN");
    try {
        const delivery = await db.runAsync(
            "INSERT INTO deliveries (deliveryDate, deliveryRider, deliveryRiderNumber) VALUES (?, ?, ?);",
            [deliveryDate, deliveryRider, deliveryRiderNumber]
        );
        const deliveryID = delivery.lastInsertRowId;

        for (const item of deliveryItems) {
            await db.runAsync(
                "INSERT INTO delivery_item (deliveryID, itemID, quantity) VALUES (?, ?, ?);",
                [deliveryID, item.itemID, item.quantity]
            );

            await increaseItemQuantity(item.itemID, item.quantity);
        }

        await db.execAsync("COMMIT");
        return deliveryID;
    } catch (err) {
        await db.execAsync("ROLLBACK");
        throw err;
    }
}

export async function getDeliveryItems(
    deliveryID: number
) : Promise<DeliveryItem[]> {
    const db = await getDB();
    return await db.getAllAsync(
       `SELECT items.id, items.name, delivery_item.quantity
        FROM delivery_item
        JOIN items ON delivery_item.itemID = items.id
        WHERE delivery_item.deliveryID = ?;`,
        [deliveryID]
    );
}   

export async function assignItemsToDelivery(
    deliveryID: number,
    itemID: number,
    quantity: number
) { 
    const db = await getDB();
    await db.runAsync(
        "INSERT INTO delivery_item (deliveryID, itemID, quantity) VALUES (?, ?, ?);",
        [deliveryID, itemID, quantity]
    );
}

export async function getDeliveries() : Promise<Delivery[]>{
    const db = await getDB();
    return await db.getAllAsync(
        "SELECT * FROM deliveries;"
    );
}

export async function deleteDelivery(
    id: number
) {
    const db = await getDB();
    await db.runAsync(
        "DELETE FROM deliveries WHERE id = ?;",
        [id]
    );
}