import styles from "../styles/Players.module.css";
import PlayerList from "../pages/components/players/player-list";
import PropTypes from "prop-types";

export default function Players({ players = [] }) {
  console.log(players);
  return (
    <div className={styles.container}>
      <PlayerList players={players} />
    </div>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch("http://localhost:3000/players");
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
