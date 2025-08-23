import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'

const UserCard = () => {
  return (
    <View className='flex-row justify-end'>
        <View className='bg-white rounded-lg flex-row w-[17rem] pr-5 gap-5 justify-end mb-8 py-2 shadow-lg'>

            <Ionicons name='moon-outline' size={30}/>
            <Ionicons name='notifications-outline' size={30}/>
            <Ionicons name='settings-outline' size={30}/>
            <Ionicons name='person-circle-outline' size={30}/>

        </View>
    </View>
  )
}

export default UserCard