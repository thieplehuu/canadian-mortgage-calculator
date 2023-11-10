import React from 'react';
import { View, Modal, StyleSheet, Text, ActivityIndicator, StyleProp, ViewStyle } from 'react-native';

interface Props {
    /**
     * Toggles the visibilty of modal 
     * @param bool modalVisible
    */
    modalVisible: boolean;

    /**
     * Color of Activity Indicator (loading circle)
     * @param string color
    */
    color: string;

    /**
     * Dark mode of the loading modal, default is false
     * @param boolean darkMode
    */
    darkMode: boolean;

    /**
      * Style of the loading modal container
      * @param string fontFamily
     */
    modalStyle: StyleProp<ViewStyle>;

}

export default function LoadingModal(props: Props) {



    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.modalVisible}
            statusBarTranslucent={true}>

            <View style={styles.centeredView}>
                <View style={[styles.modalView, props.darkMode && { backgroundColor: '#121212' }, props.modalStyle]}>
                    <ActivityIndicator size="large" color={props.color} style={{ alignSelf: "center", }} />
                </View>
            </View>
        </Modal>
    )
}

LoadingModal.defaultProps = {
    modalVisible: false,
    darkMode: false,

}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#0008'

    },
    modalView: {
        margin: 20,
        width: 200,
        height: 70,
        backgroundColor: "white",
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

    },

    modalText: {
        marginVertical: 15,
        textAlign: "center",
        fontSize: 17,
        marginLeft: 15,
    }
});