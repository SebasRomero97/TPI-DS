import React, { useState } from 'react';
import { View } from 'react-native';
import { DataTable, TextInput } from 'react-native-paper';
import { useSortedData } from './useSortDataForDataTable';


const initialValues = [
  { id: 1, name: 'Paracetamol', presentation: 'Comprimidos', quantity: 120, expiration: '12/2025', status: 'Disponible' },
];

  
type User = {
  id: number;
  name: string;
  presentation: string;
  quantity: number;
  expiration: string;
  status: string;

};

interface Props {
  items?: User[];
}

const BasicTable = ({ items = initialValues }: Props) => {
  const [search, setSearch] = useState('');
  const [sortColumn, setSortColumn] = useState<'id' | 'name' | 'presentation' | 'quantity' | 'expiration' | 'status' | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(0);
  const [bandera, setBandera] = useState(true)
  const itemsPerPage = 8; 

   
  const filteredUsers = items.filter((user) =>
    `${user.id} ${user.name} ${user.presentation} ${user.quantity} ${user.expiration} ${user.status}`.toLowerCase().includes(search.toLowerCase())
  );

   
  const sortedUsers = useSortedData(filteredUsers, sortColumn, sortAsc);

  
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, sortedUsers.length);
  const paginatedUsers = sortedUsers.slice(from, to);

  const sortBy = (column: 'id' | 'name' | 'presentation' | 'quantity' | 'expiration' | 'status') => {
    setSortAsc(sortColumn === column ? !sortAsc : true);
    setSortColumn(column);
    setBandera(false) 
  };


  return (
    <View>
      
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




      <DataTable>
        <DataTable.Header>
          <DataTable.Title 
            sortDirection={sortColumn === 'id' ? (sortAsc ? 'ascending' : 'descending') : (bandera ? 'descending' : undefined)}
            onPress={() => sortBy('id')}
          >
            ID
          </DataTable.Title>
          
          <DataTable.Title 
            sortDirection={sortColumn === 'name' ? (sortAsc ? 'ascending' : 'descending') : undefined}
            onPress={() => sortBy('name')}
          >
            Nombre
          </DataTable.Title>

          <DataTable.Title 
            sortDirection={sortColumn === 'presentation' ? (sortAsc ? 'ascending' : 'descending') : undefined}
            onPress={() => sortBy('presentation')}
          >
            Presentacion
          </DataTable.Title>

          <DataTable.Title 
            sortDirection={sortColumn === 'quantity' ? (sortAsc ? 'ascending' : 'descending') : undefined}
            onPress={() => sortBy('quantity')}
          >
            Cantidad
          </DataTable.Title>

          <DataTable.Title 
            sortDirection={sortColumn === 'expiration' ? (sortAsc ? 'ascending' : 'descending') : undefined}
            onPress={() => sortBy('expiration')}
          >
            Expiracion
          </DataTable.Title>

          <DataTable.Title 
            sortDirection={sortColumn === 'status' ? (sortAsc ? 'ascending' : 'descending') : undefined}
            onPress={() => sortBy('status')}
          >
            Estado
          </DataTable.Title>
        </DataTable.Header>

        {paginatedUsers.map((user) => ( 
          <DataTable.Row key={user.id}>
            <DataTable.Cell>{user.id}</DataTable.Cell>
            <DataTable.Cell>{user.name}</DataTable.Cell>
            <DataTable.Cell>{user.presentation}</DataTable.Cell>
            <DataTable.Cell>{user.quantity}</DataTable.Cell>
            <DataTable.Cell>{user.expiration}</DataTable.Cell>
            <DataTable.Cell>{user.status}</DataTable.Cell>
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

export default BasicTable;


