import React from 'react'
import { Image, View } from 'react-native'

const passOlvidada = () => {
  return (
    <View className='items-center justify-center flex-1'>
      <Image 
        source={require ('../../assets/images/GatoMeme.jpg')}
        style={{ height: 600, width: 600}}
      />
    </View>
  )
}

export default passOlvidada