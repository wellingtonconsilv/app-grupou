import styled from "styled-components/native";

export const Container = styled.View`
  background-color: #ab1b71;
  flex: 1;
  flex-grow: 1;
`;

export const GroupContainer = styled.View`
  background-color: #fff;
  padding: 20px 10px 20px 10px;
  border-radius: 4px;
`;

export const Separator = styled.View`
  height: 2px;
  width: 100%;
  background-color: #000;
`;

export const AddGroup = styled.View`
  background-color: #fff;
  width: 90%;
  align-self: center;
  margin-top: 16px;
  padding: 10px 10px 10px 10px;
  border-radius: 4px;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  padding: 10px 10px 10px 0px;
`;

export const Button = styled.TouchableOpacity`
  background-color: #ae1b73;
  width: 20%;
  height: 30px;
  align-items: center;
  border-radius: 4px;
  margin-left: auto;
  justify-content: center;
`;
