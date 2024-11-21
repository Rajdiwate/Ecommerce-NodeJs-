import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlics"

const store =configureStore({
    reducer : {user : authReducer}
})
export {store}