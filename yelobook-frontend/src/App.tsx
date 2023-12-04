import { Route, Routes } from "react-router-dom";
import axios from "axios";
import AuthLayout from "./_auth/AuthLayout";
import SignUpForm from "./_auth/form/SignUpForm";
import SignInForm from "./_auth/form/SignInForm";
import RootLayout from "./_root/RootLayout";
import { Home } from "./_root/pages";

axios.defaults.baseURL = "http://localhost:3001/api";

const App = () => {
  return (
    <div className="flex h-screen">
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/signin" element={<SignInForm />} />
        </Route>
        {/* Private Routes */}
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
