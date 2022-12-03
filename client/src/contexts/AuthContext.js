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

  const createUser = (user) => {
    return fetch(`${api.defaults.baseURL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        return res;
      });
  };

  const getUserByUid = (uid) => {
    return fetch(`${api.defaults.baseURL}/userByUid/${uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      async: false,
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        return res;
      });
  };

  const updateUserPassword = (updateUser) => {
    return fetch(`${api.defaults.baseURL}/updateUserPassword/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateUser),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        return res;
      });
  };

  const updateUser = async (valuse) => {
    const update_user = await updateUserPassword(valuse);
    console.log(update_user);
  };

  const createNewUser = async (valuse) => {
    const user = await createUser(valuse);
    console.log(user);
  };
  // const handleSubmit = async (valuse) => {

  //     console.log(props.products + ":::::props.products");
  //     const product = await props.createProduct(valuse)
  //     console.log(product);
  // };

  function signup(email, password, firstName, lastName, phoneNumber) {
    // auth.signOut()
    let result = auth
      .createUserWithEmailAndPassword(email, password)
      .then((v) => {
        createNewUser({
          // uid: v.user.multiFactor.uid,
          uid: v.user.uid,
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          phone: phoneNumber,
        });
      });
    return result;
  }

  function login(email, password) {
    let result = auth.signInWithEmailAndPassword(email, password).then((v) => {
      setCurrentUser(v.user);
      getUserByUid(v.user.uid).then((item) => {
        setUserDetails(item.myuser);
      });
    });
    return result;
  }

  function logout() {
    console.log("userLogin:" + currentUser.email);
    setUserDetails([]);
    return auth.signOut();
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
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);

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

// const mapStateToProps = (state) => {
//   return {

//     currentUser_: state.userReducer.currentUser_

//   };
// }
// const mapDispatchToProps = (dispatch) => ({

//   setUser: (user) => dispatch(actions.setUser(user))

// })
// export default connect(mapStateToProps, mapDispatchToProps)(AuthProvider)
