import { addCandidate } from "../store/candidateSlice.js";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';


var username = false, phone = false, checkemail = false, pass = false
function CandidateRegistration() {
  const dispatch = useDispatch();

  const [candidate, setCandidate] = useState({});
  const navigate = useNavigate();
  const getData = (event) => {
    let { name, value } = event.target;

    setCandidate({
      ...candidate,
      [name]: value
    });
    validateField(name, value)

  }


  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        var reg = /^[A-Za-z\s]+$/;
        if (value.trim() == "") {
          document.getElementById("name").style.color = "red";
          document.getElementById("usertext").style.color = "red";
          document.getElementById("usertext").innerHTML = "Name Required";
          username = false;
          return false
        } else if (reg.test(value)) {
          document.getElementById('name').style.color = "green";
          document.getElementById('usertext').style.color = "green";
          document.getElementById("usertext").innerHTML = "Looking Good";
          username = true;
          return true
        } else {
          console.log("usertext")
          document.getElementById('name').style.color = "red";
          document.getElementById('usertext').style.color = "red";
          document.getElementById("usertext").innerHTML = "Invalid name please enter only character";
          username = false;
          return false;
        }
        break;

      case 'contact':
        var reg = /^[6789][0-9]{9}$/;
        if (value.trim() == '') {
          document.getElementById("contact").style.color = "red";
          document.getElementById("phone").style.color = "red";
          document.getElementById("phone").innerHTML = "Mobile Number Required";
          phone = false;
          return false;
        } else if ((/^[A-Za-z]+$/).test(value)) {
          document.getElementById("contact").style.color = "red";
          document.getElementById("phone").style.color = "red";
          document.getElementById("phone").innerHTML = "Mobile Number must be a digit only";
          phone = false;
          return false;
        } else if (!reg.test(value)) {
          document.getElementById("contact").style.color = "red";
          document.getElementById("phone").style.color = "red";
          document.getElementById("phone").innerHTML = "Enter 10 digits Mobile number";
          phone = false;
          return false;
        } else {
          document.getElementById("contact").style.color = "green";
          document.getElementById("phone").style.color = "green";
          document.getElementById("phone").innerHTML = "Looking Good";
          phone = true;
          return true;
        }
        break;

      case 'email':
        var email = document.getElementById("login_email");
        if (value.trim() == "") {
          document.getElementById("email").style.color = "red";
          document.getElementById("emailSpan").style.color = "red";
          document.getElementById("emailSpan").innerHTML = "Email Required";
          checkemail = false;
          return false;
        } else {
          var reg = /^\w+([\.-])?\w*@[a-z]*([\.][a-z]{2,3})+$/;
          if (reg.test(value)) {
            document.getElementById("email").style.color = "green";
            document.getElementById("emailSpan").style.color = "green";
            document.getElementById("emailSpan").innerHTML = "Looking Good";
            checkemail = true;
            return true;
          } else {
            document.getElementById("email").style.color = "red";
            document.getElementById("emailSpan").style.color = "red";
            document.getElementById("emailSpan").innerHTML = "Invalid email";
            checkemail = false;
            return false;
          }
        }
        break;

      case 'password':
        if (value.trim() == "") {
          console.log("password");
          document.getElementById("password").style.color = "red";
          document.getElementById("pass").innerHTML = "Password Required (like Ritik@123)";
          document.getElementById("pass").style.color = "red";
          document.getElementById("pass").innerHTML = "Invalid password   (like Ritik@123)";
          pass = false;
          return false;
        } else {
          var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          if (reg.test(value)) {
            console.log("1password");
            document.getElementById("pass").style.color = "green";
            document.getElementById("password").style.color = "green";
            document.getElementById("pass").innerHTML = "Valid Password";
            pass = true;
            return true;
          } else {
            console.log("2password");
            document.getElementById("password").style.color = "red";
            document.getElementById("pass").style.color = "red";
            document.getElementById("pass").innerHTML = "Invalid Password Enter  like Ritik@123)";

            pass = false;
            return false;
          }
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (username && pass && checkemail && phone) {

      const data = dispatch(addCandidate({candidate}));
      console.log("============ ",data)
      if(data){

        Swal.fire({
          icon: "success",
          text:"Registration Successfull.... ",
          showConfirmButton: true,
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          // timer: 2000.
        });
      }

    }
    navigate("/candidateLogin");
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
              <h3 className="text-da">Candidate Registration</h3>
              <br />
              {/* action="/candidate/candidateRegistration" */}
              <form onSubmit={handleSubmit} method="post" className="form-group" enctype="multipart/form-data">
                <input onChange={getData} required className="form-control" type="text" placeholder="Enter Candidate Name" id="name" name="name" />
                <div className='d-flex p-2'>
                  <span id="usertext" style={{ marginTop: "10px" }} ></span>
                </div>
                <input onChange={getData} required className="form-control" type="email" placeholder="Enter Email" id="email" name="email" />
                <div className='d-flex  p-2'>
                  <span id='emailSpan'></span>
                </div>
                <input onChange={getData} required className="form-control" type="password" placeholder="Enter Password like Ritik@123" id="password" name="password" />
                <div className='d-flex p-2'>
                  <span id='pass'></span>
                </div>
                <input onChange={getData} required className="form-control" type="number" placeholder="Enter contact number" id="contact" name="contact" />
                <div className='d-flex p-2'>
                  <span id='phone'></span>
                </div>

                <input className="btn btn-primary btn-block" type="submit" value="Register" />

                <input className="btn btn-danger btn-block" type="reset" value="Reset" />


              </form>
              <Link to="/candidateLogin">
                <span className="btn btn-link">Already Registered ? Login Here</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>

  </>);
}
export default CandidateRegistration;