export const RANK_THRESHOLDS = [
  { name: "E", xp: 0 },
  { name: "D", xp: 1000 },
  { name: "C", xp: 3000 },
  { name: "B", xp: 7000 },
  { name: "A", xp: 15000 },
  { name: "S", xp: 30000 },
];

export const getRankFromXP = (xp) => {
  for (let i = RANK_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= RANK_THRESHOLDS[i].xp) {
      return RANK_THRESHOLDS[i].name;
    }
  }
  return "E";
};

export const updateRanks = (stats) => {
  const updated = {};

  Object.keys(stats).forEach(stat => {
    const xp = stats[stat].xp;

    updated[stat] = {
      xp,
      level: Math.floor(xp / 100),
      rank: getRankFromXP(xp),
    };
  });

  return updated;
};

// 🔥 RANK LOCK LOGIC
export const getOverallRank = (stats) => {
  const ranks = Object.values(stats).map(s => s.rank);

  const order = ["E", "D", "C", "B", "A", "S"];

  // find lowest rank → lock there
  const lowest = ranks.reduce((min, r) => {
    return order.indexOf(r) < order.indexOf(min) ? r : min;
  }, "S");

  return lowest;
};