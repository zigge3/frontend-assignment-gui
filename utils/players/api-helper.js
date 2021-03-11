//Defaults for requests
const API_BASE = "http://localhost:3000";
const DEFAULT_OPTIONS = {
  headers: {
    "Content-Type": "application/json",
  },
};

export default {
  //Fetcher for SWR, coppied from SWRs doc, since SWR is agnostic this could be Axios or graphQL etc.
  fetcher: async (url) => {
    const res = await fetch(url);

    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
      const error = new Error("An error occurred while fetching the data.");
      error.status = res.status;
      throw error;
    }

    return res.json();
  },

  //Gets a player
  GET_PLAYERS: () => {
    return {
      key: `${API_BASE}/players`,
      config: {
        ...DEFAULT_OPTIONS,
        method: "GET",
      },
    };
  },

  //Adds a player
  ADD_PLAYER: (name) => {
    return {
      key: `${API_BASE}/player`,
      config: {
        ...DEFAULT_OPTIONS,
        method: "POST",
        body: JSON.stringify({ name }),
      },
    };
  },

  //Deletes a player with id
  DELETE_PLAYER: (id) => {
    return {
      key: `${API_BASE}/player/${id}`,
      config: {
        ...DEFAULT_OPTIONS,
        method: "DELETE",
        body: JSON.stringify({ id }),
      },
    };
  },

  //Edits a players name with id
  EDIT_PLAYER: (id, name) => {
    return {
      key: `${API_BASE}/player/${id}`,
      config: {
        ...DEFAULT_OPTIONS,
        method: "PUT",
        body: JSON.stringify({ id, name }),
      },
    };
  },

  //Gets a player with id
  GET_PLAYER: (id) => {
    return {
      key: `${API_BASE}/player/${id}`,
      config: {
        ...DEFAULT_OPTIONS,
        method: "GET",
      },
    };
  },
};
