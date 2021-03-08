//React
import ListGroup from "react-bootstrap/ListGroup";
import Item from "react-bootstrap/ListGroupItem";

//Components
import PlayerCard from "../players/player-card";

//React
import { Fragment } from "react";

export default function PlayerList({ players = [] }) {
  return (
    <Fragment>
      <ListGroup>
        {players.map(({ name, id }) => (
          <Item key={id}>
            <PlayerCard name={name} />
          </Item>
        ))}
      </ListGroup>
    </Fragment>
  );
}
