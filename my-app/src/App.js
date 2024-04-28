import './App.css';
import { Routes, Route } from 'react-router-dom'
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Welcome from './Components/Welcome';
import Forget from './Components/Forget';
import CreateJob from './Components/CreateJob';
import MyProfile from './Components/MyProfile';
import DetailPage from './Components/DetailPage';
import JobEdit from './Components/JobEdit';
import ApplyForm from './Components/ApplyForm';
import AdminDashbord from './Components/admin/AdminDashbord';
import AdminLogin from './Components/AdminLogin';

function App() {
  return (<>
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<SignUp />}></Route>
      <Route path="/forget" element={<Forget />}></Route>
      <Route path="/" element={<Welcome />}></Route>
      <Route path="/createjob" element={<CreateJob />}></Route>
      <Route path="/userProfile" element={<MyProfile />}></Route>
      <Route path="/deatilPage/:id" element={<DetailPage />}></Route>
      <Route path="/jobEdit/:id" element={<JobEdit />}></Route>
      <Route path="/applyForm/:id" element={<ApplyForm />}></Route>
      <Route path="/heelo" element={<AdminDashbord />}></Route>
      <Route path="/adminLogin" element={<AdminLogin />}></Route>
    </Routes>
  </>
  );
}

export default App;
