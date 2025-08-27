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

const AvisoModal = ( {children, visibleExterno, height = 180, width = 540, onCancel, onAccept}:Props ) => {
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
              <View className='justify-center m-auto'>
                <ThemedText>La accion se realizo correctamente</ThemedText>
                <View className='justify-between pt-6 m-auto'>
                  <TouchableOpacity onPress={onAccept} className='rounded-md bg-[#27a877] items-center px-8'><Text className='text-lg color-white p-3 font-semibold'>OK</Text></TouchableOpacity>
                </View>
        
              </View>
            {children}
            {/* <Button title="Cerrar" onPress={onClose} /> */}
            </View>
        </Animated.View>
    </Modal>

  )
}

export default AvisoModal