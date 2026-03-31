import { STATS } from "../constants/stats";
import { updateRanks, getOverallRank } from "./rank";
import { generateTasks } from "./tasks";

// 🔥 Rank → XP mapping
const RANK_TO_XP = {
  E: 0,
  D: 1000,
  C: 3000,
  B: 7000,
  A: 15000,
  S: 30000,
};

export const createUser = (name, inputs) => {
  const stats = {};

  STATS.forEach(statObj => {
    const stat = statObj.key;

    const rankInput = inputs[stat] || "E";
    const baseXP = RANK_TO_XP[rankInput] ?? 0;

    stats[stat] = {
      xp: baseXP,
      level: Math.floor(baseXP / 100),
      rank: rankInput,
    };
  });

  const updatedStats = updateRanks(stats);
  const tasks = generateTasks(updatedStats);

  return {
    name,
    stats: updatedStats,
    tasks,
    overallRank: getOverallRank(updatedStats),
    streak: 0,
    lastReset: new Date().toDateString(), // 🔥 IMPORTANT
  };
};