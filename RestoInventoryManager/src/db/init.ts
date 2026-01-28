import { getDB } from "./db";

// Initializes the database by creating necessary tables if they don't exist
export async function initDB() {
  const db = await getDB();

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY NOT NULL,
      orderDate DATE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS deliveries (
      id INTEGER PRIMARY KEY NOT NULL,
      deliveryDate DATE NOT NULL,
      deliveryRider TEXT,
      deliveryRiderNumber TEXT
    );

    CREATE TABLE IF NOT EXISTS dishes (
      id INTEGER PRIMARY KEY NOT NULL,
      dishName TEXT NOT NULL,
      dishPrice REAL NOT NULL
    );

    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS order_dish (
      orderID INTEGER NOT NULL,
      dishID INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      PRIMARY KEY (orderID, dishID),
      FOREIGN KEY (orderID) REFERENCES orders(id) ON DELETE CASCADE,
      FOREIGN KEY (dishID) REFERENCES dishes(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS delivery_item (
      deliveryID INTEGER NOT NULL,
      itemID INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      PRIMARY KEY (deliveryID, itemID),
      FOREIGN KEY (deliveryID) REFERENCES deliveries(id) ON DELETE CASCADE,
      FOREIGN KEY (itemID) REFERENCES items(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS dish_item (
      dishID INTEGER NOT NULL,
      itemID INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      PRIMARY KEY (dishID, itemID),
      FOREIGN KEY (dishID) REFERENCES dishes(id) ON DELETE CASCADE,
      FOREIGN KEY (itemID) REFERENCES items(id) ON DELETE CASCADE
    );
  `);
}
