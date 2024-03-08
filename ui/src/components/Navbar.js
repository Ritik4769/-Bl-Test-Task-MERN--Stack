
import { Link, useNavigate } from 'react-router-dom';
import jscookie from 'js-cookie';
import Swal from 'sweetalert2';
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  if (user) {
    console.log("user ===== ", user.email);
    jscookie.set("candidate_email", user.email);

  }
  console.log("isAuthenticated : ", isAuthenticated);

  const candidate_email = jscookie.get("candidate_email");
  console.log("state ;;; ", candidate_email)
  const navigate = useNavigate();

  const candidateLogout = () => {
    jscookie.set("candidate_email", null);
    jscookie.remove("candidate_jwt_token");
    Swal.fire({
      icon: "success",
      text:"Logout Successfull.... ",
      // showConfirmButton: true,
      // showCloseButton: true,
      // showCancelButton: true,
      // focusConfirm: false,
      // timer: 2000.
    });
    navigate("/");
  }

  return (<>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container ">
        <Link className="navbar-brand" to="/">
          <span className="fa fa-smile-o mr-2"></span>Brain Inventory Task
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item px-2">
              <Link className="nav-link" style={{color:'white'}} to="/">Home</Link>
            </li>
            {isAuthenticated === false && candidate_email === "null" ? (
              <li className="nav-item px-2">
                <Link className="nav-link" style={{color:'white'}} to="/candidateLogin">Login</Link>
              </li>

            ) : (<>
              <li className="nav-item px-2">
                <Link className="nav-link" style={{color:'white'}} to="/UserList">UserList</Link>
              </li>
              <button className="btn btn-outline-light my-2 my-lg-0 " onClick={() => {
                logout();
                candidateLogout();
              }}>Logout</button>
            </>
            )}
          </ul>

        </div>
      </div>
    </nav>

  </>);
}
export default Navbar;

{/* <section class="w3l-header">
      <div class="header-right d-flex align-items-center justify-content-between ">
        <a class="navbar-brand" href="index.html"><span class="fa fa-smile-o"></span>Brain Inventory Task</a>

        <div id="nav" >
          <ul className="nav-inner ">


            {(isAuthenticated == false && candidate_email == "null") ?
              (<>
                <li><Link to="/"><span id='navstyle'>Home</span></Link></li>
                <li><Link to="/candidateLogin"><span id='navstyle'>Login</span></Link></li>
              </>
              ) : (<>
                <li><Link to="/"><span id='navstyle'>Home</span></Link></li>
                <li><Link to="/UserList"><span id='navstyle'>UserList</span></Link></li>
                
                
              </>
              )}
          </ul>
        </div>
        <div className="m-2"> 
              <button className=" btn btn-danger " onClick={() => {
                  logout();
                  candidateLogout();
                }}>logout</button>
        </div>
      </div>
    </section> */}