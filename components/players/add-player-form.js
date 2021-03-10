//Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";

//Icons
import { BsFilePlus } from "react-icons/bs";

//Components
import NameInputGroup from "../players/name-input-group";
import IconLoaderButton from "../players/icon-loader-button";

//React
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

//Helpers
import helpers from "../../utils/players/helpers";

/**
 * A simple form to get the users first name and last name and then formats it and passes it to submit
 */
export default function AddPlayerForm({ onPlayerSubmit, isSubmiting }) {
  //States
  const [isValidated, setIsValidated] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const formRef = useRef(null);
  //Handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsValidated(true);
    if (e.currentTarget.checkValidity() && onPlayerSubmit) {
      //Make sure the name is propperly capitalized
      const fullName = helpers.formatName(firstName, lastName);
      onPlayerSubmit(fullName);
    }
  };
  //Effect hooks
  useEffect(() => {
    if (!isSubmiting) {
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  }, [isSubmiting]);

  //@TODO Issue with user submiting faulty characters and gets presented with the bad stock message on some browsers ¯\_(ツ)_/¯
  return (
    <Form validated={isValidated} onSubmit={handleSubmit} ref={formRef}>
      <FormGroup as={Row}>
        <Col xs="12" md="9" className="mb-1 mb-md-0">
          <NameInputGroup
            onFirstNameChange={setFirstName}
            onLastNameChange={setLastName}
          />
        </Col>
        <Col xs="12" md="3">
          <IconLoaderButton
            ReactIcon={BsFilePlus}
            buttonProps={{ type: "submit", block: true }}
          >
            Add player
          </IconLoaderButton>
        </Col>
      </FormGroup>
    </Form>
  );
}

AddPlayerForm.propTypes = {
  onPlayerSubmit: PropTypes.func,
  isSubmiting: PropTypes.bool,
};
