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

});


export default reducer;