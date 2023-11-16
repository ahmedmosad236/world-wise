import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { Auth } = useAuth();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!Auth) navigate("/");
    },
    [Auth]
  );
  return Auth ? children : null;
}

export default ProtectedRoute;
