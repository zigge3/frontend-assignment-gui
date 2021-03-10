//Bootstrap
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

//Proptypes
import PropTypes from "prop-types";

//A simple button that contains both a spinner and a Icon, it's your typical spinner loader button thingy
export default function IconLoaderButton({
  buttonProps,
  isLoading,
  children,
  ReactIcon,
}) {
  //I know spreading props into another component is a sin, but just this once plz
  return (
    <Button disabled={isLoading} {...buttonProps}>
      {isLoading ? (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          className="mr-1"
        />
      ) : (
        <ReactIcon className="mr-1" />
      )}
      {children}
    </Button>
  );
}

IconLoaderButton.prototype = {
  ReactIcon: PropTypes.func.isRequired,
};
