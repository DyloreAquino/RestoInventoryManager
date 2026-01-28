// src/db/seed.ts
import { getDB } from "./db";

export async function seedDummyData() {
  const db = await getDB();

  // Check if data already exists
  const itemCount = await db.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM items'
  );

  if (itemCount && itemCount.count > 0) {
    console.log('Database already has data, skipping seed');
    return;
  }

  console.log('Seeding dummy data...');

  // Insert Items (ingredients)
  await db.runAsync(
    'INSERT INTO items (id, name, quantity) VALUES (?, ?, ?)',
    [1, 'Tomato', 50]
  );
  await db.runAsync(
    'INSERT INTO items (id, name, quantity) VALUES (?, ?, ?)',
    [2, 'Lettuce', 30]
  );
  await db.runAsync(
    'INSERT INTO items (id, name, quantity) VALUES (?, ?, ?)',
    [3, 'Chicken Breast', 20]
  );
  await db.runAsync(
    'INSERT INTO items (id, name, quantity) VALUES (?, ?, ?)',
    [4, 'Pasta', 100]
  );
  await db.runAsync(
    'INSERT INTO items (id, name, quantity) VALUES (?, ?, ?)',
    [5, 'Cheese', 25]
  );
  await db.runAsync(
    'INSERT INTO items (id, name, quantity) VALUES (?, ?, ?)',
    [6, 'Olive Oil', 15]
  );
  await db.runAsync(
    'INSERT INTO items (id, name, quantity) VALUES (?, ?, ?)',
    [7, 'Onion', 40]
  );

  // Insert Dishes
  await db.runAsync(
    'INSERT INTO dishes (id, dishName, dishPrice) VALUES (?, ?, ?)',
    [1, 'Caesar Salad', 8.99]
  );
  await db.runAsync(
    'INSERT INTO dishes (id, dishName, dishPrice) VALUES (?, ?, ?)',
    [2, 'Grilled Chicken', 12.50]
  );
  await db.runAsync(
    'INSERT INTO dishes (id, dishName, dishPrice) VALUES (?, ?, ?)',
    [3, 'Spaghetti Carbonara', 10.99]
  );
  await db.runAsync(
    'INSERT INTO dishes (id, dishName, dishPrice) VALUES (?, ?, ?)',
    [4, 'Chicken Pasta', 11.50]
  );

  // Insert dish_item relationships (what items are in each dish)
  // Caesar Salad = Lettuce + Tomato + Cheese
  await db.runAsync(
    'INSERT INTO dish_item (dishID, itemID, quantity) VALUES (?, ?, ?)',
    [1, 2, 2]  // 2 Lettuce
  );
  await db.runAsync(
    'INSERT INTO dish_item (dishID, itemID, quantity) VALUES (?, ?, ?)',
    [1, 1, 1]  // 1 Tomato
  );
  await db.runAsync(
    'INSERT INTO dish_item (dishID, itemID, quantity) VALUES (?, ?, ?)',
    [1, 5, 1]  // 1 Cheese
  );

  // Grilled Chicken = Chicken Breast + Olive Oil + Onion
  await db.runAsync(
    'INSERT INTO dish_item (dishID, itemID, quantity) VALUES (?, ?, ?)',
    [2, 3, 1]  // 1 Chicken Breast
  );
  await db.runAsync(
    'INSERT INTO dish_item (dishID, itemID, quantity) VALUES (?, ?, ?)',
    [2, 6, 1]  // 1 Olive Oil
  );
  await db.runAsync(
    'INSERT INTO dish_item (dishID, itemID, quantity) VALUES (?, ?, ?)',
    [2, 7, 1]  // 1 Onion
  );

  // Spaghetti Carbonara = Pasta + Cheese
  await db.runAsync(
    'INSERT INTO dish_item (dishID, itemID, quantity) VALUES (?, ?, ?)',
    [3, 4, 1]  // 1 Pasta
  );
  await db.runAsync(
    'INSERT INTO dish_item (dishID, itemID, quantity) VALUES (?, ?, ?)',
    [3, 5, 1]  // 1 Cheese
  );

  // Chicken Pasta = Pasta + Chicken + Cheese
  await db.runAsync(
    'INSERT INTO dish_item (dishID, itemID, quantity) VALUES (?, ?, ?)',
    [4, 4, 1]  // 1 Pasta
  );
  await db.runAsync(
    'INSERT INTO dish_item (dishID, itemID, quantity) VALUES (?, ?, ?)',
    [4, 3, 1]  // 1 Chicken
  );
  await db.runAsync(
    'INSERT INTO dish_item (dishID, itemID, quantity) VALUES (?, ?, ?)',
    [4, 5, 1]  // 1 Cheese
  );

  // Insert Orders
  await db.runAsync(
    'INSERT INTO orders (id, orderDate) VALUES (?, ?)',
    [1, '2026-01-20']
  );
  await db.runAsync(
    'INSERT INTO orders (id, orderDate) VALUES (?, ?)',
    [2, '2026-01-22']
  );
  await db.runAsync(
    'INSERT INTO orders (id, orderDate) VALUES (?, ?)',
    [3, '2026-01-25']
  );

  // Insert order_dish relationships (what dishes are in each order)
  // Order 1: 2 Caesar Salads, 1 Grilled Chicken
  await db.runAsync(
    'INSERT INTO order_dish (orderID, dishID, quantity) VALUES (?, ?, ?)',
    [1, 1, 2]  // 2 Caesar Salads
  );
  await db.runAsync(
    'INSERT INTO order_dish (orderID, dishID, quantity) VALUES (?, ?, ?)',
    [1, 2, 1]  // 1 Grilled Chicken
  );

  // Order 2: 3 Spaghetti Carbonara
  await db.runAsync(
    'INSERT INTO order_dish (orderID, dishID, quantity) VALUES (?, ?, ?)',
    [2, 3, 3]
  );

  // Order 3: 1 Chicken Pasta, 1 Caesar Salad
  await db.runAsync(
    'INSERT INTO order_dish (orderID, dishID, quantity) VALUES (?, ?, ?)',
    [3, 4, 1]
  );
  await db.runAsync(
    'INSERT INTO order_dish (orderID, dishID, quantity) VALUES (?, ?, ?)',
    [3, 1, 1]
  );

  // Insert Deliveries
  await db.runAsync(
    'INSERT INTO deliveries (id, deliveryDate, deliveryRider, deliveryRiderNumber) VALUES (?, ?, ?, ?)',
    [1, '2026-01-18', 'John Doe', '555-0101']
  );
  await db.runAsync(
    'INSERT INTO deliveries (id, deliveryDate, deliveryRider, deliveryRiderNumber) VALUES (?, ?, ?, ?)',
    [2, '2026-01-21', 'Jane Smith', '555-0102']
  );

  // Insert delivery_item relationships (what items were delivered)
  // Delivery 1: 30 Tomatoes, 20 Lettuce
  await db.runAsync(
    'INSERT INTO delivery_item (deliveryID, itemID, quantity) VALUES (?, ?, ?)',
    [1, 1, 30]  // 30 Tomatoes
  );
  await db.runAsync(
    'INSERT INTO delivery_item (deliveryID, itemID, quantity) VALUES (?, ?, ?)',
    [1, 2, 20]  // 20 Lettuce
  );

  // Delivery 2: 50 Pasta, 10 Cheese, 15 Chicken
  await db.runAsync(
    'INSERT INTO delivery_item (deliveryID, itemID, quantity) VALUES (?, ?, ?)',
    [2, 4, 50]  // 50 Pasta
  );
  await db.runAsync(
    'INSERT INTO delivery_item (deliveryID, itemID, quantity) VALUES (?, ?, ?)',
    [2, 5, 10]  // 10 Cheese
  );
  await db.runAsync(
    'INSERT INTO delivery_item (deliveryID, itemID, quantity) VALUES (?, ?, ?)',
    [2, 3, 15]  // 15 Chicken
  );

  console.log('Dummy data seeded successfully!');
}