const API_BASE = "http://localhost:3000";
const DEFAULT_OPTIONS = {
  headers: {
    "Content-Type": "application/json",
  },
};
export default {
  GET_PLAYERS: () => [`${API_BASE}/players`],
  ADD_PLAYER: (name) => [
    `${API_BASE}/player`,
    {
      ...DEFAULT_OPTIONS,
      method: "POST",
      body: JSON.stringify({ name }),
    },
  ],
};
