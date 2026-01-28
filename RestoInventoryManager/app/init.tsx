import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { initDB } from "../src/db/init";
export default function InitScreen({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        await initDB();
        setReady(true);
      } catch (err) {
        console.error("DB initialization failed:", err);
      }
    };
    initialize();
  }, []);

  if (!ready) return <View><Text>Initializing DB...</Text></View>;

  return <>{children}</>; // render the app once DB is ready
}
