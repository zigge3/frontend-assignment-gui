//Bootstrap
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
//Components
import Logo from "./logo";

//Wrapper for Logo, could and should maybe be more complex
export default function Header() {
  return (
    <Row>
      <Col>
        <Logo />
      </Col>
    </Row>
  );
}
