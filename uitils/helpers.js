export function alertMsg(title, msg, callback) {
  return Alert.alert(title, msg, [{ text: "OK", onPress: () => callback() }])
}