import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Tutorexam from './components/Tutorexam/Tutorexam';
import Signup from './components/Login/Signup';
import Tutordetails from './components/Tutors/Tutordetails';
import Studentdetails from './components/Student/Studentdetails';
import Testexam from './components/Tutorexam/Testexam';
import Examdetails from './components/Tutorexam/Examdetails';
import Searchenginequedetail from './components/Searchengine/Searchenginequedetail';
import Logout from './components/Logout/Logout';

import Questiontiming from './components/Question/Questiontiming';
import Questionpricing from './components/Question/Questionpricing';
import Questionreasnwer from './components/Question/Questionreasnwer';
import Curruncy from './components/Curruncy/Curruncy';
import Coupon from './components/Offers/Coupon';
import Tutorsubject from './components/Tutorsub/Tutorsubject';
import Tutorexamconfig from './components/Tutorconfig/Tutorexamconfig';
import Tutorsearch from './components/Tutorexam/Tutorsearch';
import Questiontype from './components/Question/Questiontype';
import Questions from './components/Question/Questions';
import Mcqquestion from './components/Questionpages/Mcqquestion';
import Truefalseque from './components/Questionpages/Truefalseque';
import Fillups from './components/Questionpages/Fillups';
import Questionanswer from './components/Questionpages/Questionanswer';
import Matchfollow from './components/Questionpages/Matchfollow';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="navbar" element={<Navbar />} />
        <Route path="tutorlist" element={<Tutorlist />} />
        <Route path="tutorspayment" element={<Tutorspayment />} />
        <Route path="studentlist" element={<Studentlist />} />
        <Route path="studentpayment" element={<Studentpayment />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="Searchengine" element={<Searchengine />} />
        <Route path="addnew" element={<Addnew />} />
        <Route path="searchquestion" element={<Searchquestion />} />
        <Route path="testimonial" element={<Testimonial />} />
        <Route path="professionaldetails/:_id" element={<Professionaldetails/>} />
        <Route path="pages" element={<Pages/>} />
        <Route path="socialmediasetting" element={<Socialmediasetting/>} />
        <Route path="login" element={<Login/>} />
        <Route path="signup" element={<Signup/>} />
        <Route path="signup" element={<Signup/>} />
        <Route path="/tutordetails/:_id" element={<Tutordetails/>} />

        <Route path="/tutorexam" element={<Tutorexam/>} />
        <Route path="/tutorsearch" element={<Tutorsearch/>} />

        <Route path="/studentdetails/:_id" element={<Studentdetails/>} />
        <Route path="/testexam" element={<Testexam/>} />
        <Route path="/examdetails" element={<Examdetails/>} />
        <Route path="/searchenginequedetail" element={<Searchenginequedetail/>} />


        <Route path="/questiontiming" element={<Questiontiming />} />
        <Route path="/questionpricing" element={<Questionpricing />} />
        <Route path="/questionreanswer" element={<Questionreasnwer />} />
        <Route path="/curruncy" element={<Curruncy />} />
        <Route path="/coupon" element={<Coupon />} />
        <Route path="/tutorsubject" element={<Tutorsubject />} />
        <Route path="/tutorexamconfig" element={<Tutorexamconfig />} />
        <Route path="/questiontype" element={<Questiontype />} />
        <Route path="/questions" element={<Questions />} />

        <Route path="/mcqquestion" element={<Mcqquestion />} />
        <Route path="/truefalse" element={<Truefalseque />} />
        <Route path="/fillups" element={<Fillups />} />
        <Route path="/questionanswer" element={<Questionanswer />} />
        <Route path="/matchfollow" element={<Matchfollow />} />

        <Route path="/logout" element={<Logout />} />

      </Routes>
      <Scroll/>
    </BrowserRouter>
  );
}
export default App;
