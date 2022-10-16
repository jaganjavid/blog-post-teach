import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router , Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import { signOut } from 'firebase/auth';
import {auth} from './firebase-config';

function App() {

  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = '/login';
    })
  }
  return (
    <Router>
        
      <nav className='navbar navbar-expand-lg justify-content-center navbar-light bg-dark text-center py-4'>
             <Link className='nav-link text-white mx-2' to="/">Home</Link>
             {!isAuth ? <Link className='nav-link text-white mx-2' to="/login">Login</Link> : (
              <>
                <Link className='nav-link text-white mx-2' to="/createpost">Createpost</Link>
                <button className='btn btn-primary' onClick={signUserOut}>Log out</button>
              </>
             )}

           
      </nav>


       <Routes>
          <Route path='/' element={<Home isAuth={isAuth}/>} ></Route>
          <Route path='/createpost' element={<CreatePost/>}></Route>
          <Route path='/login' element={<Login setIsAuth={setIsAuth}/>}></Route>
       </Routes>
    </Router>
  );
}

export default App;
