import AvisoModal from '@/components/AvisoModal'
import BasicTable from '@/components/BasicTable'
import BasicTableHistory from '@/components/BasicTableHistory'
import BasicWebModal from '@/components/BasicWebModal'
import BasicWebModalHistory from '@/components/BasicWebModalHistory'
import { ThemedText } from '@/components/ThemedText'
import UserCard from '@/components/UserCard'
import { useFormattedDate } from '@/hooks/useFormattedDate'
import { Historial, Medicamentos } from '@/store/data/stockMedicamentos'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Select from 'react-select'



type FormData = {
  nombre: {value: string, label: string}
  presentacion: string
  cantidad: string
  expiracion: Date

}

const valores = Historial.map((item) => {
  return{
    value: item.name,
    label: item.name
  }
})

const InventarioScreen = () => {
  const [visible, setVisible] = useState(false)
  const [visibleHistorial, setVisibleHistorial] = useState(false)
  const [mostrarAviso, setMostrarAviso] = useState(false)
  
  const {control, handleSubmit, formState: { errors }, reset} = useForm<FormData>()
  
  const onSubmit = handleSubmit((data) => {console.log(data); setVisible(false); setMostrarAviso(true) ;reset()})

  const {formatDate} = useFormattedDate()



  return (
    <View className='flex-1 w-[90%] m-auto my-8'>
      <UserCard titulo='Gestión de Inventario' />
      <ScrollView className='bg-white rounded-lg shadow-lg flex-1 p-5'>
        <View>
          <BasicTable items={Medicamentos}/>
        </View>
        <View className='flex-row gap-3'>
          <TouchableOpacity onPress={() => setVisible(true)} className='px-3  items-center justify-center rounded-lg flex-row bg-[#2b27a8]'><Ionicons name='add-circle-outline' size={20} className='content-center text-white justify-center items-center px-1'/><Text className='content-center text-white text-base mb-[0.20rem] py-2'>Nuevo Medicamento</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setVisibleHistorial(true)} className='px-3  items-center justify-center rounded-lg flex-row bg-red-300'><Ionicons name='reader-outline' size={20} className='content-center justify-center items-center px-1'/><Text className='content-center text-base mb-[0.20rem] py-2'>Ver Historial de Ingresos</Text></TouchableOpacity>
        </View>


        <BasicWebModal visibleExterno={visible} onClose={() => setVisible(false)}>
          {/* <ScrollView className=''>  */}
            <ThemedText className='items-center color-[#7672ff] text-2xl font-semibold py-8'>Cargar Medicamento</ThemedText>
            <View className='flex-row justify-between'>
              


              <View className=' w-[40%] mx-6'>


                <ThemedText className='font-medium text-lg'>Presentación</ThemedText>
                <Controller 
                  control={control}
                  rules={{required: true}}
                  name='presentacion'
                  render={({field}) => (
                    <select {...field}
                    className={`${errors.presentacion ? 'border-red-600 outline-none' : 'border-gray-200'} p-2 bg-white border-[2px] rounded-lg`}
                    
                    >
                      <option value=''>Seleccionar...</option>
                      <option value='Aerosol'>Aerosol</option>
                      <option value='Ampollas'>Ampollas</option>
                      <option value='Capsulas'>Capsulas</option>
                      <option value='Comprimidos'>Comprimidos</option>
                      <option value='Frascos'>Frascos</option>
                    </select>
                  )}
                  />
                {errors.presentacion && ( <Text className='text-red-600'>Este campo es obligatorio</Text> )}
              
                <ThemedText className='font-medium text-lg mt-8'>Nombre</ThemedText>
                <Controller 
                  control={control}
                  rules={{required: true}}
                  name='nombre'
                  render={({field}) => (
                    // <TextInput
                    // className={`${errors.nombre ? ' border-red-600 outline-none' : 'border-gray-200'} p-2 bg-white border-[2px] ${field.value ? 'text-gray-950': 'text-gray-500'} rounded-lg`}
                    // style={{fontFamily:'SpaceMono'}}
                    //     placeholder="Ingrese su Usuario"
                    //     onBlur={field.onBlur}
                    //     spellCheck={false}
                    //     onChangeText={field.onChange}
                    //     value={field.value ?? ''}
                    // />
                    <Select {...field}
                      options={valores}
                      className={`${errors.nombre ? 'z-10 border-red-600 outline-none' : 'border-gray-200'} p-2 bg-white border-[2px]  rounded-lg`}

                    />
                  )}
                />
                {errors.nombre && ( <Text className='text-red-600'>Este campo es obligatorio</Text> )}
              
              
              </View>
              


              <View className='w-[45%] mx-6'>


                <ThemedText className='font-medium text-lg'>Cantidad</ThemedText>
                <Controller 
                  control={control}
                  rules={{required: true, pattern: /^[0-9]+$/ }}
                  name='cantidad'
                  render={({field}) => (
                    <TextInput
                    className={`${errors.cantidad ? 'border-red-600 outline-none' : 'border-gray-200'} p-2 bg-white border-[2px] ${field.value ? 'text-gray-950': 'text-gray-500'} rounded-lg`}
                    style={{fontFamily:'SpaceMono'}}
                        placeholder="Ingrese su Usuario"
                        onBlur={field.onBlur}
                        spellCheck={false}
                        onChangeText={field.onChange}
                        value={field.value ?? ''}
                        />
                      )}
                      />
                {errors.cantidad && ( <Text className='text-red-600'>Ingrese una cantidad numerica</Text> )}

                <ThemedText className='font-medium text-lg mt-8'>Fecha de Expiracion</ThemedText>
                <Controller
                  name="expiracion"
                  control={control}
                  rules={{required: true}}
                  render={({ field }) => (
                    <input 
                      type="date" 
                      min={new Date().toISOString().split('T')[0]} 
                      value={field.value?.toISOString().split('T')[0] ?? new Date().toISOString()} 
                      onChange={(e) => field.onChange(new Date(e.target.value))} 
                      className="p-2 border-[2px] rounded-lg" 
                    />

                  )}
                />
                {errors.expiracion && ( <Text className='text-red-600'>Ingrese una fecha</Text> )}
              </View>


            </View>
            <View className='w-[100%] mb-10 flex-row justify-end mt-20'>
              <TouchableOpacity onPress={()=>{setVisible(false)}} className='z-0 mr-8 rounded-md bg-red-500 items-center ml-8 px-4'><Text className='text-lg color-white p-3 font-semibold'>Cancelar</Text></TouchableOpacity>
              <TouchableOpacity
                onPress={()=>onSubmit()} 
                className='rounded-md bg-[#2b27a8] items-center mr-8 px-4'
              >
                <Text className='text-lg color-white p-3 font-semibold '>Cargar</Text>
              </TouchableOpacity>
              
                      
            </View>
          
          {/* </ScrollView> */}
        </BasicWebModal>

        <AvisoModal visibleExterno={mostrarAviso} onAccept={()=> setMostrarAviso(false)} />

        <BasicWebModalHistory visibleExterno={visibleHistorial} onClose={()=> setVisibleHistorial(false)}>
          <ScrollView>
                <BasicTableHistory items={Historial}/>

          </ScrollView>
        </BasicWebModalHistory>


      </ScrollView>
    </View>
  )
}

export default InventarioScreen
