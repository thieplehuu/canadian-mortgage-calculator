import { StyleSheet } from 'react-native';
const StyleLogin = StyleSheet.create({
  container: {
    padding: 10,
    alignSelf: 'stretch',
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    marginBottom: 100,
    width: "60%"
  },
  input: {
    borderRadius: 5,
    width: "100%",
    height: 48,
    marginBottom: 12,
    backgroundColor: "#f2f2f2",
  },
  TextInput: {
    marginLeft: 12,
    color: "#ffffff",
  },
  buttonContainer: {
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  buttonStyle: {
    width: "100%",
    padding: 12,
    color: "#ffffff",
    backgroundColor: "#816CEC",
  },
});
export default StyleLogin;
