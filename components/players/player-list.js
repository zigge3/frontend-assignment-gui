//React
import ListGroup from "react-bootstrap/ListGroup";
import Item from "react-bootstrap/ListGroupItem";
//Components
import PlayerCard from "./player-card";

export default function PlayerList({
  players = [],
  onDeletePlayer,
  onEditPlayerSubmit,
}) {
  return (
    <ListGroup>
      {players.map(({ name, id }) => (
        <Item key={id}>
          <PlayerCard
            name={name}
            id={id}
            onDeletePlayer={onDeletePlayer}
            onEditPlayerSubmit={onEditPlayerSubmit}
          />
        </Item>
      ))}
    </ListGroup>
  );
}
