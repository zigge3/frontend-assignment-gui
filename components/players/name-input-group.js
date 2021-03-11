import InputGroup from "react-bootstrap/InputGroup";
import Control from "react-bootstrap/FormControl";
import Feedback from "react-bootstrap/Feedback";

//Simple input group for name and lastname
export default function NameInputGroup({
  firstName,
  lastName,
  onFirstNameChange,
  onLastNameChange,
}) {
  const handleFirstNameChange = (e) => {
    e.preventDefault();
    if (e.currentTarget && onFirstNameChange) {
      onFirstNameChange(e.currentTarget.value);
    }
  };
  const handleLastNameChange = (e) => {
    e.preventDefault();
    if (e.currentTarget && onLastNameChange) {
      onLastNameChange(e.currentTarget.value);
    }
  };
  //Pattern matchtes on non digit and no whitespace
  return (
    <InputGroup>
      <Control
        type="string"
        className="mr-1"
        placeholder="First name"
        pattern="[^\d^\s]+"
        required
        value={firstName}
        onChange={handleFirstNameChange}
      />
      <Control
        type="string"
        placeholder="Last name"
        pattern="[^\d^\s]+"
        required
        value={lastName}
        onChange={handleLastNameChange}
      />
      <Feedback type="invalid">
        Only alphabetic characters are allowed and no empty fields.
      </Feedback>
    </InputGroup>
  );
}
