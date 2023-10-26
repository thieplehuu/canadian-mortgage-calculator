import { StyleSheet } from 'react-native';
const Base = StyleSheet.create({
  outlinedInputContainer: {
    marginTop: 24,
    height: 64,
    position: 'relative',
    width: "100%"
  },
  outlinedLabelContainer: {
    position: 'absolute',
    backgroundColor: '#FFF',
    top: -14,
    left: 12,
    padding: 5,
    zIndex: 50,
  },
  outlinedTextInput: {
    flex: 1,
    borderWidth: 1,
    justifyContent: 'flex-end',
    height: 44,
    borderRadius: 6,
    borderColor: "#cdcdcd",
    paddingHorizontal: 12,
    backgroundColor: "#ffffff"
  },
  sliderRail: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#EDEBF5',
  },
  sliderRailSelected: {
    height: 4,
    backgroundColor: '#816CEC',
    borderRadius: 2,
  },
  sliderLabel: {
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#4499ff',
    borderRadius: 4,
  },
  sliderNotch: {
    width: 8,
    height: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#4499ff',
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8,
  },
  sliderLabelContainer: {
    width: "100%",
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sliderThumbContainer: {
    width: 18,
    height: 18,
    borderRadius: 18,
    backgroundColor: "#ffffff",
    justifyContent: "center", borderWidth: 1,
    borderColor: "#cdcdcd"
  },
  sliderThumb: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: "#816CEC",
    alignSelf: "center"
  }
});
export default Base;
