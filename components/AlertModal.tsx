import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Modal, Text, TouchableOpacity, View, ViewProps } from 'react-native';
import { ThemedText } from './ThemedText';

interface Props extends ViewProps{
    visibleExterno: boolean
    width?: number,
    height?: number,

    onAccept?: () => void
    onCancel?: () => void
}

const AlertModal = ( {children, visibleExterno, height = 180, width = 540, onCancel, onAccept}:Props ) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visibleExterno) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [visibleExterno, fadeAnim]);
  
    return (
    <Modal visible={visibleExterno} transparent animationType="none">
        <Animated.View
            style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            opacity: fadeAnim,
            }}
        >
            <View
            style={{
                width: width,
                height: height,
                backgroundColor: '#f7f7f7',
                borderRadius: 12,
                padding: 20,
                elevation: 5,
                
            }}
            >
              <View className='justify-center'>
                <ThemedText>Esta acción marcará la dosis como administrada. ¿Deseás continuar?</ThemedText>
                <View className='flex-row justify-between pt-6'>
                  <TouchableOpacity onPress={onCancel} className='rounded-md bg-red-500 items-center ml-8 px-8'><Text className='text-lg color-white p-3 font-semibold'>Cancelar</Text></TouchableOpacity>
                  <TouchableOpacity onPress={onAccept} className='rounded-md bg-[#2b27a8] items-center mr-8 px-8'><Text className='text-lg color-white p-3 font-semibold'>Aceptar</Text></TouchableOpacity>
                </View>
        
              </View>
            {children}
            {/* <Button title="Cerrar" onPress={onClose} /> */}
            </View>
        </Animated.View>
    </Modal>

  )
}

export default AlertModal