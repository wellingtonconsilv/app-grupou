import React, { createContext, useState, useEffect } from "react";

import firebase from "firebase";
import "firebase/auth";
import { Alert } from "react-native";

const UsuarioContext = createContext({});

const UsuarioProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const ListenAuth = (userState) => {
    setUser(userState);
  };

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged(ListenAuth);
    return listener;
  }, []);

  const signIn = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((resp) => {
        // console.warn(resp)
        console.log(resp);
      })
      .catch((err) => {
        console.warn(err);
        Alert.alert("erro", "falha ao logar usuario");
      });
  };

  const signUp = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((resp) => {
        console.warn(resp);
      })
      .catch((err) => {
        console.warn(err);
        Alert.alert("erro", "falha ao criar usuario");
      });
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then((resp) => {
        console.warn("Usuario Deslogado com sucesso!");
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const recoverPassword = (email) => {
      firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert(
          "Email enviado",
          "O Email com as informações para troca de senha foi enviado"
        );
      })
      .catch(e => {        
      Alert.alert(
        "Não foi possível recuperar o email",
        "Por favor, verifique o email ou tente mais tarde"
        );
      });
  };

  return (
    <UsuarioContext.Provider
      value={{ user, signIn, signOut, signUp, recoverPassword }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};

export { UsuarioContext, UsuarioProvider };
