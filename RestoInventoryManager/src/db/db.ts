import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase;

// Fetches the database instance, creating it if it doesn't exist
export async function getDB() {
  if (!db) {
    db = await SQLite.openDatabaseAsync("inventory.db");
  }
  return db;
}