//Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Control from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import Feedback from "react-bootstrap/Feedback";
import PlayerCardItem from "./player-card-item";
import ListGroupItem from "react-bootstrap/ListGroupItem";
//React icons
import { BsSearch } from "react-icons/bs";
//Components
import TinyIconButton from "./tiny-icon-button";
//React
import { useState, Fragment } from "react";

export default function PlayerSearch({
  onPlayerSearch,
  foundPlayer,
  onDeletePlayer,
  onEditPlayerSubmit,
  searchPlayerError,
}) {
  //States
  const [searchId, setSearchId] = useState("");
  //Handlers
  const handleOnPlayerSearch = (e) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity()) {
      onPlayerSearch(searchId);
    }
  };
  const handleOnSearchChange = (e) => {
    e.preventDefault();
    setSearchId(e.currentTarget.value);
  };
  return (
    <Fragment>
      <Form onSubmit={handleOnPlayerSearch}>
        <FormGroup as={Row}>
          <Col xs="9">
            <Control
              type="string"
              placeholder="Player ID"
              required
              onChange={handleOnSearchChange}
            />
          </Col>
          <Col xs="3">
            <TinyIconButton
              ReactIcon={BsSearch}
              buttonProps={{ type: "submit", block: true }}
            >
              Search
            </TinyIconButton>
          </Col>
          <Col>{searchPlayerError && "Player not found"}</Col>
        </FormGroup>
      </Form>
      {foundPlayer && (
        <Row>
          <Col>
            <PlayerCardItem
              onDeletePlayer={onDeletePlayer}
              onEditPlayerSubmit={onEditPlayerSubmit}
              name={foundPlayer.name}
              id={foundPlayer.id}
            ></PlayerCardItem>
          </Col>
        </Row>
      )}
    </Fragment>
  );
}
