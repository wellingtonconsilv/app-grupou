import React, {
  useState,
  useContext,
  useEffect,
  UseLayoutEffect,
  useLayoutEffect,
} from "react";
import { Text, FlatList, Alert, View } from "react-native";

import { UsuarioContext } from "../../contexts/user";

import {
  Container,
  Texto,
  ContainerButtons,
  Button,
  ButtonText,
  Input,
  ContainerMessages,
  Message,
} from "./styles";

import firebase from "firebase";
import "firebase/firestore";

const Chat = ({ route, navigation }) => {
  const { user } = useContext(UsuarioContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({
    Usuario: user.email,
    Mensagem: "",
  });

  useLayoutEffect(() => {
    navigation.setOptions({ title: route.params.NomeGrupo });
  }, []);

  const ListenUpdateMessages = (snap) => {
    const data = snap.data();

    setMessages(data.Mensagens);
  };

  useEffect(() => {
    if (route.params.NomeGrupo) {
      const listener = firebase
        .firestore()
        .collection("Grupos")
        .doc(route.params.id)
        .onSnapshot(ListenUpdateMessages);

      return () => listener();
    }
  }, []);

  const handleChangeMessage = (text) => {
    setNewMessage({ Usuario: user.email, Mensagem: text });
  };

  const handleAddMessages = () => {
    if (newMessage.Mensagem == "") {
      Alert.alert("erro", "Preencha o campo");
      return;
    }

    try {
      firebase
        .firestore()
        .collection("Grupos")
        .doc(route.params.id)
        .update({
          Mensagens: firebase.firestore.FieldValue.arrayUnion(newMessage),
        });
      setNewMessage("");
    } catch (err) {
      console.log(err);
      console.warn("erro de comunicação, tente mais tarde");
    }
  };

  return (
    <Container>
      <ContainerMessages>
        <View style={{ flex: 1 }}>
          <FlatList
            data={messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Message>
                {item.Usuario} : {item.Mensagem}
              </Message>
            )}
          />
        </View>
      </ContainerMessages>

      <Texto>{user.email}</Texto>
      <ContainerButtons>
        <Input
          placeholder="Digite sua mensagem"
          onChangeText={(text) => handleChangeMessage(text)}
          value={newMessage}
        />

        <Button
          invert={true}
          onPress={() => {
            handleAddMessages();
          }}
        >
          <ButtonText invert={true}>Enviar</ButtonText>
        </Button>
      </ContainerButtons>
    </Container>
  );
};

export default Chat;
