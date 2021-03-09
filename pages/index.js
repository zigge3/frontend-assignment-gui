//CSS
import styles from "../styles/Players.module.css";
//Bootstrap
import Container from "react-bootstrap/Container";
//Components
import PlayerList from "../components/players/player-list";
import AddPlayerForm from "../components/players/add-player-form";
//react
import PropTypes from "prop-types";
//utils
import apiHelper from "../utils/players/api-helper";
const { GET_PLAYERS, ADD_PLAYER } = apiHelper;

export default function Players({ players = [] }) {
  const handlePlayerSubmit = async (name) => {
    console.log(...GET_PLAYERS());
    const data = await fetch(...ADD_PLAYER(name));
    //console.log(data);
  };
  return (
    <Container className={styles.container}>
      <div className="mb-2">
        <PlayerList players={players} />
      </div>
      <div>
        <AddPlayerForm onPlayerSubmit={handlePlayerSubmit} />
      </div>
    </Container>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(...GET_PLAYERS());
    const players = await res.json();
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
