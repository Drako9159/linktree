import DashboardWrapper from "../components/DashboardWrapper";
import AuthProvider from "../components/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function EditProfileView() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(0);
  const [state, setState] = useState(0);

  async function handleUserLoggedIn(user) {
    setCurrentUser(user);
    setState(2);
    const resLinks = await getLinks(user.uid);
    setLinks([...resLinks]);
  }
  function handleUserNotRegistered(user) {
    navigate("/login");
  }
  function handleUserNotLoggedIn(user) {
    navigate("/login");
  }
  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotLoggedIn={handleUserNotLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
    >
      <DashboardWrapper>
        <div>Edit Profile View</div>
      </DashboardWrapper>
    </AuthProvider>
  );
}
