import { StyleSheet } from 'react-native';
const StyleMain = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff"
  },
  stretch: {
    width: "100%"
  },
  image: {
    marginBottom: 40,
  },
  input: {
    borderRadius: 5,
    borderWidth: 1,
    width: "100%",
    height: 48,
    marginBottom: 12,
    alignItems: "center",
  },
  TextInput: {
    marginLeft: 12,
  },

  FormInput: {
    marginTop: 24,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  panelContainer: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '47%',
    textAlign: 'center',
  },
  panelContent: {
    padding: 16,
    borderRadius: 5,
  },

  sectionContainer: {
    marginTop: 12,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '98%',
    textAlign: 'center',
  },
  sectionContent: {
    borderRadius: 5,
  },
  bottomContainer: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    padding: 20,
    backgroundColor: "#ffffff"
  },

  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStyle: {
    borderRadius: 5,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    color: "#ffffff",
    backgroundColor: "#816CEC",
  },
  buttonFullwidthStyle: {
    width: "100%",
    borderRadius: 5,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 20,
    paddingRight: 20,
    color: "#ffffff",
    backgroundColor: "#816CEC",
  },
  bottomSheetHeader: {
    backgroundColor: "#ffffff",
    paddingTop: 12,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  footerLeftColumn: {
    flex: 1,
  },
  footerRightColumn: {
    flex: 1,
    textAlign: "right",
    alignItems: "flex-end"
  },
});
export default StyleMain;
