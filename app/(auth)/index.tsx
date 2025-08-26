import { ThemedText } from '@/components/ThemedText';
import { usePermission } from '@/store/datos/usePermission';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View } from "react-native";

type FormData = {
  userName: string
  password: string
}

  
const InicioSesionScreen = () => {
  const {user, setUser, pass, status, loadUser} = usePermission()
  console.log('esta es la data del store:', user, pass, status)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    console.log('esta es la data del form:',data)
    setUser(data.userName, data.password)
    console.log('esta es la data del store:', user, pass, status)
  });
  
  useEffect(() => {
    loadUser()
  }, [loadUser])

  useEffect(() => {
    if (status) {
      router.replace('/(drawer)/inventario')
    }  
    
  }, [status])
  
  
  
  
  return (
      <LinearGradient
      className="flex-1 text-center items-center justify-center overflow-scroll py-8"
      colors={['#b2afff', '#817fba']} // Claro a oscuro
      start={{ x: 1, y: 0 }} // Esquina superior derecha
      end={{ x: 0, y: 1 }}   // Esquina inferior izquierda
    >
    

        <Text className='color-white text-6xl font-bold pb-5 py-10'>Vitales SW</Text>



        <View className='bg-white rounded-lg shadow-md w-1/2 h-3/4 h-[476px] w-[486px]'> 
          <View className='w-[75%] items-center mx-auto flex-1 justify-between'>
            
            <View className='mt-10'>
              <Text className='items-center color-[#7672ff] text-2xl font-semibold pb-4'>¡Bienvenido a VITALES SW!</Text>
              <ThemedText className='pb-4'>Inicia sesion para gestionar de forma simple y segura la atencion de tus residentes.</ThemedText>
            </View>

            <View className='justify-start w-[100%]'>
              <View className='mb-4'>
                <ThemedText className='font-medium text-lg'>Nombre de Usuario</ThemedText>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className={`${errors.userName ? 'border-red-600' : 'border-gray-200'} p-2 border-[2px] ${value ? 'text-gray-950': 'text-gray-500'} rounded-lg`}
                      style={{fontFamily:'SpaceMono'}}
                      placeholder="Ingrese su Usuario"
                      onBlur={onBlur}
                      spellCheck={false}
                      onChangeText={onChange}
                      value={value ?? ''}
                    />
                  )}
                  name="userName"
                />
                {errors.userName && (
                  <Text className='text-red-600'>El usuario es obligatorio</Text>
                )}
              </View>


              <View className='mb-4 pb-4'>
                <ThemedText className='font-medium text-lg'>Contraseña</ThemedText>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    maxLength: 100,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className={`${errors.password ? 'border-red-600' : 'border-gray-200'} p-2 border-[2px] ${value ? 'text-gray-950': 'text-gray-500'} rounded-lg`}
                      style={{fontFamily:'SpaceMono'}}
                      placeholder="Ingrese su Contraseña"
                      onBlur={onBlur}
                      spellCheck={false}
                      onChangeText={onChange}
                      value={value ?? ''}
                    />
                  )}
                  name="password"
                />
                {errors.password && (
                  <Text className='text-red-600'>La contraseña es obligatoria</Text>
                )}

              </View>
            </View>

            <View className='w-[100%] mb-10'>
              <TouchableOpacity onPress={onSubmit} className='rounded-md bg-[#2b27a8] items-center'><Text className='text-lg color-white p-3 font-semibold'>Ingresar</Text></TouchableOpacity>
                    
              <Link href={'./passOlvidada'} className='underline m-auto mt-5' style={{fontFamily:'SpaceMono'}}>¿Olvidaste tu contraseña?</Link>
            </View>
          </View>
        </View>
      </LinearGradient>
  );
}

export default InicioSesionScreen