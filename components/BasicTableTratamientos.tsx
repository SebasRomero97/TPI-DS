import { Tratamientos } from '@/store/data/stockMedicamentos';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput as TextInputReact, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Checkbox, DataTable, TextInput } from 'react-native-paper';
import AvisoModal from './AvisoModal';
import BasicTableNuevoTratamiento from './BasicTableNuevoTratamiento';
import BasicWebModal from './BasicWebModal';
import { ThemedText } from './ThemedText';
import { useSortedData } from './useSortDataForDataTable';

const initialValues = Tratamientos;
  
type User = {
  id:number
  nombre: string;
  diagnostico: string;
  tratamiento: string;
  inicio: string;
  finEstimado: string;
  duracion: number;

};

type User2 = {
    nombre: string;
    dni: string;
    diagnostico: string;
    fecha: string;
    observaciones: string;
};

type FormData = {
    nombre: string;
    dni: string;
    diagnostico: string;
    fecha: string;
    observaciones: string;
    nombreTratamiento: string;
    dosis: string;
    frecuencia: string;
    duracionDefinida: boolean;
    duracion?: string 
    observacionesTratamiento: string;
}


interface Props {
  items?: User[];
}



const BasicTableTratamientos = ({ items = initialValues }: Props) => {
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState<User2>({
    nombre: '',
    dni: '',
    diagnostico: '',
    fecha: '',
    observaciones: '',
})

  const {control, handleSubmit, formState:{errors}, reset} = useForm<FormData>()
  const onSubmit = handleSubmit((data:FormData) => {data = {...pacienteSeleccionado}; console.log(data); setCargarDiagnosticoVisible(false); reset(); setMostrarAviso(true)})

  const [cargarDiagnosticoVisible, setCargarDiagnosticoVisible] = useState(false);
  const [mostrarAviso, setMostrarAviso] = useState(false)

  const [search, setSearch] = useState('');
  const [sortColumn, setSortColumn] = useState<'nombre' | 'diagnostico' | 'tratamiento' | 'inicio' | 'finEstimado' | 'duracion' | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(0);
  const [bandera, setBandera] = useState(true)
  const itemsPerPage = 8; 

   
  const filteredUsers = items.filter((user) =>
    `${user.nombre} ${user.diagnostico} ${user.tratamiento} ${user.inicio} ${user.finEstimado} ${user.duracion}`.toLowerCase().includes(search.toLowerCase())
  );

   
  const sortedUsers = useSortedData(filteredUsers, sortColumn, sortAsc);

  
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, sortedUsers.length);
  const paginatedUsers = sortedUsers.slice(from, to);

  const sortBy = (column: 'nombre' | 'diagnostico' | 'tratamiento' | 'inicio' | 'finEstimado' | 'duracion'  ) => {
    setSortAsc(sortColumn === column ? !sortAsc : true);
    setSortColumn(column);
    setBandera(false) 
  };

  const mostrarPacienteElegido = (paciente:User2) => {
    setPacienteSeleccionado(paciente)
    console.log('desde el padre:', pacienteSeleccionado)
  }

  return (
    <View>
      <View className='flex-row items-center object-center'>
        <TextInput
          label="Buscar"
          mode="outlined"
          left={<TextInput.Icon icon="magnify" />}
          value={search}
          onChangeText={setSearch}
          style={{
            width: '50%',
            borderRadius: 215
          }}
        />
          
          <TouchableOpacity onPress={() => setCargarDiagnosticoVisible(true)} className='px-3 py-2 ml-4 mt-[6px] items-center justify-center rounded-lg flex-row bg-[#2b27a8]'><Ionicons name='add-circle-outline' size={20} className='content-center text-white justify-center items-center px-1'/><Text className='content-center text-white text-base mb-[0.20rem]'>Nuevo Tratamiento</Text></TouchableOpacity>
      </View>
          <BasicWebModal  visibleExterno={cargarDiagnosticoVisible} height={'80%'} width={'50%'} >
            <ScrollView>
              <ThemedText type='title' className='mb-4'>Buscar Paciente</ThemedText>
              <BasicTableNuevoTratamiento pacienteSeleccionado={mostrarPacienteElegido}/>
              
              <ThemedText type='title' className='mt-8 mb-4'>Paciente Seleccionado:</ThemedText>
              <View className='flex-row gap-2'>
                <ThemedText type='subtitle'>DNI:</ThemedText><ThemedText>{pacienteSeleccionado.dni ?? ''}</ThemedText>
              </View>
              <View className='flex-row gap-2'>
                <ThemedText type='subtitle'>Nombre: </ThemedText><ThemedText>{pacienteSeleccionado.nombre ?? ''}</ThemedText>
              </View>
              <View className='flex-row gap-2'>
                <ThemedText type='subtitle'>Diagnostico: </ThemedText><ThemedText>{pacienteSeleccionado.diagnostico ?? ''}</ThemedText>
              </View>
              <View className='flex-row gap-2'>
                <ThemedText type='subtitle'>Fecha de Diagnostico: </ThemedText><ThemedText>{pacienteSeleccionado.fecha ?? ''}</ThemedText>
              </View>
              <View className='flex-row gap-2'>
                <ThemedText type='subtitle'>Observaciones: </ThemedText><ThemedText>{pacienteSeleccionado.observaciones ?? ''}</ThemedText>
              </View>


              <View> 
                {errors.nombreTratamiento && ( <Text className='text-red-600 ml-2'>Ingrese un Nombre</Text> )}
                <Controller 
                  control={control}
                  rules={{required: true}}
                  name='nombreTratamiento'
                  render={({field}) => (
                    <TextInputReact {...field} 
                      placeholder='Ingrese un Nombre'
                      className={`${errors.nombreTratamiento ? 'border-red-600 outline-none' : 'border-gray-200'} m-2 mt-0 p-2 w-[40%] ${field.value ? 'text-gray-950': 'text-gray-500'} bg-white border-[2px] rounded-lg`}                    

                    />
                  )}
                />
                {errors.dosis && ( <Text className='text-red-600 ml-2'>Ingrese un Numero</Text> )}
                <Controller 
                  control={control}
                  rules={{required: true, pattern: /^[0-9]+$/ }}
                  name='dosis'
                  render={({field}) => (
                    <TextInputReact {...field}
                      className={`${errors.dosis ? 'border-red-600 outline-none' : 'border-gray-200'} m-2 p-2 mt-0 w-[40%] ${field.value ? 'text-gray-950': 'text-gray-500'} bg-white border-[2px] rounded-lg`}                    
                      placeholder='Ingrese una cantidad'
                    />
                  )}
                />
                {errors.frecuencia && ( <Text className='text-red-600 ml-2'>Ingrese un Numero</Text> )}
                <Controller 
                  control={control}
                  rules={{required: true, pattern: /^[0-9]+$/ }}
                  name='frecuencia'
                  render={({field}) => (
                    <TextInputReact {...field}
                      className={`${errors.frecuencia ? 'border-red-600 outline-none' : 'border-gray-200'} m-2 p-2 mt-0 w-[40%] ${field.value ? 'text-gray-950': 'text-gray-500'} bg-white border-[2px] rounded-lg`}                    
                      placeholder='Ingrese una cantidad'
                    />
                  )}
                />
                {errors.duracionDefinida && ( <Text className='text-red-600 ml-2'>Ingrese un Numero</Text> )}
                <Controller 
                  control={control}
                  rules={{required: true, pattern: /^[0-9]+$/ }}
                  name='duracionDefinida'
                  render={({field}) => (
                    <Checkbox {...field}
                    status='unchecked'
                      // className={`${errors.frecuencia ? 'border-red-600 outline-none' : 'border-gray-200'} m-2 p-2 mt-0 w-[40%] ${field.value ? 'text-gray-950': 'text-gray-500'} bg-white border-[2px] rounded-lg`}                    
                      // placeholder='Ingrese una cantidad'
                    />
                  )}
                />
              </View>


              
            </ScrollView>
            {/* <TouchableOpacity onPress={onSubmit}> <Text>d;slakdl;sakdl;as</Text></TouchableOpacity> */}
            <View className='flex-row justify-between pt-6'>
              <TouchableOpacity onPress={()=> {setCargarDiagnosticoVisible(false)}} className='rounded-md bg-red-500 items-center ml-8 px-8'><Text className='text-lg color-white p-3 font-semibold'>Cancelar</Text></TouchableOpacity>
              <TouchableOpacity onPress={onSubmit} className='rounded-md bg-[#2b27a8] items-center mr-8 px-8'><Text className='text-lg color-white p-3 font-semibold'>Ingresar</Text></TouchableOpacity>
            </View>
          </BasicWebModal>
          <AvisoModal visibleExterno={mostrarAviso} onAccept={()=>setMostrarAviso(false)} />



      <DataTable>
        <DataTable.Header>
          <DataTable.Title 
            sortDirection={sortColumn === 'nombre' ? (sortAsc ? 'ascending' : 'descending') : (bandera ? 'descending' : undefined)}
            onPress={() => sortBy('nombre')}
          >
            Residente
          </DataTable.Title>


          <DataTable.Title 
            sortDirection={sortColumn === 'diagnostico' ? (sortAsc ? 'ascending' : 'descending') : undefined}
            onPress={() => sortBy('diagnostico')}
          >
            Diagnostico
          </DataTable.Title>

          <DataTable.Title 
            sortDirection={sortColumn === 'tratamiento' ? (sortAsc ? 'ascending' : 'descending') : undefined}
            onPress={() => sortBy('tratamiento')}
          >
            Tratamiento
          </DataTable.Title>

          <DataTable.Title 
            sortDirection={sortColumn === 'duracion' ? (sortAsc ? 'ascending' : 'descending') : undefined}
            onPress={() => sortBy('duracion')}
          >
            Duracion(Dias)
          </DataTable.Title>

          <DataTable.Title 
            sortDirection={sortColumn === 'inicio' ? (sortAsc ? 'ascending' : 'descending') : undefined}
            onPress={() => sortBy('inicio')}
          >
            Inicio
          </DataTable.Title>

          <DataTable.Title 
            sortDirection={sortColumn === 'finEstimado' ? (sortAsc ? 'ascending' : 'descending') : undefined}
            onPress={() => sortBy('finEstimado')}
          >
            Fin Estimado
          </DataTable.Title>

        </DataTable.Header>

        {paginatedUsers.map((user) => ( 
          <DataTable.Row key={user.id}>
            <DataTable.Cell>{user.nombre}</DataTable.Cell>
            <DataTable.Cell>{user.diagnostico}</DataTable.Cell>
            <DataTable.Cell>{user.tratamiento}</DataTable.Cell>
            <DataTable.Cell>{user.duracion}</DataTable.Cell>
            <DataTable.Cell>{user.inicio}</DataTable.Cell>
            <DataTable.Cell>{user.finEstimado}</DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(sortedUsers.length / itemsPerPage)}
          onPageChange={setPage}
          label={`${from + 1}-${to} de ${sortedUsers.length}`}
          showFastPaginationControls
        />
      </DataTable>
    </View>
  );
};

export default BasicTableTratamientos;


