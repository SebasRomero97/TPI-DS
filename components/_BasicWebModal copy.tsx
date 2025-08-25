import React, { useEffect, useRef } from 'react';
import { Animated, Button, Easing, Modal, Text, View, ViewProps } from 'react-native';

interface Props extends ViewProps{
    visibleExterno: boolean

    onClose: () => void
}

const BasicWebModal = ( {children, visibleExterno, onClose}:Props ) => {
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
                width: '60%',
                backgroundColor: 'white',
                borderRadius: 12,
                padding: 20,
                elevation: 5,
            }}
            >
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>
                Detalle del medicamento
            </Text>

            {children}
            <Button title="Cerrar" onPress={onClose} />
            </View>
        </Animated.View>
    </Modal>

  )
}

export default BasicWebModal