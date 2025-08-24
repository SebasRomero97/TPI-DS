import BasicTable from '@/components/BasicTable'
import { ThemedText } from '@/components/ThemedText'
import UserCard from '@/components/UserCard'
import { Medicamentos } from '@/store/data/stockMedicamentos'
import React from 'react'
import { ScrollView, View } from 'react-native'

const InventarioScreen = () => {
  return (
    <View className='flex-1 w-[90%] m-auto my-8'>
      <UserCard />
      <ScrollView className='bg-white rounded-lg shadow-lg flex-1 p-10'>
        <ThemedText>Gestión de Inventario</ThemedText>
        <View>Bonones y Buscador</View>
        <View>
          <BasicTable items={Medicamentos}/>
        </View>
        <View>Mas Botones</View>
      </ScrollView>
    </View>
  )
}

export default InventarioScreen
