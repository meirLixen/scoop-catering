import React, { useContext, useEffect, useState } from "react";
import api from "../api";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }, props) {
  const [currentUser, setCurrentUser] = useState();
  const [userDetails, setUserDetails] = useLocalStorage("userDetails", []);
  const [loading, setLoading] = useState(true);

  function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = window.localStorage.getItem(key);

        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error(error);
        return initialValue;
      }
    });

    const setValue = (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);

        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(error);
      }
    };
    return [storedValue, setValue];
  }

  const createUser = async (user) => {
    const authorizationHeader = authHeaderBuilder(user.idToken);

    const response = await api(`${api.defaults.baseURL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authorizationHeader,
      },
      data: user,
    });

    const resUser = response.data?.user;
    if (!resUser) {
      alert("error");
    }
  };

  const authHeaderBuilder = (token) => {
    return { Authorization: `Bearer ${token}` };
  };

  const setAuthCookieByServer = async (FBUser) => {
    const user = FBUser?.user?.uid ? FBUser.user : FBUser;
    const uid = user.uid;
    const idToken = await user.getIdToken(uid);

    const authorizationHeader = authHeaderBuilder(idToken);

    const isOk = await api(`${api.defaults.baseURL}auth/setAuthCookie`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authorizationHeader,
      },
    });

    return isOk;
  };

  const getUserByUid = async (uid) => {
    const response = await api(`${api.defaults.baseURL}/userByUid/${uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      async: false,
    });
    return response.data;
  };

  const updateUserPassword = async (updateUser) => {
    const response = await api(`${api.defaults.baseURL}/updateUserPassword/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      data: updateUser,
    });

    return response.data;
  };

  const updateUser = async (values) => {
    const update_user = await updateUserPassword(values);
    console.log(update_user);
  };

  async function signup(email, password, firstName, lastName, phoneNumber) {
    const result = await auth.createUserWithEmailAndPassword(email, password);

    const idToken = await result.user.getIdToken();

    createUser({
      idToken,
      uid: result.user.uid,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      phone: phoneNumber,
    });

    return result;
  }

  async function login(email, password) {
    let FBUser = await auth.signInWithEmailAndPassword(email, password);
    const SVUser = await getUserByUid(FBUser.user?._delegate?.uid);
    await setAuthCookieByServer(FBUser);

    setCurrentUser(FBUser.user);
    setUserDetails(SVUser.myuser);

    return FBUser;
  }

  async function logout() {
    let user;

    setUserDetails([]);
    await auth.signOut();

    try {
      let userDetails = window.localStorage.getItem("userDetails");
      userDetails = JSON.parse(userDetails);
      const userUid = userDetails.uid;
      user = await getUserByUid(userUid);
    } catch (error) {
      console.error(error);
    }

    console.log(user);

    return window.location.replace("/");
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    updateUser({ email: currentUser.email, password: password });
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((res) => {
      const user = res?.multiFactor?.user;
      if (user) {
        setAuthCookieByServer(user);
        setCurrentUser(user);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, [props]);

  const value = {
    userDetails,
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
