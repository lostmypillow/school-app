// src/app/index.tsx
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { CustomAppbarHeader } from "@/components/CustomAppbarHeader";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 1. Paper Appbar at the top */}
      <CustomAppbarHeader title="Overview" />

      {/* 2. Main Page Content */}
      <View style={styles.content}>
        <Text variant="titleLarge">Course Overview</Text>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => router.push("/browse")}
        >
          Go to About Us
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  button: { marginTop: 16 },
});


