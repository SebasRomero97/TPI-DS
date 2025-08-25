import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Modal, View, ViewProps } from 'react-native';
import { IconButton } from 'react-native-paper';

interface Props extends ViewProps{
    visibleExterno: boolean

    onClose: () => void
}

const BasicWebModalHistory = ( {children, visibleExterno, onClose}:Props ) => {
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
                width: 700,
                height: '70%',
                backgroundColor: '#f7f7f7',
                borderRadius: 12,
                padding: 20,
                elevation: 5,
                
            }}
            > 
              <View className='absolute top-0 right-0 z-10'>
                <IconButton  icon={'close'} onPress={onClose}/>
              </View>
            {children}
            {/* <Button title="Cerrar" onPress={onClose} /> */}
            </View>
        </Animated.View>
    </Modal>

  )
}

export default BasicWebModalHistory