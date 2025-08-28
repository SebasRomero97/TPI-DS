import AlertModal from '@/components/AlertModal'
import { ThemedText } from '@/components/ThemedText'
import UserCard from '@/components/UserCard'
import { Horarios as items, Medicamentos } from '@/store/data/stockMedicamentos'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { DataTable } from 'react-native-paper'


const AlarmasScreen = () => {
  
  const [visibleRegistrar, setVisibleRegistrar] = useState(false)

  const [visibleVerRegistro, setVisibleVerRegistro] = useState(false)

  const registrarDosis = () => {
    setVisibleRegistrar(false)

  }


  return (
    <View className='flex-1 w-[90%] m-auto my-8'>
      <UserCard titulo='Alarmas'/>
        {/* <View className='bg-white rounded-lg shadow-lg p-8 mb-4 h-1 justify-center'>
          <ThemedText type='miniTitulo' className='pb-0 '>Alarmas</ThemedText>
        </View> */}
        <View className='bg-white rounded-lg shadow-lg p-4 mb-4 h-[35vh]'>
          <ThemedText type='miniTitulo' className='pb-0'>Proximas Dosis</ThemedText>
            
            <DataTable>
              <DataTable.Header>
                <DataTable.Title sortDirection='descending'>Hora</DataTable.Title>
                <DataTable.Title>Residente</DataTable.Title>
                <DataTable.Title>Medicamento</DataTable.Title>
                <DataTable.Title>Dosis</DataTable.Title>
                <DataTable.Title>Via</DataTable.Title>
                <DataTable.Title>Estado</DataTable.Title>
                <DataTable.Title>Hcer algo</DataTable.Title>
              </DataTable.Header>
            </DataTable>
            <ScrollView >
              <DataTable>
                {items.map((item) => (
                <DataTable.Row key={item.id}>
                  <DataTable.Cell>{item.hora}</DataTable.Cell>
                  <DataTable.Cell>{item.residente}</DataTable.Cell>
                  <DataTable.Cell>{item.medicamento}</DataTable.Cell>
                  <DataTable.Cell>{item.dosis}</DataTable.Cell>
                  <DataTable.Cell>{item.via}</DataTable.Cell>
                  <DataTable.Cell>{item.estado}</DataTable.Cell>
                  {item.estado === 'Pendiente' ?
                    <DataTable.Cell>{<Text className='cursor-pointer underline text-[#7672ff]' onPress={()=>{setVisibleRegistrar(true)}}>[REGISTRAR]</Text>}</DataTable.Cell>
                  : 
                    <DataTable.Cell>{<Text className=''>[REGISTRADO]</Text>}</DataTable.Cell>
                }
                  
                </DataTable.Row>
                ))}
              </DataTable>

            </ScrollView>
            


        </View>
        <View className='bg-white rounded-lg shadow-lg p-4 mb-4 h-[35vh]'>
          <ThemedText type='miniTitulo' className='pb-0'>Proximos Vencimientos</ThemedText>
            
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>ID</DataTable.Title>
                <DataTable.Title>Medicamento</DataTable.Title>
                <DataTable.Title sortDirection='descending'>Fecha de Vencimiento</DataTable.Title>
                <DataTable.Title>Stock a Vencer</DataTable.Title>
                <DataTable.Title>Estado</DataTable.Title>
              </DataTable.Header>
            </DataTable>
            <ScrollView >
              <DataTable>
                {Medicamentos.map((item) => (
                <DataTable.Row key={item.id}>
                  <DataTable.Cell>{item.id}</DataTable.Cell>
                  <DataTable.Cell>{item.name}</DataTable.Cell>
                  <DataTable.Cell>{item.expiration}</DataTable.Cell>
                  <DataTable.Cell>{item.quantity}</DataTable.Cell>
                  <DataTable.Cell>{<Text>Proximo</Text>}</DataTable.Cell>
                  
                </DataTable.Row>
                ))}
              </DataTable>

            </ScrollView>
        </View>
        
        <AlertModal visibleExterno={visibleRegistrar} onAccept={registrarDosis} onCancel={() => {setVisibleRegistrar(false)}}>
        </AlertModal>
        {/* <BasicWebModalConX visibleExterno={visibleVerRegistro} onClose={()=>setVisibleVerRegistro(false)}>
                <View>
                  <Text>{itemVerRegistro?.dosis}</Text>
                  <Text>{itemVerRegistro?.estado}</Text>
                  <Text>{itemVerRegistro?.hora}</Text>
                  <Text>{itemVerRegistro?.medicamento}</Text>
                  <Text>{itemVerRegistro?.residente}</Text>
                  <Text>{itemVerRegistro?.via}</Text>
                </View>
        </BasicWebModalConX> */}


    </View>
  )
}

export default AlarmasScreen