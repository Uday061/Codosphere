// import { createSlice } from "@reduxjs/toolkit";

// const authSlice = createSlice({
//     name : "auth" ,
//     initialState : { jwtToken : "", isLogged : false, user : null } ,
//     reducers : {
//         login(state,actions){
//             state.isLogged = true;
//             //state.user = { test : " YES " }
//             try {
//                 console.log("payload ",actions.payload.user);
//                 state.user = actions.payload.user; 
//                 state.jwtToken = sessionStorage.getItem("token");

//             } catch (error) {
//                 console.log("caught here")
//             }
            
//             // console.log("user ", state.user);
//         },
//         logout(state,actions){
//             state.isLogged = false;
//             navigate("/signin");
//         }
//     }
// })

// export { authSlice } ;
// export const authActions = authSlice.actions ;
import { createSlice } from "@reduxjs/toolkit";
import { Link } from 'react-router-dom'; // Import navigate from react-router-dom

const authSlice = createSlice({
    name : "auth" ,
    initialState : { jwtToken : "", isLogged : false, user : null } ,
    reducers : {
        login(state,actions){
            state.isLogged = true;
            //state.user = { test : " YES " }
            try {
                console.log("payload ",actions.payload.user);
                state.user = actions.payload.user; 
                state.jwtToken = sessionStorage.getItem("token");

            } catch (error) {
                console.log("caught here")
            }
            
            // console.log("user ", state.user);
        },
        logout(state,actions){
            state.isLogged = false;
            localStorage.clear();
        }
    }
})

export { authSlice } ;
export const authActions = authSlice.actions ;
