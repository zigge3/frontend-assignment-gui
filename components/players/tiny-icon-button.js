//Bootstrap
import Button from "react-bootstrap/Button";
//Button that only display icon when switching to xs
export default function TinyIconButton({ buttonProps, ReactIcon, children }) {
  return (
    <Button block className="mr-1" {...buttonProps}>
      {ReactIcon && <ReactIcon className="mr-sm-2" />}
      <span className="d-none d-sm-inline">{children}</span>
    </Button>
  );
}
