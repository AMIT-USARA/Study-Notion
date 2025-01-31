import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import Navbar from "./component/comman/Navbar"
import OpenRoute from "./component/core/Auth/OpenRoute"
import DashBoard from "./pages/DashBoard"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/AboutUs";
import ContectUs from "./pages/ContectUs"
import MyProfile from "./component/core/DashBoard/MyProfile";
import ProtectedRoute from "./component/core/Auth/ProtectedRoute";
import Error from "./pages/Error";
import Setting from "./component/core/DashBoard/Settings";
import EnrolledCourses from "./component/core/DashBoard/EnrolledCourses";
import Wishlist from "./component/core/DashBoard/Wishlist";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        <Route
          path="about"
          element={
            <OpenRoute>
              <About />
            </OpenRoute>
          }
        />
        <Route
          path="contact"
          element={
            <ContectUs />
          }
        />

        <Route
          element={
            <ProtectedRoute>
              <DashBoard />
              
            </ProtectedRoute>
          }
          
        >
          <Route
                path="dashboard/my-profile"
                element={
                  <ProtectedRoute>
                    <MyProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="dashboard/wishlist"
                element={
                  <ProtectedRoute>
                    <Wishlist />
                  </ProtectedRoute>
                }
              />
          <Route

                path="dashboard/settings"
                element={
                  <ProtectedRoute>
                    <Setting />
                  </ProtectedRoute>
                }

              />
              <Route
                path="dashboard/enrolled-courses"
                element={
                  <ProtectedRoute>
                    < EnrolledCourses/>
                  </ProtectedRoute>
                }
              />
        </Route>




        <Route path="*" element={<Error />}></Route>

      </Routes>

    </div >
  );
}

export default App;
