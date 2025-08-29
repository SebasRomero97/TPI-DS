import { Diagnosticos } from '@/store/data/stockMedicamentos';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput as TextInputReact, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DataTable, TextInput } from 'react-native-paper';
import Select from 'react-select';
import AvisoModal from './AvisoModal';
import BasicWebModal from './BasicWebModal';
import { ThemedText } from './ThemedText';
import { useSortedData } from './useSortDataForDataTable';

const initialValues = Diagnosticos;
  
type User = {
  nombre: string;
  dni: string;
  diagnostico: string;
  fecha: string;
  observaciones: string;

};

type FormData = {
  dni: string,
  observaciones: string
  diagnosticoPrincipal: {value: string, label: string}
  fecha: string
}
interface Props {
  items?: User[];
}



const valores = Diagnosticos.map((item) => {
  return {
    value: item.diagnostico,
    label: item.diagnostico
  }
})



const BasicTableDiagnosticos = ({ items = initialValues }: Props) => {

  const {control, handleSubmit, formState:{errors}, reset} = useForm<FormData>()
  const onSubmit = handleSubmit((data:FormData) => {console.log(data); setCargarDiagnosticoVisible(false); reset(); setMostrarAviso(true)})

  const [cargarDiagnosticoVisible, setCargarDiagnosticoVisible] = useState(false);
  const [mostrarAviso, setMostrarAviso] = useState(false)

  const [search, setSearch] = useState('');
  const [sortColumn, setSortColumn] = useState<'nombre' | 'dni' | 'diagnostico' | 'fecha' | 'observaciones' | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(0);
  const [bandera, setBandera] = useState(true)
  const itemsPerPage = 8; 

   
  const filteredUsers = items.filter((user) =>
    `${user.nombre} ${user.dni} ${user.diagnostico} ${user.fecha} ${user.observaciones}`.toLowerCase().includes(search.toLowerCase())
  );

   
  const sortedUsers = useSortedData(filteredUsers, sortColumn, sortAsc);

  
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, sortedUsers.length);
  const paginatedUsers = sortedUsers.slice(from, to);

  const sortBy = (column: 'nombre' | 'dni' | 'diagnostico' | 'fecha' | 'observaciones') => {
    setSortAsc(sortColumn === column ? !sortAsc : true);
    setSortColumn(column);
    setBandera(false) 
  };


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
          
          <TouchableOpacity onPress={() => setCargarDiagnosticoVisible(true)} className='px-3 py-2 ml-4 mt-[6px] items-center justify-center rounded-lg flex-row bg-[#2b27a8]'><Ionicons name='add-circle-outline' size={20} className='content-center text-white justify-center items-center px-1'/><Text className='content-center text-white text-base mb-[0.20rem]'>Nuevo Diagnostico</Text></TouchableOpacity>
      </View>
          <BasicWebModal  visibleExterno={cargarDiagnosticoVisible} height={'80%'} width={'50%'} >
            <ThemedText type='title'>Paciente</ThemedText>
            <ScrollView>
              
              <ThemedText className='mt-4'>Ingrese un DNI: </ThemedText>
              {errors.dni && ( <Text className='text-red-600 ml-2'>Ingrese un DNI</Text> )}
              <Controller 
                control={control}
                rules={{required: true, pattern: /^\d{7,8}$/}}
                name='dni'
                render={({field}) => (
                  <TextInputReact {...field}
                  // style={{
                  //   backgroundColor:'white',
                  //   padding: '0.5rem',
                  //   outline: '2px solid transparent',
                  //   outlineOffset: '2px',
                  //   borderColor: '#dc2626',
                  //   borderColor: '#e5e7eb',
                  //   borderWidth: '2px',
                  //   borderRadius: '0.5rem'
                  // }}
                  className={`${errors.dni ? 'border-red-600 outline-none' : 'border-gray-200'} m-2 p-2 mt-0 w-[40%] bg-white border-[2px] rounded-lg`}                    
                  />
                )}
              />
              
              
              <View className=''>
                <ThemedText type='title'>Diagnostico</ThemedText>
              
                <ThemedText className='mt-4'>Diagnostico: </ThemedText>
                {errors.diagnosticoPrincipal && ( <Text className='text-red-600 ml-2'>Ingrese un Diagnostico</Text> )}
                <Controller 
                  control={control}
                  rules={{required: true}}
                  name='diagnosticoPrincipal'
                  render={({field}) => (
                    <Select {...field}
                     options={valores} 
                     className={`${errors.diagnosticoPrincipal ? 'border-red-600 outline-none' : 'border-gray-200'} m-2 p-2 mt-0 w-[40%] bg-white border-[2px] rounded-lg`}
                      
                    >
                      
                    </Select>
                  )}
                />
                
                
                                       
                
                
                
                
                <ThemedText className='mt-4'>Observaciones: </ThemedText>
                <Controller 
                  control={control}
                  name='observaciones'
                  render={({field}) => (
                    <textarea {...field}
                    
                    // style={{
                    //   backgroundColor:'white',
                    //   padding: '0.5rem',
                    //   outline: '2px solid transparent',
                    //   outlineOffset: '2px',
                    //   borderColor: '#dc2626',
                    //   borderColor: '#e5e7eb',
                    //   borderWidth: '2px',
                    //   borderRadius: '0.5rem'
                    // }}
                    className={`${errors.observaciones ? 'border-red-600 outline-none' : 'border-gray-200'} m-2 p-2  bg-white border-[2px] rounded-lg resize-none h-[15rem]`}                    
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
            Paciente
          </DataTable.Title>
          
          <DataTable.Title 
            sortDirection={sortColumn === 'dni' ? (sortAsc ? 'ascending' : 'descending') : undefined}
            onPress={() => sortBy('dni')}
          >
            DNI
          </DataTable.Title>

          <DataTable.Title 
            sortDirection={sortColumn === 'diagnostico' ? (sortAsc ? 'ascending' : 'descending') : undefined}
            onPress={() => sortBy('diagnostico')}
          >
            Diagnostico
          </DataTable.Title>

          <DataTable.Title 
            sortDirection={sortColumn === 'fecha' ? (sortAsc ? 'ascending' : 'descending') : undefined}
            onPress={() => sortBy('fecha')}
          >
            Fecha del Diagnostico
          </DataTable.Title>

          <DataTable.Title 
            sortDirection={sortColumn === 'observaciones' ? (sortAsc ? 'ascending' : 'descending') : undefined}
            onPress={() => sortBy('observaciones')}
          >
            Observaciones
          </DataTable.Title>
        </DataTable.Header>

        {paginatedUsers.map((user) => ( 
          <DataTable.Row key={user.dni}>
            <DataTable.Cell>{user.nombre}</DataTable.Cell>
            <DataTable.Cell>{user.dni}</DataTable.Cell>
            <DataTable.Cell>{user.diagnostico}</DataTable.Cell>
            <DataTable.Cell>{user.fecha}</DataTable.Cell>
            <DataTable.Cell>{user.observaciones}</DataTable.Cell>
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

export default BasicTableDiagnosticos;


