import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home'
import './Style.scss'
import {
  BrowserRouter,
  Routes,
  Route,
Navigate
} from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';


function App() {
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children
  };


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={
            <ProtectedRoute>
              <Home />
              </ProtectedRoute>} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Register' element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
