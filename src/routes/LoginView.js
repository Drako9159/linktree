import { auth, userExist } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthProvider from "../components/AuthProvider";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";

export default function LoginView() {
  const navigate = useNavigate();
  /*
  const [currentUser, setCurrentUser] = useState(null);
  */
  /**
   * State
   * 0: inicializando
   * 1: loading
   * 2: login comlpeto
   * 3: login sin registro
   * 4: Nadie logueado
   * 5: Ya existe el usuario
   * 6: Nuevo username // click en continuar
   */
  const [state, setCurrentState] = useState(0);
  /*
  useEffect(() => {
    setCurrentState(1);
    onAuthStateChanged(auth, async (user) => {
      //TODO : Verificar si el usuario existe en la base de datos
      if (user) {
        const isRegistered = await userExist(user.uid);
        if (isRegistered) {
          navigate("/dashboard");
          setCurrentState(2);
          //TODO redireccionar a dashboard
        } else {
          navigate("/choose-username");
          setCurrentState(3);
          //TODO redireccionar a choose-username
        }
        setCurrentState(3);
      } else {
        setCurrentState(4);
        console.log("No user signed in");
      }
    });
  }, [navigate]);
*/
  async function handleOnclick() {
    const googleProvider = new GoogleAuthProvider();
    await signInWithGoogle(googleProvider);
    async function signInWithGoogle(googleProvider) {
      try {
        const res = await signInWithPopup(auth, googleProvider);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    }
  }
  function handleUserLoggedIn(user) {
    navigate("/dashboard");
  }
  function handleUserNotRegistered(user) {
    navigate("/choose-username");
  }
  function handleUserNotLoggedIn(user) {
    setCurrentState(4);
  }

  if (state === 2) {
    return <div>Logueado</div>;
  }

  if (state === 3) {
    return <div>Estás autenticado, pero no registrado...</div>;
  }
  if (state === 4) {
    return (
      <div>
        <button onClick={handleOnclick}>Login with google</button>
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
