import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./components/shared/Navbar";
import Tutorlist from "./components/Tutors/Tutorlist";

import Tutorspayment from "./components/Tutors/Tutorspayment";
import Studentlist from "./components/Student/Studentlist";
import Studentpayment from "./components/Student/Studentpayment";
import Wallet from "./components/Wallet/Wallet";
import Searchengine from "./components/Searchengine/Searchengine";
import Addnew from "./components/Searchengine/Addnew";
import Searchquestion from "./components/Searchengine/Searchquestion";
import Testimonial from "./components/Testimonial/Testimonial";
import Professionaldetails from "./components/Tutors/Professionaldetails";
import Pages from "./components/Pages/Pages";
import Socialmediasetting from "./components/Services/Socialmediasetting";
import Login from "./components/Login/Login";
import Scroll from "./components/Scroll/Scroll";
import Tutorexam from "./components/Tutorexam/Tutorexam";

import Tutordetails from "./components/Tutors/Tutordetails";
import Studentdetails from "./components/Student/Studentdetails";
import Testexam from "./components/Tutorexam/Testexam";
import Examdetails from "./components/Tutorexam/Examdetails";
import Searchenginequedetail from "./components/Searchengine/Searchenginequedetail";
import Logout from "./components/Logout/Logout";
import Contactus from "./components/Contactus/Contactus";

import Questiontiming from "./components/Question/Questiontiming";
import Questionpricing from "./components/Question/Questionpricing";
import Questionreasnwer from "./components/Question/Questionreasnwer";
import Curruncy from "./components/Curruncy/Curruncy";
import Coupon from "./components/Offers/Coupon";
import Tutorsubject from "./components/Tutorsub/Tutorsubject";
import Tutorexamconfig from "./components/Tutorconfig/Tutorexamconfig";
import Tutorsearch from "./components/Tutorexam/Tutorsearch";
import Questiontype from "./components/Question/Questiontype";
import Questions from "./components/Question/Questions";

import Tutorque from "./components/Question/Tutorque";
import Adminque from "./components/Question/Adminque";
import Reanswerque from "./components/Question/Reanswerque";
import Unsolvedque from "./components/Question/Unsolvedque";

import Mcqquestion from "./components/Questionpages/Mcqquestion";
import Truefalseque from "./components/Questionpages/Truefalseque";
import Fillups from "./components/Questionpages/Fillups";

import Matchfollow from "./components/Questionpages/Matchfollow";
import Tutorquestiondetails from "./components/Tutors/Tutorquestiondetails";
import Studentquestiondetails from "./components/Student/Studentquestiondetails";

import FillupsSearchengine from "./components/QuestionpageSearchengine/FillupsSearchengine";
import MatchfollowSearchengine from "./components/QuestionpageSearchengine/MatchfollowSearchengine";
import McqquestionSearchengine from "./components/QuestionpageSearchengine/McqquestionSearchengine";
import QuestionanswerSearchengine from "./components/QuestionpageSearchengine/QuestionanswerSearchengine";
import TruefalsequeSearchengine from "./components/QuestionpageSearchengine/TruefalsequeSearchengine";
import Users from "./components/permission/Users";
import Roles from "./components/permission/Roles";
import Addnewuser from "./components/permission/Addnewuser";
import Addnewrole from "./components/permission/Addnewrole";
import TransactionDetails from "./components/Wallet/TransactionDetails";
import StudentClass from "./components/studentClass/StudentClass";
import { isLoggedIn } from "./helpers/utility";
import ForgotpassWord from "./components/ForgotPassWord/ForgotpassWord";
import AddMobile from "./components/addmobile/AddMobile";
import Contactdetails from "./components/Contactus/Contactdetails";
import IssueQuestion from "./components/Question/IssueQuestion";
import IssueInfo from "./components/Question/IssueInfo";
import Studentpostingstreak from "./components/Bonussection/Studentpostingstreak";
import Tutorpostingstreak from "./components/Bonussection/Tutorpostingstreak ";
import Studentreferral from "./components/Bonussection/Studentreferral";
import Tutorreferral from "./components/Bonussection/Tutorreferral";
import Subscription from "./components/Wallet/Subscription";




