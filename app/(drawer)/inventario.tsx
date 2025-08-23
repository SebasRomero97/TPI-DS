import UserCard from '@/components/UserCard'
import React from 'react'
import { Text, View } from 'react-native'

const InventarioScreen = () => {
  return (
    <View className='flex-1 w-[90%] m-auto my-8'>
      <UserCard />
      <Text className='bg-red-200 flex-1'>InventarioScreen</Text>
    </View>
  )
}

export default InventarioScreen
