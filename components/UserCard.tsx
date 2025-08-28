import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'
import { ThemedText } from './ThemedText'

interface Props {
  titulo: string
}

const UserCard = ({titulo}:Props) => {
  return (
    <View className='flex-row justify-between'>
        <View className='bg-white rounded-lg flex-row px-5 justify-center object-center mb-8 py-2 shadow-lg'>
          <ThemedText type='miniTitulo' className='pb-0'>{titulo}</ThemedText>
        </View>
        <View className='bg-white rounded-lg flex-row w-[17rem] pr-5 gap-5 justify-end mb-8 py-2 shadow-lg'>

            <Ionicons name='moon-outline' size={28}/>
            <Ionicons name='notifications-outline' size={28}/>
            <Ionicons name='settings-outline' size={28}/>
            <Ionicons name='person-circle-outline' size={28}/>

        </View>
        
    </View>
  )
}

export default UserCard