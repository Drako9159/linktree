import { Routes, Route } from "react-router-dom";
import LoginView from "./routes/LoginView";
import DashboardView from "./routes/DashboardView";
import EditProfileView from "./routes/EditProfileView";
import PublicProfileView from "./routes/PublicProfileView";
import SignOutView from "./routes/SignOutView";
import ChooseUsernameView from "./routes/ChooseUsernameView";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginView />}></Route>
      <Route path="/dashboard" element={<DashboardView />}></Route>
      <Route path="/dashboard/profile" element={<EditProfileView />}></Route>
      <Route path="/signout" element={<SignOutView />}></Route>
      <Route path="/u/:username" element={<PublicProfileView />}></Route>
      <Route path="/choose-username" element={<ChooseUsernameView />}></Route>
    </Routes>
  );
}

export default App;
