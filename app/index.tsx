import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View } from "react-native";




const initialUsers = [
  { id: '1', name: 'Juan', email: 'juan@test.com' },
];


const HomePage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
      password: "",
    },
  })
  const onSubmit = (data:any) => console.log(data)
  return (
      <LinearGradient
      className="flex-1 text-center items-center justify-center"
      colors={['#b2afff', '#817fba']} // Claro a oscuro
      start={{ x: 1, y: 0 }} // Esquina superior derecha
      end={{ x: 0, y: 1 }}   // Esquina inferior izquierda
    >
      {/* Tu contenido va acá */}
    

        <Text className='color-white text-6xl font-bold pb-10'>Vitales SW</Text>



        <View className='bg-white rounded-lg shadow-md w-1/2 h-3/4 max-h-[476px] max-w-[486px]'> {/** caja blanca */}
          <View className='w-[75%] items-center mx-auto flex-1 justify-between'>{/** caja dentro de caja blanca donde esta el texto */}
            
            <View className='mt-10'>{/** texto */}
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
                      value={value}
                    />
                  )}
                  name="userName"
                />
                {errors.userName && (<Text className='text-red-600'>El nombre es obligatorio{errors.userName.message}</Text>)}
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
                      value={value}
                    />
                  )}
                  name="password"
                />
                {errors.password && (<Text className='text-red-600'>El nombre es obligatorio{errors.password.message}</Text>)}
              </View>
            </View>

            <View className='w-[100%] mb-10'>
              <TouchableOpacity onPress={handleSubmit(onSubmit)} className='rounded-md bg-[#2b27a8] items-center'><Text className='text-lg color-white p-3 font-semibold'>Ingresar</Text></TouchableOpacity>
                    
              <Link href={'/passOlvidada'} className='underline m-auto mt-5' style={{fontFamily:'SpaceMono'}}>¿Olvidaste tu contraseña?</Link>
            </View>
          </View>
        </View>
      </LinearGradient>
  );
}

export default HomePage