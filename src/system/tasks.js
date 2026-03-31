const TASK_POOL = {
  STR: {
    E: [{ text: "10 pushups", xp: 30 }],
    D: [{ text: "20 pushups", xp: 40 }],
    C: [{ text: "40 pushups", xp: 60 }],
    B: [{ text: "60 pushups", xp: 80 }],
    A: [{ text: "100 pushups", xp: 120 }],
    S: [{ text: "150 pushups", xp: 180 }],
  },

  INT: {
    E: [{ text: "Read 5 pages", xp: 30 }],
    D: [{ text: "Study 20 mins", xp: 40 }],
    C: [{ text: "Study 45 mins", xp: 60 }],
    B: [{ text: "Study 90 mins", xp: 80 }],
    A: [{ text: "Deep work 2 hrs", xp: 120 }],
    S: [{ text: "Deep work 4 hrs", xp: 180 }],
  },

  AGI: {
    E: [{ text: "Stretch 5 mins", xp: 20 }],
    D: [{ text: "Stretch 10 mins", xp: 30 }],
    C: [{ text: "Mobility work", xp: 50 }],
    B: [{ text: "Sprint drills", xp: 70 }],
    A: [{ text: "Agility training", xp: 100 }],
    S: [{ text: "Athletic session", xp: 150 }],
  },

  VIT: {
    E: [{ text: "Drink 2L water", xp: 25 }],
    D: [{ text: "Walk 5k steps", xp: 35 }],
    C: [{ text: "Walk 10k steps", xp: 60 }],
    B: [{ text: "Run 3km", xp: 80 }],
    A: [{ text: "Run 5km", xp: 120 }],
    S: [{ text: "Run 10km", xp: 180 }],
  },

  WIL: {
    E: [{ text: "Meditate 5 mins", xp: 25 }],
    D: [{ text: "Meditate 10 mins", xp: 35 }],
    C: [{ text: "Cold shower", xp: 60 }],
    B: [{ text: "No distractions 3 hrs", xp: 80 }],
    A: [{ text: "Zero dopamine day", xp: 120 }],
    S: [{ text: "Monk discipline day", xp: 180 }],
  },

  CHA: {
    E: [{ text: "Talk to 1 new person", xp: 20 }],
    D: [{ text: "Start a conversation", xp: 30 }],
    C: [{ text: "Hold 10 min convo", xp: 50 }],
    B: [{ text: "Lead discussion", xp: 70 }],
    A: [{ text: "Public speaking", xp: 100 }],
    S: [{ text: "Present to group", xp: 150 }],
  },

  PER: {
    E: [{ text: "Observe surroundings", xp: 20 }],
    D: [{ text: "Focus 10 mins", xp: 30 }],
    C: [{ text: "Deep observation", xp: 50 }],
    B: [{ text: "Spot patterns", xp: 70 }],
    A: [{ text: "Strategic thinking", xp: 100 }],
    S: [{ text: "High-level analysis", xp: 150 }],
  },

  PRO: {
    E: [{ text: "Plan your day", xp: 20 }],
    D: [{ text: "Complete 1 task", xp: 30 }],
    C: [{ text: "Complete 3 tasks", xp: 50 }],
    B: [{ text: "Deep work session", xp: 70 }],
    A: [{ text: "High output day", xp: 100 }],
    S: [{ text: "Peak productivity", xp: 150 }],
  },
};

// 🔥 SAFE PICK (no crash)
const pickTask = (stat, rank) => {
  const statPool = TASK_POOL[stat];

  if (!statPool) {
    return { text: "Do something productive", xp: 20 };
  }

  const pool = statPool[rank] || statPool["E"];

  return pool[Math.floor(Math.random() * pool.length)];
};

export const generateTasks = (stats) => {
  const tasks = [];

  const weakest = Object.entries(stats)
    .sort((a, b) => a[1].xp - b[1].xp)
    .slice(0, 3);

  let id = 1;

  weakest.forEach(([stat, data]) => {
    const taskData = pickTask(stat, data.rank);

    tasks.push({
      id: id++,
      stat,
      text: taskData.text,
      xp: taskData.xp,
      done: false,
    });
  });

  return tasks;
};