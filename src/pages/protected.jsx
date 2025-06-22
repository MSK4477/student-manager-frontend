import { Navigate } from "react-router-dom";
 
const ProtectedPage = ({ element }) => {

  if (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))) {
        return element;
  }

  return <Navigate to={'/login'} replace />
}

export default ProtectedPage;