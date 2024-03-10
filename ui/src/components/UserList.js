import { useState, useEffect } from 'react';
import axios from 'axios';
import { createChat } from "../store/chatSlice.js";
import { candidate_requestedUrl } from "../urls.js";
import jscookie from 'js-cookie';
import {  useNavigate } from 'react-router-dom';
function UserList() {
  const candidate_email = jscookie.get("candidate_email");
  const [data, setData] = useState([])
  const navigate = useNavigate();
  const chatwithfrnd = async (email) => {
    const payLoad = {
      senderId: candidate_email,
      reciverId: email,
      message: "Hi"
    }
    var chat_ID = await createChat(payLoad);
    // console.log("chat id from sllice : ", chat_ID)
    navigate('/userchat', { state: { email, chat_ID } })
  }
  useEffect(() => {
    async function showUser() {
      try {
      
        var res = await axios.get(candidate_requestedUrl + `/UserList`);
        // console.log(res, "res----");
        setData(res.data.data);
      
      } catch (error) {
        console.log("Error in show user list ", error);
      }
    }
    showUser();
  }, []);

  return (
    <>

      <div className="container my-3 ">
        <center><h3>All User List</h3></center>
        <div className="table-responsive">
        <table className="table my-3 border">
          <thead className="thead-dark">
            <tr className="table-active">
              <th scope="col">S No.</th>
              <th scope="col">User Name</th>
              <th scope="col">User Email</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Chat</th>
            </tr>
          </thead>
          <tbody>
            {
              data.length != 0 ?
                data.map((userData, index) => {
                  return (<>
                    {(userData.email != candidate_email) ? (<> <tr key={index}>
                      <td>{index}</td>
                      <td>{userData.name}</td>
                      <td>{userData.email}</td>
                      <td>{userData.contact}</td>
                      <td> <button className="btn btn-success text-white" onClick={e => chatwithfrnd(userData.email)}>Chat</button>
                      </td>
                    </tr></>) : (<></>)
                    }
                  </>)
                }) : <>
                  <tr>
                    <td colSpan={8} className="text-center">No Data Is Available</td>
                  </tr>
                </>
            }
          </tbody>
        </table>
        </div>
      </div>
    </>
  );
}
export default UserList;