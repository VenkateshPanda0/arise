import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

const rankColors = {
  S: "#FFD700",
  A: "#00FFAA",
  B: "#00D4FF",
  C: "#888",
  D: "#FF6B6B",
  E: "#666"
};

export default function HomeScreen({ user, setUser }) {
  const total = user.tasks.length;
  const completed = user.tasks.filter(t => t.completed).length;
  const progress = total === 0 ? 0 : (completed / total) * 100;

  const handleReset = () => {
    Alert.alert(
      "Reset Profile",
      "This will delete all progress. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => setUser(null)
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.logo}>ARISE</Text>

      <Text style={styles.name}>{user.name}</Text>

      <Text style={[styles.rank, { color: rankColors[user.overallRank] }]}>
        Rank {user.overallRank}
      </Text>

      {/* Progress */}
      <View style={styles.card}>
        <Text style={styles.label}>Today's Progress</Text>

        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>

        <Text style={styles.sub}>
          {completed}/{total} tasks completed
        </Text>
      </View>

      {/* Streak */}
      <View style={styles.card}>
        <Text style={styles.label}>Streak</Text>
        <Text style={styles.value}>{user.streak} days</Text>
      </View>

      {/* Focus */}
      <View style={styles.card}>
        <Text style={styles.label}>Focus Area</Text>
        <Text style={styles.value}>
          {getWeakestStat(user)}
        </Text>
      </View>

      {/* Reset */}
      <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
        <Text style={styles.resetText}>Reset Profile</Text>
      </TouchableOpacity>

    </View>
  );
}

function getWeakestStat(user) {
  const entries = Object.entries(user.stats);
  const weakest = entries.sort((a, b) => a[1].level - b[1].level)[0];
  return `${weakest[0]} (${weakest[1].rank})`;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },

  logo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#00D4FF",
    letterSpacing: 2
  },

  name: { fontSize: 32, color: "#fff", marginTop: 10 },

  rank: { fontSize: 20, marginBottom: 20 },

  card: {
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12
  },

  label: { color: "#888" },

  value: { color: "#fff", fontSize: 20, marginTop: 5 },

  sub: { color: "#aaa", marginTop: 8 },

  progressBar: {
    height: 8,
    backgroundColor: "#222",
    borderRadius: 10,
    marginTop: 10
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#00D4FF",
    borderRadius: 10
  },

  resetBtn: {
    backgroundColor: "#8B0000",
    padding: 16,
    borderRadius: 12,
    marginTop: 20
  },

  resetText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold"
  }
});