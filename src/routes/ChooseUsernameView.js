import AuthProvider from "../components/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { existsUsername, updateUser } from "../firebase/firebase";

export default function ChooseUsernameView() {
  const navigate = useNavigate();
  const [state, setState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [username, setUsername] = useState("");

  function handleUserLoggedIn(user) {
    navigate("/dashboard");
  }
  function handleUserNotRegistered(user) {
    setCurrentUser(user);
    setState(3);
    //navigate("/choose-username");
  }
  function handleUserNotLoggedIn(user) {
    navigate("/login");
  }
  function handleInputUsername(e) {
    setUsername(e.target.value);
  }
  async function handleContinue() {
    if (username != "") {
      const exists = await existsUsername(username);

      if (exists) {
        setState(5);
      } else {
        const tmp = { ...currentUser };
        tmp.username = username;
        tmp.processCompleted = true;
        await updateUser(tmp);
        setState(6);
      }
    }
  }

  if (state === 3 || state === 5) {
    return (
      <div>
        <h1>Bienvenido {currentUser.displayName}</h1>
        <p>Par terminar el proceso, elige un nombre de usuario</p>
        {state === 3 ? <p>El nombre de usuario ya existe, escoge otro</p> : ""}
        <div>
          <input type="text" onChange={handleInputUsername} />
        </div>
        <div>
          <button onClick={handleContinue}>Continuar</button>
        </div>
      </div>
    );
  }
  if (state === 6) {
    return (
      <div>
        <h1>Ya puedes ir al dashboard a crear tus links</h1>
        <Link to="/dashboard"> Continuar </Link>
      </div>
    );
  }
  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotLoggedIn={handleUserNotLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
    >
      <div>loading...</div>
    </AuthProvider>
  );
}
