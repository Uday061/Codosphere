import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : "auth" ,
    initialState : { id : "", isLogged : false, user : null } ,
    reducers : {
        login(state,actions){
            state.isLogged = true;
            //state.user = { test : " YES " }
             try {
                console.log("payload ",actions.payload.user);
                state.user = actions.payload.user; 
            } catch (error) {
                console.log("caught here")
            }
            
            // console.log("user ", state.user);
        },
        logout(state,actions){
            state.isLogged = false;
            navigate("/signin");
        }
    }
})

export { authSlice } ;
export const authActions = authSlice.actions ;