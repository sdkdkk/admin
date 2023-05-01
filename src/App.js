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
        <Route path="/studentdetails/:_id" element={<Studentdetails/>} />
        <Route path="/testexam" element={<Testexam/>} />
        <Route path="/examdetails" element={<Examdetails/>} />
      
      </Routes>
      <Scroll/>
    </BrowserRouter>
  );
}
export default App;
