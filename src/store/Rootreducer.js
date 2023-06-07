import { combineReducers } from "redux";
import authReducer from "../Redux/Loginpages/authSlice";
// import authReducer from "../Redux/Loginpages/authSlice"
import tutorunverifiedReducer from "../Redux/Loginpages/tutorunverifiedSlice";
import tutorwarningReducer from "../Redux/Loginpages/tutorwarningSlice";
import tutorworkingReducer from "../Redux/Loginpages/tutorworkingSlice";
import tutortrialReducer from "../Redux/Loginpages/tutortrialSlice";

import tutorspaymentReducer from "../Redux/Loginpages/tutorspaymentSlice";

import tutorpaymentsReducer from "../Redux/Loginpages/tutorPaymentsSlice";

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
import questiontypetimeReducer from "../Redux/Loginpages/questiontypeTimeSlice";
import getQuestiontimeReducer from "../Redux/Loginpages/getQuestiontimeSlice";
import getAdminQuestionsSlice from "../Redux/Loginpages/getAdminQuestionSlice";
import postAdminQuestionsSlice from "../Redux/Loginpages/postAdminQuestionSlice";
import questiontypePriceReducer from "../Redux/Loginpages/questiontypePriceSlice";
import getWalletDataSlice from "../Redux/Loginpages/getWalletDataSlice";
import getTransactionHistorySlice from "../Redux/Loginpages/getTransactionHistorySlice";

import getstudentcontactReducer from "../Redux/Loginpages/getstudentcontactSlice";
import gettutorcontactReducer from "../Redux/Loginpages/gettutorcontactSlice";
import  tutorsuspendReducer  from "../Redux/Loginpages/tutorSuspendSlice";

const reducer = combineReducers({
    auth: authReducer,
    user: tutorunverifiedReducer,
    warning: tutorwarningReducer,
    working: tutorworkingReducer,
    trial: tutortrialReducer,

    suspend: tutorsuspendReducer,
    tutorpayment: tutorspaymentReducer,

    tutorPayments : tutorpaymentsReducer,

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
    questiontypetime: questiontypetimeReducer,
    gettiming: getQuestiontimeReducer,
    getAdminQuestions: getAdminQuestionsSlice,
    postAdminQuestions: postAdminQuestionsSlice,
    questiontypeprice: questiontypePriceReducer,
    getWalletData: getWalletDataSlice,
    getTransactionHistory: getTransactionHistorySlice,
    studentcontact: getstudentcontactReducer,
    tutorcontact: gettutorcontactReducer
});

export default reducer;