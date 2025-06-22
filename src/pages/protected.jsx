import { Navigate } from "react-router-dom";
 const ProtectedPage = ({ element }) => {

  if (true) {
        return element;
  }

  return <Navigate to={'/login'} replace />
}

export default ProtectedPage;