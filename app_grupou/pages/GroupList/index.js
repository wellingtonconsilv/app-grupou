import React, { useEffect, useState, useCallback, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import GrupoSchema from "../../models/GrupoSchema";
import {
  GroupContainer,
  Container,
  Separator,
  AddGroup,
  InputContainer,
  Button,
} from "./styles";

import firebase from "firebase";
import { useFocusEffect } from "@react-navigation/native";
import { UsuarioContext } from "../../contexts/user";

export default function GroupList({ navigation, route }) {
  const [groupList, setGroupList] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useContext(UsuarioContext);

  useFocusEffect(
    useCallback(() => {
      const listener = firebase
        .firestore()
        .collection("Grupos")
        .where("Users", "array-contains", user.email)
        .onSnapshot(ListenUpdateGroups);

      return () => listener();
    }, [])
  );

  const ListenUpdateGroups = (data) => {
    const values = data.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setGroupList(values);
  };

  const handleAddGroupName = async () => {
    if (groupName === "") {
      console.error("grupo sem nome");
      return;
    }

    const grupoToBeAdd = new GrupoSchema(groupName, user.email);

    try {
      setLoading(true);
      firebase.firestore().collection("Grupos").add({
        NomeGrupo: grupoToBeAdd.NomeGrupo,
        Ativo: grupoToBeAdd.Ativo,
        Mensagens: grupoToBeAdd.Mensagens,
        Users: grupoToBeAdd.Users,
      });
      setGroupName("");
    } catch (ex) {
      console.warn(ex);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToGroup = (name, id) => {
    navigation.navigate("Chat", { id: id, NomeGrupo: name });
  };

  return (
    <Container>
      {loading ? (
        <Text>Atualizando lista...</Text>
      ) : (
        <>
          <AddGroup>
            <Text>Insira um novo Grupo</Text>
            <InputContainer>
              <TextInput
                value={groupName}
                style={{ width: "79%" }}
                placeholder="Nome do Grupo"
                onChangeText={(e) => setGroupName(e)}
              />
              <Button onPress={handleAddGroupName}>
                <Text style={{ color: "#fff" }}>Ok</Text>
              </Button>
            </InputContainer>
          </AddGroup>
          <View
            style={{
              flex: 1,
              marginTop: 16,
              width: "90%",
              alignSelf: "center",
            }}
          >
            <FlatList
              ItemSeparatorComponent={() => <Separator />}
              renderItem={({ item }) => (
                <ItemList
                  item={item}
                  handlePress={(name, id) => handleNavigateToGroup(name, id)}
                />
              )}
              data={groupList}
              keyExtractor={(item) => item.id}
            />
          </View>
        </>
      )}
    </Container>
  );
}

const ItemList = (prop) => {
  const {
    item: { NomeGrupo, id },
    handlePress,
  } = prop;

  const handleNavigation = () => {
    handlePress(NomeGrupo, id);
  };

  return (
    <TouchableOpacity onPress={handleNavigation}>
      <GroupContainer>
        <Text>{NomeGrupo}</Text>
      </GroupContainer>
    </TouchableOpacity>
  );
};
