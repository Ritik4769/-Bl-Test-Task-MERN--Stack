import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { candidate_requestedUrl } from "../urls.js";
import jscookie from 'js-cookie';
import Swal from 'sweetalert2';

const initialState = {
    email: ""
}

const candidateSlice = createSlice({
    name: 'candidateSlice',
    initialState,
    reducers: {
        addCandidate: async (state, action) => {
            try {
                var result = await axios.post(candidate_requestedUrl + '/candidateRegister', action.payload.candidate);
                // console.log("result ... ", result)
            } catch (error) {
                console.log("error ... ", error)
            }
        },
        candidateLogin: async (state, action) => {
            try {
                // console.log("login--=-=-=-=-=-= ", action.payload);

                var result = await axios.post(candidate_requestedUrl + '/candidateLogin', action.payload.candidateCredential);
                if (result.status == 201) {
                    jscookie.set("candidate_email", action.payload.candidateCredential.email);
                    Swal.fire({
                        icon: "success",
                        text: "login Successfully.... ",
                        showConfirmButton: true,
                        showCloseButton: true,
                        showCancelButton: true,
                        focusConfirm: false,
                        // timer: 2000.
                    });
                    action.payload.navigate("/");
                } else if (result.status == 203) {
                    Swal.fire({
                        icon: "error",
                        text: "Error while Login check Email and Password ",
                        showConfirmButton: true,
                        showCloseButton: true,
                        showCancelButton: true,
                        focusConfirm: false,
                        // timer: 2000.
                    });
                    action.payload.navigate("/candidateLogin", {
                        state: {
                            message: result.data.message
                        }
                    });
                }

                return result;
            } catch (err) {
                console.log("error in candidateSlice  login : ", err);
            }
        }
    }
});


export const { addCandidate, candidateLogin } = candidateSlice.actions;

export default candidateSlice.reducer;