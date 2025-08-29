import { Diagnosticos } from '@/store/data/stockMedicamentos';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { DataTable, TextInput } from 'react-native-paper';
import { useSortedData } from './useSortDataForDataTable';



const initialValues = Diagnosticos;

  
type User = {
    nombre: string;
    dni: string;
    diagnostico: string;
    fecha: string;
    observaciones: string;

};

interface Props {
  items?: User[];

  pacienteSeleccionado: (item:User) => void
}

const BasicTableNuevoTratamiento = ({ items = initialValues, pacienteSeleccionado }: Props) => {
  const [search, setSearch] = useState('');
  const [sortColumn, setSortColumn] = useState<'nombre' |'dni' |'diagnostico' |'fecha' |'observaciones' | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(0);
  const [bandera, setBandera] = useState(true)
  const itemsPerPage = 3; 

   
  const filteredUsers = items.filter((user) =>
    `${user.nombre} ${user.dni} ${user.diagnostico} ${user.fecha} ${user.observaciones}`.toLowerCase().includes(search.toLowerCase())
  );

   
  const sortedUsers = useSortedData(filteredUsers, sortColumn, sortAsc);

  
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, sortedUsers.length);
  const paginatedUsers = sortedUsers.slice(from, to);

  const sortBy = (column: 'nombre' |'dni' |'diagnostico' |'fecha' |'observaciones') => {
    setSortAsc(sortColumn === column ? !sortAsc : true);
    setSortColumn(column);
    setBandera(false) 
  };


  return (
    <View>
      
      <TextInput
        label="Ingresar datos del Paciente"
        mode="outlined"
        left={<TextInput.Icon icon="magnify" />}
        value={search}
        onChangeText={setSearch}
        style={{
          width: '50%',
          borderRadius: 215
        }}
      />




      <DataTable>
        <DataTable.Header>
          
          <DataTable.Title 
            sortDirection={sortColumn === 'dni' ? (sortAsc ? 'ascending' : 'descending') : undefined}
            onPress={() => sortBy('dni')}
          >
            DNI
          </DataTable.Title>

          <DataTable.Title 
            sortDirection={sortColumn === 'nombre' ? (sortAsc ? 'ascending' : 'descending') : undefined}
            onPress={() => sortBy('nombre')}
          >
            Nombre
          </DataTable.Title>

          <DataTable.Title 
            sortDirection={sortColumn === 'diagnostico' ? (sortAsc ? 'ascending' : 'descending') : undefined}
            onPress={() => sortBy('diagnostico')}
          >
            Diagnostico
          </DataTable.Title>
        </DataTable.Header>

        {paginatedUsers.map((user) => ( 
          <DataTable.Row key={user.dni}>
            <DataTable.Cell>{user.dni}</DataTable.Cell>
            <DataTable.Cell>{user.nombre}</DataTable.Cell>
            <DataTable.Cell>{user.diagnostico}</DataTable.Cell>
            <DataTable.Cell><Text className='underline' onPress={() => {pacienteSeleccionado(user)}}>SELECCIONAR</Text></DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
};

export default BasicTableNuevoTratamiento;


