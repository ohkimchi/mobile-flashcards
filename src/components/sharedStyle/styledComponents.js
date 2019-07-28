import { StyleSheet } from "react-native"
import styled from "styled-components"

export const ViewContainer = styled.View`
  height: 100px;
  background-color: #81d8d0;
  margin: 10px;
`

export const ViewFlatList = styled.View`
  height: 70%;
`

export const TextContainer = styled.Text`
  font-size: 20px;
  margin: 10px;
  text-align: center;
  align-items: center;
`

export const specialStyles = StyleSheet.create({
  button: {
    backgroundColor: "#e6ceac",
    alignItems: "center",
    textAlign: "center",
    margin: 10,
  },
})

export const TextInputArea = styled.TextInput`
  font-size: 18px;
  background-color: #ecad9e;
  margin: 10px;
  height: 200px;
`

export const SwitchContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 30px;
`
