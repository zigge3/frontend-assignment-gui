//Defaults for requests
const API_BASE = "http://localhost:3000";
const DEFAULT_OPTIONS = {
  headers: {
    "Content-Type": "application/json",
  },
};

export default {
  //Gets a player
  GET_PLAYERS: () => [`${API_BASE}/players`],
  //Adds a player with name
  ADD_PLAYER: (name) => [
    `${API_BASE}/player`,
    {
      ...DEFAULT_OPTIONS,
      method: "POST",
      body: JSON.stringify({ name }),
    },
  ],
  //Deletes a player with id
  DELETE_PLAYER: (id) => [
    `${API_BASE}/player/${id}`,
    {
      ...DEFAULT_OPTIONS,
      method: "DELETE",
      body: JSON.stringify({ id }),
    },
  ],
  //Edits a players name with id
  EDIT_PLAYER: (id, name) => [
    `${API_BASE}/player/${id}`,
    {
      ...DEFAULT_OPTIONS,
      method: "PUT",
      body: JSON.stringify({ id, name }),
    },
  ],
  //Gets a player with id
  GET_PLAYER: (id) => [
    `${API_BASE}/player/${id}`,
    {
      ...DEFAULT_OPTIONS,
      method: "GET",
    },
  ],
};
