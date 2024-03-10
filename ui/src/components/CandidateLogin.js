import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from 'react-redux';
import { candidateLogin } from '../store/candidateSlice.js';
import { useState } from 'react';

function CandidateLogin() {
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();
  // console.log("user ==== ", user);
  const dispatch = useDispatch();

  const [candidateCredential, setCandidateCredential] = useState();
  const navigate = useNavigate();

  const getData = (event) => {
    const { name, value } = event.target;
    setCandidateCredential({
      ...candidateCredential,
      [name]: value
    });
  }
  const handleSubmit = async(event) => {
    event.preventDefault();
    var result =  dispatch(candidateLogin({candidateCredential,navigate}));
    console.log("result of candidate : ", result.payload.candidateCredential.email);
   
  }

  return (<>
    <section style={{ marginTop: "-50px" }} className="w3l-index3">
      <div className="midd-w3 py-5">
        <div className="container py-xl-5 py-lg-3">
          <div className="row">
            <div className="col-lg-6 left-wthree-img text-right">
              <img src="assets/images/g5.jpg" alt="" className="img-fluid rounded" />
            </div>
            <div className="col-lg-6 mt-lg-0 mt-5 about-right-faq">
              <br /><br />
              <h3 className="text-da">Candidate Login</h3>
              {/* {location.state==null ? (message!=null ? message : "") : (message==null ? location.state.message : message)}      */}
              <br />
              {/* "/candidate/candidateLogin" */}
              {isAuthenticated ? (<>
                <form onSubmit={handleSubmit} className="form-group" method="post">
                  <input className="form-control" onChange={getData} type="email" placeholder="Enter Email" id="email" name="email" /> <br />
                  <input className="form-control" onChange={getData} type="password" placeholder="Enter Password" id="password" name="password" /> <br />
                  <input className="btn btn-primary btn-block" type="submit" value="Login" />
                  <input className="btn btn-success btn-block" type="reset" onClick={e => loginWithRedirect()} value="Continue With Google" />
                  <br />
                </form></>) : (<><form onSubmit={handleSubmit} className="form-group" method="post">
                  <input className="form-control" onChange={getData} type="email" placeholder="Enter Email" id="email" name="email" /> <br />
                  <input className="form-control" onChange={getData} type="password" placeholder="Enter Password" id="password" name="password" /> <br />
                  <input className="btn btn-primary btn-block" type="submit" value="Login" />
                  <input className="btn btn-success btn-block" onClick={e => loginWithRedirect()} value="Continue With Google" />
                  <br />
                </form></>)}

              <Link to="/candidateRegister">
                <span className="btn btn-link">Yet Not Register ? Register Here</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>

  </>);
}
export default CandidateLogin;