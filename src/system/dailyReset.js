import { generateTasks } from "./tasks";

const allTasksCompleted = (tasks) => {
  return tasks.length > 0 && tasks.every(t => t.done);
};

export const checkAndResetDaily = (user) => {
  const today = new Date().toDateString();

  if (user.lastReset !== today) {
    let newStreak = user.streak || 0;

    if (allTasksCompleted(user.tasks)) {
      newStreak += 1;
    } else {
      newStreak = 0;
    }

    return {
      ...user,
      streak: newStreak,
      tasks: generateTasks(user.stats),
      lastReset: today,
    };
  }

  return user;
};