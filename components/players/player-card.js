//CSS
import styles from "../../styles/PlayerCard.module.css";
//Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
//Components
import NameInputGroup from "./name-input-group";
import TinyIconButton from "./tiny-icon-button";
import IconLoaderButton from "../players/icon-loader-button";
//React
import { useState, useRef } from "react";
import PropTypes from "prop-types";
//React-icons
import { BsCheck, BsFileMinus, BsFilePlus } from "react-icons/bs";
//Next
import Image from "next/image";
//Utils
import helpers from "../../utils/players/helpers";
const { profilePicSvgString, splitName, formatName } = helpers;
export default function PlayerCard({
  name = "",
  id = "",
  onDeletePlayer,
  onEditPlayerSubmit,
}) {
  //State
  const [isEditMode, setIsEditMode] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const splittedName = splitName(name);
  const [firstName, setFirstName] = useState(splittedName[0]);
  const [lastName, setLastName] = useState(splittedName[1]);
  //Refs
  const formRef = useRef(null);
  //Handlers
  const handleOnEditPlayerSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsValidated(true);
    console.log(e.currentTarget.checkValidity(), onEditPlayerSubmit);
    if (e.currentTarget.checkValidity() && onEditPlayerSubmit) {
      //Make sure the name is propperly capitalized
      const fullNewName = formatName(firstName, lastName);
      onEditPlayerSubmit(id, fullNewName);
    }
  };
  const handleOnDeletePlayer = (e) => {
    e.preventDefault();
    setIsEditMode(false);
    onDeletePlayer(id);
  };
  const handleOnEditPlayer = (e) => {
    setIsValidated(false);
    setIsEditMode(true);
    console.log(firstName);
    e.preventDefault();
  };

  return (
    <Row className="align-items-center">
      <Col
        xs={{ span: 4, offset: 4 }}
        md={{ span: 2, offset: 0 }}
        className="mb-2 mb-md-0 d-flex justify-content-center justify-content-md-start"
      >
        <Image
          src={profilePicSvgString}
          alt="Some type of green figure"
          width={50}
          height={50}
        />
      </Col>
      <Col
        xs="12"
        md="5"
        className={`${styles.playerCard} text-center text-md-left mb-2 mb-md-0 font-weight-bold`}
      >
        {isEditMode ? (
          <Form
            validated={isValidated}
            onSubmit={handleOnEditPlayerSubmit}
            ref={formRef}
            id="newNameForm"
          >
            <NameInputGroup
              firstName={firstName}
              lastName={lastName}
              onFirstNameChange={setFirstName}
              onLastNameChange={setLastName}
            />
          </Form>
        ) : (
          name
        )}
      </Col>
      <Col xs="12" md="5" className="justify-content-end">
        <Row>
          <Col>
            {isEditMode ? (
              <IconLoaderButton
                ReactIcon={BsCheck}
                buttonProps={{
                  type: "submit",
                  form: "newNameForm",
                  block: true,
                }}
              >
                <span className="d-none d-sm-inline">Save</span>
              </IconLoaderButton>
            ) : (
              <TinyIconButton
                ReactIcon={BsFilePlus}
                buttonProps={{ onClick: handleOnEditPlayer, block: true }}
              >
                Edit
              </TinyIconButton>
            )}
          </Col>
          <Col>
            <TinyIconButton
              ReactIcon={BsFileMinus}
              buttonProps={{
                onClick: handleOnDeletePlayer,
                block: true,
                variant: "danger",
              }}
            >
              Remove
            </TinyIconButton>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

PlayerCard.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  onRemovePlayer: PropTypes.func,
};
