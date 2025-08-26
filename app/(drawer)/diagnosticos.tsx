import BasicTableDiagnosticos from '@/components/BasicTableDiagnosticos'
import { ThemedText } from '@/components/ThemedText'
import UserCard from '@/components/UserCard'
import React from 'react'
import { ScrollView, View } from 'react-native'

const DiagnosticosScreen = () => {
  return (
    <View className='flex-1 w-[90%] m-auto my-8'>
      <UserCard />
      <ScrollView className='bg-white rounded-lg shadow-lg flex-1 p-10'>
        <ThemedText type='miniTitulo'>Diagnosticos</ThemedText>
        <BasicTableDiagnosticos />
        <View className='flex-row gap-3'>
          {/* <TouchableOpacity onPress={() => setVisible(true)} className='px-3  items-center justify-center rounded-lg flex-row bg-[#2b27a8]'><Ionicons name='add-circle-outline' size={20} className='content-center text-white justify-center items-center px-1'/><Text className='content-center text-white text-base mb-[0.20rem] py-2'>Nuevo Medicamento</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setVisibleHistorial(true)} className='px-3  items-center justify-center rounded-lg flex-row bg-red-300'><Ionicons name='reader-outline' size={20} className='content-center justify-center items-center px-1'/><Text className='content-center text-base mb-[0.20rem] py-2'>Ver Historial de Ingresos</Text></TouchableOpacity> */}
        </View>
      </ScrollView>
    </View>
  
  
  )
}

export default DiagnosticosScreen