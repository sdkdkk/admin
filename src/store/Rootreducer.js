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
import testimonialUserDeleteReducer from "../Redux/Loginpages/testimonialUserDeleteSlice";
import testimonialformReducer from "../Redux/Loginpages/testimonialFormSlice";
import admintutorexamresponseReducer from "../Redux/Loginpages/admintutorexamresponseSlice";
import postPageDataSliceReducer from "../Redux/Loginpages/postPageDataSlice";
import getPageListSliceReducer from "../Redux/Loginpages/getPageListSlice";
import updatePageDataSliceReducer from "../Redux/Loginpages/updatePageDataSlice";
import pagesListDeleteSliceReducer from "../Redux/Loginpages/pagesListDeleteSlice";
import getTutorQuestionsListSliceReducer from "../Redux/Loginpages/getTutorQuestionListSlice";
import postTutorQuestionListSlice from "../Redux/Loginpages/postTutorQuestionListSlice";
import updateTutorQuestionListSlice from "../Redux/Loginpages/updateTutorQuestionSlice";
import deleteTutorQuestionSlice from "../Redux/Loginpages/deleteTutorQuestionSlice";
import socialMediaReducer from "../Redux/Loginpages/socialMediaSlice";
import questiontypeReducer from "../Redux/Loginpages/questiontypeSlice";
import questionPricingReducer from "../Redux/Loginpages/questionPricingSlice";
import getQuestiontimeReducer from "../Redux/Loginpages/getQuestiontimeSlice";

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
  testimonial: testimonialReducer,
  testimonialstatus: testimonialstatusReducer,
  testimonialUserDelete: testimonialUserDeleteReducer,
  admintutorexamresponse: admintutorexamresponseReducer,
  getPageList: getPageListSliceReducer,
  postPageData: postPageDataSliceReducer,
  updatePageData: updatePageDataSliceReducer,
  pagesListDelete: pagesListDeleteSliceReducer,
  getTutorQuestionsList: getTutorQuestionsListSliceReducer,
  postTutorQuestion: postTutorQuestionListSlice,
  updateTutorQuestion: updateTutorQuestionListSlice,
  deleteTutorQuestion: deleteTutorQuestionSlice,
  testimonialform: testimonialformReducer,
  socialmedia: socialMediaReducer,
  questiontype: questiontypeReducer,
  questionpricing: questionPricingReducer,
  gettiming: getQuestiontimeReducer,
});

export default reducer;
