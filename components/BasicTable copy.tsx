import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { useSortedData } from './useSortDataForDataTable';

const initialValues = [
  { id: '1', name: 1, email: 'juan@test.com' },
  { id: '2', name: 2, email: 'maria@test.com' },
  { id: '3', name: 3, email: 'pedro@test.com' },
  { id: '4', name: 14, email: 'ana@test.com' },
  { id: '5', name: 25, email: 'luis@test.com' },
  { id: '6', name: 6, email: 'carla@test.com' },
  { id: '7', name: 7, email: 'miguel@test.com' },
  { id: '8', name: 8, email: 'sofia@test.com' },
];
// { id: '001', name: 'Paracetamol', presentation: 'Comprimidos', quantity: 120, expiration: '12/2025', status: 'Disponible' },
  
type User = {
  id: string;
  name: number;
  email: string;
};

interface Props {
  items?: User[];
}

const BasicTable = ({ items = initialValues }: Props) => {
  const [search, setSearch] = useState('');
  const [sortColumn, setSortColumn] = useState<'name' | 'email' | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(0);
  const itemsPerPage = 3; //paginas

  // Filtrar usuarios
  const filteredUsers = items.filter((user) =>
    `${user.name} ${user.email}`.toLowerCase().includes(search.toLowerCase())
  );

  // Hook ordenador
  const sortedUsers = useSortedData(filteredUsers, sortColumn, sortAsc);

  // Paginación
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, sortedUsers.length);
  const paginatedUsers = sortedUsers.slice(from, to);

  const sortBy = (column: 'name' | 'email') => {
    setSortAsc(sortColumn === column ? !sortAsc : true);
    setSortColumn(column);
  };


  return (
    <View>
      {/* Barra Buscadora */}
      <TextInput
        placeholder="Buscar por nombre o email"
        value={search}
        onChangeText={setSearch}
        style={{
          margin: 10,
          padding: 8,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 6,
        }}
      />

      <DataTable>
        <DataTable.Header>
          <DataTable.Title //Titulo de la columna
            sortDirection={sortColumn === 'name' ? (sortAsc ? 'ascending' : 'descending') : undefined}
            onPress={() => sortBy('name')}
          >
            Nombre
          </DataTable.Title>
          
          <DataTable.Title //Titulo de la columna
            sortDirection={sortColumn === 'email' ? (sortAsc ? 'ascending' : 'descending') : undefined}
            onPress={() => sortBy('email')}
          >
            Email
          </DataTable.Title>
        </DataTable.Header>

        {paginatedUsers.map((user) => ( //Recorre los datos y crea los rows
          <DataTable.Row key={user.id}>
            <DataTable.Cell>{user.name}</DataTable.Cell>
            <DataTable.Cell>{user.email}</DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination  //Maneja la paginacion solo
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
