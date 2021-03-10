//CSS
import styles from "../styles/Players.module.css";
//Bootstrap
import Container from "react-bootstrap/Container";
//Components
import PlayerList from "../components/players/player-list";
import AddPlayerForm from "../components/players/add-player-form";
import PlayerSearch from "../components/players/player-search";
//react
import PropTypes from "prop-types";
import { useState } from "react";
//utils
import apiHelper from "../utils/players/api-helper";
import useSWR from "swr";
const {
  GET_PLAYERS,
  ADD_PLAYER,
  DELETE_PLAYER,
  EDIT_PLAYER,
  GET_PLAYER,
} = apiHelper;

export default function Players() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(...GET_PLAYERS(), fetcher);

  const [foundPlayer, setFoundPlayer] = useState();
  const [player404, setPlayer404] = useState();
  //Handlers
  const handlePlayerSubmit = async (name) => {
    const data = await fetch(...ADD_PLAYER(name));
  };
  const handleOnDeletePlayer = async (id) => {
    const data = await fetch(...DELETE_PLAYER(id));
  };
  const handleOnEditPlayerSubmit = async (id, name) => {
    const data = await fetch(...EDIT_PLAYER(id, name));
  };
  const handleOnPlayerSearch = async (id) => {
    const res = await fetch(...GET_PLAYER(id));
    if (!res.ok) {
      setFoundPlayer();
      setPlayer404(true);
      return;
    }
    setPlayer404(false);
    const player = await res.json();
    setFoundPlayer(player);
  };

  return (
    <Container className={styles.container} className="text-center">
      <h1>Frontend assignment</h1>
      <h2>Search player</h2>
      <div className="mb-2">
        <PlayerSearch
          onPlayerSearch={handleOnPlayerSearch}
          onDeletePlayer={handleOnDeletePlayer}
          onEditPlayerSubmit={handleOnEditPlayerSubmit}
          foundPlayer={foundPlayer}
          player404={player404}
        />
      </div>
      <h2>Player list</h2>
      <div className="mb-2">
        <PlayerList
          players={data}
          onDeletePlayer={handleOnDeletePlayer}
          onEditPlayerSubmit={handleOnEditPlayerSubmit}
        />
      </div>
      <h2>Add player</h2>
      <AddPlayerForm onPlayerSubmit={handlePlayerSubmit} />
    </Container>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(...GET_PLAYERS());
    const players = await res.json();
    if (!res.ok) throw "Someone made a woopsie";
    return {
      props: {
        players,
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
