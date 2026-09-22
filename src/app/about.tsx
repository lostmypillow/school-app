import { CustomAppbarHeader } from "@/components/CustomAppbarHeader";
import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function AboutScreen() {
  return (
   <View style={styles.container}>
      {/* 1. Paper Appbar at the top */}
      <CustomAppbarHeader title="About" />

      <Text style={styles.text}>About screen</Text>
  
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
  text: {fontSize: 14}
});

