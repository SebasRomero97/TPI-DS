import BasicTable from '@/components/BasicTable'
import { ThemedText } from '@/components/ThemedText'
import UserCard from '@/components/UserCard'
import { Medicamentos } from '@/store/data/stockMedicamentos'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'

import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

const InventarioScreen = () => {
  return (
    <View className='flex-1 w-[90%] m-auto my-8'>
      <UserCard />
      <ScrollView className='bg-white rounded-lg shadow-lg flex-1 p-10'>
        <ThemedText>Gestión de Inventario</ThemedText>
        <View>
          <BasicTable items={Medicamentos}/>
        </View>
        <View className='flex-row gap-3'>
          <TouchableOpacity className='px-3  items-center justify-center rounded-lg flex-row bg-red-300'><Ionicons name='add-circle-outline' size={20} className='content-center justify-center items-center px-1'/><Text className='content-center text-base mb-[0.20rem] py-2'>Nuevo Medicamento</Text></TouchableOpacity>
          <TouchableOpacity className='px-3  items-center justify-center rounded-lg flex-row bg-red-300'><Ionicons name='reader-outline' size={20} className='content-center justify-center items-center px-1'/><Text className='content-center text-base mb-[0.20rem] py-2'>Ver Historial</Text></TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default InventarioScreen
