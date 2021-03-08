//CSS
import styles from "../styles/Players.module.css";

//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

//Components
import PlayerList from "../pages/components/players/player-list";

//React
import PropTypes from "prop-types";

export default function Players({ players = [] }) {
  return (
    <Container className={styles.container}>
      <Row className="mb-3">
        <Col>
          <PlayerList players={players} />
        </Col>
      </Row>
      <Row>
        <Col xs="4">
          <Button block>Add</Button>
        </Col>
      </Row>
    </Container>
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
