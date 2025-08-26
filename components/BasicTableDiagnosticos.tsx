import { Diagnosticos } from '@/store/data/stockMedicamentos';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
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
}

const BasicTableDiagnosticos = ({ items = initialValues }: Props) => {
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
      <View className='flex-row'>
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
          
          <TouchableOpacity onPress={() => setVisible(true)} className='px-3  items-center justify-center rounded-lg flex-row bg-[#2b27a8]'><Ionicons name='add-circle-outline' size={20} className='content-center text-white justify-center items-center px-1'/><Text className='content-center text-white text-base mb-[0.20rem]'>Nuevo Medicamento</Text></TouchableOpacity>
      </View>




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


