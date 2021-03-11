//React
import ListGroup from "react-bootstrap/ListGroup";
import Item from "react-bootstrap/ListGroupItem";
//Components
import PlayerCardItem from "./player-card-item";
export default function PlayerList({
  players = [],
  onDeletePlayer,
  onEditPlayerSubmit,
}) {
  return (
    <ListGroup>
      {players.length
        ? players.map(({ name, id }) => (
            <PlayerCardItem
              key={id}
              name={name}
              id={id}
              onDeletePlayer={onDeletePlayer}
              onEditPlayerSubmit={onEditPlayerSubmit}
            />
          ))
        : "No players in the list"}
    </ListGroup>
  );
}
