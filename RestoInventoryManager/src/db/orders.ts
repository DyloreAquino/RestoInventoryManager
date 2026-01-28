import {getDB} from "./db";
import { decreaseItemQuantity } from "./items";
import { OrderDish } from "../types/orders";
import { DishItem } from "../types/dishes";

export async function createOrder(
    orderDishes: OrderDish[]
) {
    const db = await getDB();
    const orderDate = new Date().toISOString().split('T')[0];
    await db.execAsync("BEGIN");
    try {
        const order = await db.runAsync(
            "INSERT INTO orders (orderDate) VALUES (?);",
            [orderDate]
        );
        const orderID = order.lastInsertRowId;

        for (const order_dishes of orderDishes) {
            await db.runAsync(
                "INSERT INTO order_dish (orderID, dishID, quantity) VALUES (?, ?, ?);",
                [orderID, order_dishes.dishID, order_dishes.quantity]
            );

            const dish_items= await db.getAllAsync(
                `SELECT itemID, quantity FROM dish_item WHERE dishID = ?;`,
                [order_dishes.dishID]
            ) as DishItem[];

            for (const dish_item of dish_items) {
                const totalRequired = dish_item.quantity * order_dishes.quantity;
                await decreaseItemQuantity(dish_item.itemID, totalRequired);
            }
        }

        await db.execAsync("COMMIT");
        return orderID;
    } catch (err) {
        await db.execAsync("ROLLBACK");
        throw err;
    }
}

export async function getOrderDishes(
    orderID: number
) {
    const db = await getDB();
    return await db.getAllAsync(
       `SELECT dishes.id, dishes.dishName, order_dish.quantity
        FROM order_dish
        JOIN dishes ON order_dish.dishID = dishes.id
        WHERE order_dish.orderID = ?;`,
        [orderID]
    );
}

export async function getOrders() {
    const db = await getDB();
    return await db.getAllAsync(
        "SELECT * FROM orders;"
    );
}

export async function deleteOrder(id: number) {
    const db = await getDB();
    await db.runAsync(
        "DELETE FROM orders WHERE id = ?;",
        [id]
    );
}