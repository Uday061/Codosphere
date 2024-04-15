import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : "auth" ,
    initialState : { id : "", isLogged : false } ,
    reducers : {
        login(state,actions){
            state.isLogged = true;
        },
        logout(state,actions){
            state.isLogged = false;
            navigate("/signin");
        }
    }
})

export { authSlice } ;
export const authActions = authSlice.actions ;