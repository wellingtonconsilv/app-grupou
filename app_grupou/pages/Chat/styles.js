import styled from "styled-components/native";

export const Container = styled.View`
  background-color: #ab1b71;
  flex: 1;
`;

export const Texto = styled.Text`
  color: #fff;
  font-size: 20px;
  text-align: center;
`;

export const ContainerMessages = styled.View`
  width: 100%;
  flex: 1;
  flex-grow: 1;
  padding: 10px 10px 10px 10px;
`;

export const Message = styled.Text`
  color: #fff;
  font-size: 14px;
  text-align: justify;
  padding-top: 5px;
`;

export const ContainerButtons = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

export const Button = styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  height: 60px;
  background-color: ${(props) => (props.invert ? "#fff" : "#ae1b73")};
  border: 1px solid #ae1b73;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  margin-right: ${(props) => (props.invert ? "10px" : "0px")};
`;

export const ButtonText = styled.Text`
  color: ${(props) => (props.invert ? "#ae1b73" : "#fff")};
  font-size: 16px;
  font-weight: bold;
`;

export const Input = styled.TextInput`
  border: 1px solid #ccc;
  height: 60px;
  flex: 3;
  border-radius: 5px;
  padding: 0 20px;
  background-color: #e6e6e6;
  margin-right: 10px;
`;
