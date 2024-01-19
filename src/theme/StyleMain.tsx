import {StyleSheet} from 'react-native';
const StyleMain = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  stretch: {
    width: '100%',
  },
  image: {
    marginBottom: 40,
  },
  input: {
    borderRadius: 5,
    width: '100%',
    height: 48,
    marginBottom: 12,
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
  },
  multilineInput: {
    borderRadius: 5,
    width: '100%',
    height: 90,
    marginBottom: 12,
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
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
    backgroundColor: '#ffffff',
  },

  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    borderRadius: 8,
    paddingTop: 8,
    paddingBottom: 8,
    color: '#ffffff',
    backgroundColor: '#816CEC',
    display: 'flex',
  },
  buttonFullwidthStyle: {
    width: '100%',
    borderRadius: 8,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20,
    paddingRight: 20,
    color: '#ffffff',
    backgroundColor: '#816CEC',
    justifyContent: 'center',
  },
  buttonFullwidthOutlined: {
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: '#816CEC',
    backgroundColor: 'white',
  },
  bottomSheetHeader: {
    backgroundColor: '#ffffff',
    paddingTop: 12,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonTitleStyle: {
    width: '100%',
  },
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
  footerLeftColumn: {
    flex: 1,
  },
  footerRightColumn: {
    flex: 1,
    textAlign: 'right',
    alignItems: 'flex-end',
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
  DialogHeader: {
    backgroundColor: '#ffffff',
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  DialogTitle: {
    fontSize: 24,
    color: '#4F4A45',
    fontWeight: '700',
  },
  DialogSubmitButtonContainer: {
    width: '100%',
    borderRadius: 8,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: '#816CEC',
    marginBottom: 20,
  },
  DialogSubmitButton: {
    width: '100%',
    backgroundColor: '#816CEC',
  },
  phoneInputPrefixLabel: {
    fontSize: 14,
    color: '#000000',
    alignSelf: 'flex-start',
    marginTop: 3,
  },
  InputSeparate: {
    width: 2,
    height: 28,
    backgroundColor: '#CDCDCD',
    marginLeft: 8,
  },
});
export default StyleMain;
