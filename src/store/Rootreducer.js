import { combineReducers } from "redux";
import authReducer from "../Redux/Loginpages/authSlice";
// import authReducer from "../Redux/Loginpages/authSlice"
import tutorunverifiedReducer from "../Redux/Loginpages/tutorunverifiedSlice";
import tutorsuspendedReducer from "../Redux/Loginpages/tutorsuspendedSlice";
import tutorworkingReducer from "../Redux/Loginpages/tutorworkingSlice";
import tutorspaymentReducer from "../Redux/Loginpages/tutorspaymentSlice";
import tutordetailReducer from "../Redux/Loginpages/tutordetailSlice";
import studentlistReducer from "../Redux/Loginpages/studentlistSlice";
import admintutorexamverifyReducer from "../Redux/Loginpages/admintutorexamverifySlice";
import searchengineReducer from "../Redux/Loginpages/searchengineSlice";

import testimonialReducer from "../Redux/Loginpages/testimonialSlice";
import testimonialstatusReducer from "../Redux/Loginpages/testimonialStatusSlice";
import testimonialformReducer from "../Redux/Loginpages/testimonialFormSlice";

const reducer = combineReducers({
    auth: authReducer,
    user: tutorunverifiedReducer,
    suspended: tutorsuspendedReducer,
    working: tutorworkingReducer,
    tutorpayment: tutorspaymentReducer,
    tutordetail: tutordetailReducer,
    studentlist: studentlistReducer,
    admintutorexamverify: admintutorexamverifyReducer,
    searchengine: searchengineReducer,
    testimonial : testimonialReducer,
    testimonialstatus : testimonialstatusReducer,
    testimonialform : testimonialformReducer,

});


export default reducer;