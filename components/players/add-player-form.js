//Bootstrap
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import InputGroup from "react-bootstrap/InputGroup";
import Control from "react-bootstrap/FormControl";
import Feedback from "react-bootstrap/Feedback";
import Spinner from "react-bootstrap/Spinner";

//React
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

//Helpers

/**
 * A simple form to get the users first name and last name and then formats it and passes it to submit
 */
export default function AddPlayerForm({ onPlayerSubmit, isSubmiting }) {
  const [isValidated, setIsValidated] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsValidated(true);
    if (e.currentTarget.checkValidity() && onPlayerSubmit) {
      //Make sure the name is propperly capitalized
      const fullName =
        capitalizeFirstLetter(firstName.toLowerCase()) +
        " " +
        capitalizeFirstLetter(lastName.toLowerCase());
      onPlayerSubmit(fullName);
    }
  };

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
        <Col xs="12" sm="3" className="">
          <Button disabled={isSubmiting} type="submit" block>
            {isSubmiting && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
            Add player
          </Button>
        </Col>
        <Col
          xs={{ span: 12, order: "first" }}
          sm={{ span: 9, order: "last" }}
          className="d-flex mb-1 mb-sm-0"
        >
          <InputGroup>
            <Control
              type="string"
              className="mr-1"
              placeholder="First name"
              pattern="[^\d]+"
              required
              onChange={(e) => setFirstName(e.currentTarget.value)}
            />
            <Control
              type="string"
              placeholder="Last name"
              pattern="[^\d]+"
              required
              onChange={(e) => setLastName(e.currentTarget.value)}
            />
            <Feedback type="invalid">
              Only alphabetic characters are allowed and no empty fields.
            </Feedback>
          </InputGroup>
        </Col>
      </FormGroup>
    </Form>
  );
}

AddPlayerForm.propTypes = {
  onPlayerSubmit: PropTypes.func,
  isSubmiting: PropTypes.bool,
};
