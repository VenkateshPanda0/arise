import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";

const rankColors = {
  S: "#FFD700",
  A: "#00FFAA",
  B: "#00D4FF",
  C: "#888",
  D: "#FF6B6B",
  E: "#666"
};

export default function StatsScreen({ user }) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Stats</Text>

      {Object.entries(user.stats).map(([key, value]) => (
        <View key={key} style={styles.card}>
          <Text style={styles.stat}>{key}</Text>

          <Text style={[styles.rank, { color: rankColors[value.rank] }]}>
            Rank {value.rank}
          </Text>

          <Text style={styles.xp}>{value.level} XP</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20
  },

  title: {
    color: "#00D4FF",
    fontSize: 24,
    marginBottom: 20
  },

  card: {
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12
  },

  stat: {
    color: "#00D4FF",
    fontSize: 16,
    textTransform: "capitalize"
  },

  rank: {
    fontSize: 18,
    marginTop: 4
  },

  xp: {
    color: "#aaa",
    marginTop: 4
  }
});