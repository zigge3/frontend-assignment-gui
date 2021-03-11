//CSS
import styles from "../styles/Players.module.css";
//Bootstrap
import Container from "react-bootstrap/Container";
//Components
import PlayerList from "../components/players/player-list";
import AddPlayerForm from "../components/players/add-player-form";
import PlayerSearch from "../components/players/player-search";
import Header from "../components/shared/header";
//react
import PropTypes from "prop-types";
import { useState } from "react";
//utils
import apiHelper from "../utils/players/api-helper";
import useSWR, { mutate } from "swr";
const {
  GET_PLAYERS,
  ADD_PLAYER,
  DELETE_PLAYER,
  EDIT_PLAYER,
  GET_PLAYER,
} = apiHelper;
export default function Players({ preFetchedPlayers }) {
  //States
  const [searchPlayerId, setSearchPlayerId] = useState();
  const [searchPlayerError, setSearchPlayerError] = useState();
  //Fetch player if there is an ID
  const { data: foundPlayer, error } = useSWR(() =>
    searchPlayerId.length ? GET_PLAYER(searchPlayerId).key : null
  );
  //Fetch players unless it's SSR
  const { data: players } = useSWR(GET_PLAYERS().key, {
    initialData: preFetchedPlayers,
  });

  //Check if there where an error fetching player
  if (error) {
    //Clear cache for route
    mutate(GET_PLAYER(searchPlayerId).key, null, true);
    setSearchPlayerId("");
    setSearchPlayerError(error);
  }

  //Handlers
  const handlePlayerSubmit = async (name) => {
    const { key, config } = ADD_PLAYER(name);
    //Interpolate new state, this is abit bold but the entire idea of client interpolation is the wild west so...
    mutate(GET_PLAYERS().key, [...players, { name, id: "Loading" }], false);
    //Fetch
    await fetch(key, config);
    //Validate
    mutate(GET_PLAYERS().key);
  };

  const handleOnDeletePlayer = async (id) => {
    const { key, config } = DELETE_PLAYER(id);
    //Clear out cache for this player
    mutate(GET_PLAYER(id).key, null, false);
    //Interpolate new state
    const filteredPlayers = players.filter((player) => player.id != id);
    mutate(GET_PLAYERS().key, [...filteredPlayers], false);
    //Fetch
    await fetch(key, config);
    //Validate
    mutate(GET_PLAYERS().key);
  };

  const handleOnEditPlayerSubmit = async (id, name) => {
    const { key, config } = EDIT_PLAYER(id, name);
    //Interpolate new state
    //Literally yoinked from server file
    cachePlayer({ id, name });
    const mappedPlayers = players.map((p) => (p.id == id ? { ...p, name } : p));
    mutate(GET_PLAYERS().key, [...mappedPlayers], false);
    //Fetch
    await fetch(key, config);
    mutate(GET_PLAYERS().key);
  };
  //Caches a player incase, the data gets handled by some other call
  const cachePlayer = (props) => {
    mutate(GET_PLAYER(props.id).key, { ...props }, false);
  };

  const handleOnPlayerSearch = async (id) => {
    /*
     * If we have this user already, we can interpolate with the data, even if the getPlayer would return more info it's better than nothing
     */
    setSearchPlayerError();
    const interpolateFoundPlayer = players.find((player) => player.id === id);
    if (interpolateFoundPlayer) {
      mutate(GET_PLAYER(searchPlayerId).key, { ...interpolateFoundPlayer });
    }
    setSearchPlayerId(id);
  };

  return (
    <Container className={styles.container}>
      <div className="mb-4 mt-2">
        <Header />
      </div>
      <h2>Search player</h2>
      <div className="mb-4">
        <PlayerSearch
          onPlayerSearch={handleOnPlayerSearch}
          onDeletePlayer={handleOnDeletePlayer}
          onEditPlayerSubmit={handleOnEditPlayerSubmit}
          foundPlayer={foundPlayer}
          searchPlayerError={searchPlayerError}
        />
      </div>
      <h2>Player list</h2>
      <div className="mb-4">
        <PlayerList
          players={players}
          onDeletePlayer={handleOnDeletePlayer}
          onEditPlayerSubmit={handleOnEditPlayerSubmit}
        />
      </div>
      <h2>Add player</h2>
      <AddPlayerForm onPlayerSubmit={handlePlayerSubmit} />
    </Container>
  );
}

//Server side fetch players for SSR
export async function getServerSideProps() {
  try {
    const res = await fetch(GET_PLAYERS().key);
    const preFetchedPlayers = await res.json();
    if (!res.ok) throw "Someone made a woopsie";
    return {
      props: {
        preFetchedPlayers,
      },
    };
  } catch (err) {
    //Mock error logger, should log to propper service e.g Kibana
    console.error(err);
    //Should be error code to display a propper message to the user
    return {
      props: {
        error: true,
      },
    };
  }
}

Players.propTypes = {
  players: PropTypes.array,
};
