import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function TasksScreen({ user, setUser }) {

  const toggleTask = (index) => {
    const updated = { ...user };
    updated.tasks[index].completed = !updated.tasks[index].completed;
    setUser(updated);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Tasks</Text>

      {user.tasks.map((task, i) => (
        <TouchableOpacity
          key={i}
          style={[
            styles.card,
            task.completed && { opacity: 0.5 }
          ]}
          activeOpacity={0.7}
          onPress={() => toggleTask(i)}
        >
          <Text style={styles.stat}>{task.stat}</Text>
          <Text style={styles.task}>{task.text}</Text>
          <Text style={styles.xp}>+{task.xp} XP</Text>

          <Text style={styles.action}>
            {task.completed ? "Undo" : "Complete"}
          </Text>
        </TouchableOpacity>
      ))}

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },

  title: {
    color: "#00D4FF",
    fontSize: 24,
    marginBottom: 20
  },

  card: {
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1f1f1f"
  },

  stat: { color: "#00D4FF" },

  task: { color: "#fff", fontSize: 18 },

  xp: { color: "#aaa" },

  action: {
    color: "#00D4FF",
    marginTop: 10
  }
});