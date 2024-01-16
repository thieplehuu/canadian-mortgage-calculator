import React, {FC, useState} from 'react';
import AppStyle from '../theme';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import DropShadow from 'react-native-drop-shadow';
import {ApplyForm} from './ApplyForm';
import {BottomSheet, Text} from '@rneui/themed';

interface DialogProps {
  visible: boolean;
  data: any;
  onConfirm: (message: string) => void;
  onClose: () => void;
  onError: (error: any) => void;
}

const ApplyDialog: FC<DialogProps> = ({
  visible,
  data,
  onConfirm,
  onClose,
  onError,
  ...props
}) => {
  return (
    <BottomSheet
      isVisible={visible}
      backdropStyle={{backgroundColor: 'transparent'}}
      containerStyle={{backgroundColor: 'transparent'}}>
      <DropShadow
        style={{
          width: '100%',
          top: 2,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 5,
          shadowRadius: 5,
        }}>
        <View
          style={[
            AppStyle.StyleMain.bottomSheetHeader,
            {borderTopLeftRadius: 8, borderTopRightRadius: 8},
          ]}>
          <Text style={AppStyle.StyleMain.DialogTitle}>{'Get in Touch'}</Text>
          <Icon
            name={'close'}
            size={24}
            color={'#4F4A45'}
            onPress={() => onClose()}
          />
        </View>
        <ApplyForm
          title={''}
          data={data}
          onConfirm={(message: string) => {
            onConfirm(message);
          }}
          onError={(error: any) => {
            onError(error);
          }}
        />
      </DropShadow>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  userSection: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userInfo: {
    flex: 1,
  },
  avatar: {
    width: 70,
    height: 70,
    marginRight: 12,
    borderRadius: 35,
    overflow: 'hidden',
  },
  addressSection: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
});

export {ApplyDialog};
