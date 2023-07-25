import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <h1 className="text-4xl font-bold text-center text-orange-600">
        Loading
      </h1>
    );
  } else {
    return user ? children : <Navigate to="/" />;
  }
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PrivateRoute;
