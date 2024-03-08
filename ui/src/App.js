import './App.css';
import Navbar from './components/Navbar.js';
import {Routes,Route} from 'react-router-dom';
import CandidateLogin from './components/CandidateLogin.js';
import { Auth0Provider } from '@auth0/auth0-react';
import Home from './components/Home.js';
import CandidateRegistration from './components/CandidateRegistration.js';
import UserList  from './components/UserList.js';
import Chat from './components/Chat.js';
function App() {
  return (<>
  <Auth0Provider
    domain="dev-g3ubvz1vkris7ba4.us.auth0.com"
    clientId="ZIahZCD0Ih2fN07PSTfMTInbsG011cqU"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/candidateLogin" element={<CandidateLogin/>}></Route>
      <Route path="/candidateRegister" element={<CandidateRegistration/>}></Route>
      <Route path="/UserList" element={<UserList/>}></Route>
      <Route path="/userchat" element={<Chat/>}></Route>
    </Routes>
    </Auth0Provider>
  </>
  );
}

export default App;