function RequireAuth({ children }) {
  let auth = isLoggedIn();

  if (!auth) {
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="navbar"
          element={
            <RequireAuth>
              <Navbar />
            </RequireAuth>
          }
        />
        <Route
          path="tutorlist"
          element={
            <RequireAuth>
              <Tutorlist />
            </RequireAuth>
          }
        />
        

        <Route
          path="tutorspayment"
          element={
            <RequireAuth>
              <Tutorspayment />
            </RequireAuth>
          }
        />
        <Route
          path="studentlist"
          element={
            <RequireAuth>
              <Studentlist />
            </RequireAuth>
          }
        />
        <Route
          path="studentpayment"
          element={
            <RequireAuth>
              <Studentpayment />
            </RequireAuth>
          }
        />
        <Route
          path="wallet"
          element={
            <RequireAuth>
              <Wallet />
            </RequireAuth>
          }
        />

        <Route
        path="/subscription"
        element={
          <RequireAuth>
            <Subscription />
          </RequireAuth>
        }
      />
        <Route
          path="transactionDetails"
          element={
            <RequireAuth>
              <TransactionDetails />
            </RequireAuth>
          }
        />
        <Route
          path="Searchengine"
          element={
            <RequireAuth>
              <Searchengine />
            </RequireAuth>
          }
        />
        <Route
          path="addnew"
          element={
            <RequireAuth>
              <Addnew />
            </RequireAuth>
          }
        />
        <Route
          path="searchquestion"
          element={
            <RequireAuth>
              <Searchquestion />
            </RequireAuth>
          }
        />
        <Route
          path="testimonial"
          element={
            <RequireAuth>
              <Testimonial />
            </RequireAuth>
          }
        />
        <Route
          path="professionaldetails/:_id"
          element={
            <RequireAuth>
              <Professionaldetails />
            </RequireAuth>
          }
        />
        <Route
          path="pages"
          element={
            <RequireAuth>
              <Pages />
            </RequireAuth>
          }
        />
        <Route
          path="socialmediasetting"
          element={
            <RequireAuth>
              <Socialmediasetting />
            </RequireAuth>
          }
        />
        <Route path="login" element={<Login />} />
        <Route
          path="/tutordetails/:_id/:active"
          element={
            <RequireAuth>
              <Tutordetails />
            </RequireAuth>
          }
        />

        <Route
          path="/tutorexam"
          element={
            <RequireAuth>
              <Tutorexam />
            </RequireAuth>
          }
        />
        <Route
          path="/tutorsearch"
          element={
            <RequireAuth>
              <Tutorsearch />
            </RequireAuth>
          }
        />

        <Route
          path="/studentdetails/:_id"
          element={
            <RequireAuth>
              <Studentdetails />
            </RequireAuth>
          }
        />
        <Route
          path="/testexam"
          element={
            <RequireAuth>
              <Testexam />
            </RequireAuth>
          }
        />
        <Route
          path="/examdetails"
          element={
            <RequireAuth>
              <Examdetails />
            </RequireAuth>
          }
        />
        <Route
          path="/searchenginequedetail"
          element={
            <RequireAuth>
              <Searchenginequedetail />
            </RequireAuth>
          }
        />
        <Route
          path="/tutorquestiondetails"
          element={
            <RequireAuth>
              <Tutorquestiondetails />
            </RequireAuth>
          }
        />
        <Route
          path="/studentquestiondetails"
          element={
            <RequireAuth>
              <Studentquestiondetails />
            </RequireAuth>
          }
        />

        <Route
          path="/questiontiming"
          element={
            <RequireAuth>
              <Questiontiming />
            </RequireAuth>
          }
        />
        <Route
          path="/questionpricing"
          element={
            <RequireAuth>
              <Questionpricing />
            </RequireAuth>
          }
        />
        <Route
          path="/questionreanswer"
          element={
            <RequireAuth>
              <Questionreasnwer />
            </RequireAuth>
          }
        />
        <Route
          path="/curruncy"
          element={
            <RequireAuth>
              <Curruncy />
            </RequireAuth>
          }
        />
        <Route
          path="/coupon"
          element={
            <RequireAuth>
              <Coupon />
            </RequireAuth>
          }
        />
        <Route
          path="/tutorsubject"
          element={
            <RequireAuth>
              <Tutorsubject />
            </RequireAuth>
          }
        />
        <Route
          path="/tutorexamconfig"
          element={
            <RequireAuth>
              <Tutorexamconfig />
            </RequireAuth>
          }
        />
        <Route
          path="/questiontype"
          element={
            <RequireAuth>
              <Questiontype />
            </RequireAuth>
          }
        />
        <Route
          path="/questions"
          element={
            <RequireAuth>
              <Questions />
            </RequireAuth>
          }
        />
        <Route
          path="/issuequestion"
          element={
            <RequireAuth>
              <IssueQuestion />
            </RequireAuth>
          }
        />
        <Route
          path="/issueinfo/:id"
          element={
            <RequireAuth>
              <IssueInfo />
            </RequireAuth>
          }
        />
        <Route path="/tutorque" element={<Tutorque />} />
        <Route path="/adminque" element={<Adminque />} />
        <Route path="/reanswerque" element={<Reanswerque />} />
        <Route path="/unsolvedque" element={<Unsolvedque />} />

        <Route
          path="/studentclass"
          element={
            <RequireAuth>
              <StudentClass />
            </RequireAuth>
          }
        />

        <Route
          path="/mcqquestion"
          element={
            <RequireAuth>
              <Mcqquestion />
            </RequireAuth>
          }
        />
        <Route
          path="/truefalse"
          element={
            <RequireAuth>
              <Truefalseque />
            </RequireAuth>
          }
        />
        <Route
          path="/fillups"
          element={
            <RequireAuth>
              <Fillups />
            </RequireAuth>
          }
        />

        <Route
          path="/matchfollow"
          element={
            <RequireAuth>
              <Matchfollow />
            </RequireAuth>
          }
        />

        <Route
          path="/users"
          element={
            <RequireAuth>
              <Users />
            </RequireAuth>
          }
        />
        <Route
          path="/roles"
          element={
            <RequireAuth>
              <Roles />
            </RequireAuth>
          }
        />
        <Route
          path="/addnewuser"
          element={
            <RequireAuth>
              <Addnewuser />
            </RequireAuth>
          }
        />
        <Route
          path="/addnewuser/:id"
          element={
            <RequireAuth>
              <Addnewuser />
            </RequireAuth>
          }
        />
        <Route
          path="/addnewrole"
          element={
            <RequireAuth>
              <Addnewrole />
            </RequireAuth>
          }
        />

        <Route
          path="/fillupssearchengine"
          element={
            <RequireAuth>
              <FillupsSearchengine />
            </RequireAuth>
          }
        />
        <Route
          path="/matchfollowsearchengine"
          element={
            <RequireAuth>
              <MatchfollowSearchengine />
            </RequireAuth>
          }
        />
        <Route
          path="/mcqquestionsearchengine"
          element={
            <RequireAuth>
              <McqquestionSearchengine />
            </RequireAuth>
          }
        />
        <Route
          path="/questionanswersearchengine"
          element={
            <RequireAuth>
              <QuestionanswerSearchengine />
            </RequireAuth>
          }
        />
        <Route
          path="/truefalsequesearchengine"
          element={
            <RequireAuth>
              <TruefalsequeSearchengine />
            </RequireAuth>
          }
        />
        <Route
          path="/studentpostingstreak"
          element={
            <RequireAuth>
              <Studentpostingstreak />
            </RequireAuth>
          }
        />
        <Route
          path="/tutorpostingstreak"
          element={
            <RequireAuth>
              <Tutorpostingstreak />
            </RequireAuth>
          }
        />
        <Route
          path="/studentreferral"
          element={
            <RequireAuth>
              <Studentreferral />
            </RequireAuth>
          }
        />
        <Route
          path="/tutorreferral"
          element={
            <RequireAuth>
              <Tutorreferral />
            </RequireAuth>
          }
        />

        <Route path="/contactus" element={<Contactus />} />
        <Route path="/forgotpassword" element={<ForgotpassWord />} />
        <Route
          path="/logout"
          element={
            <RequireAuth>
              <Logout />
            </RequireAuth>
          }
        />
        <Route path="/addmobile" element={<AddMobile />} />
        <Route path="/contactdetails" element={<Contactdetails />} />
      </Routes>
      <Scroll />
    </BrowserRouter>
  );
}
export default App;
