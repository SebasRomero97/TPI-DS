import React, { useState } from 'react';
import { DataTable } from 'react-native-paper';

const initialUsers = [
  { id: '1', name: 'Juan', email: 'juan@test.com' },
  { id: '2', name: 'María', email: 'maria@test.com' },
  { id: '3', name: 'Pedro', email: 'pedro@test.com' },
  { id: '4', name: 'Ana', email: 'ana@test.com' },
  { id: '5', name: 'Luis', email: 'luis@test.com' },
  { id: '6', name: 'Carla', email: 'carla@test.com' },
  { id: '7', name: 'Miguel', email: 'miguel@test.com' },
  { id: '8', name: 'Sofía', email: 'sofia@test.com' },
];
type User = {
  id: string,
  name: string,
  email: string
}
interface Props {
  items?: User[]
}

const BasicTable = ({items = initialUsers}:Props) => {

  const [users, setUsers] = useState(items);
  const [sortColumn, setSortColumn] = useState<'name' | 'email' | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  // 📌 Paginación
  const [page, setPage] = useState(0);
  const itemsPerPage = 3;
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, users.length);

  const sortBy = (column: 'name' | 'email') => {
    let sorted = [...users].sort((a, b) =>
      sortAsc
        ? a[column].localeCompare(b[column])
        : b[column].localeCompare(a[column])
    );
    setUsers(sorted);
    setSortAsc(sortColumn === column ? !sortAsc : true);
    setSortColumn(column);
  };

  return (
    <DataTable>
      {/* Header */}
      <DataTable.Header>
        <DataTable.Title
          sortDirection={sortColumn === 'name' ? (sortAsc ? 'ascending' : 'descending') : undefined}
          onPress={() => sortBy('name')}
        >
          Nombre
        </DataTable.Title>
        <DataTable.Title
          sortDirection={sortColumn === 'email' ? (sortAsc ? 'ascending' : 'descending') : undefined}
          onPress={() => sortBy('email')}
        >
          Email
        </DataTable.Title>
      </DataTable.Header>

      {/* Rows con paginación */}
      {users.slice(from, to).map((user) => (
        <DataTable.Row key={user.id}>
          <DataTable.Cell>{user.name}</DataTable.Cell>
          <DataTable.Cell>{user.email}</DataTable.Cell>
        </DataTable.Row>
      ))}

      {/* Footer con paginación */}
      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(users.length / itemsPerPage)}
        onPageChange={setPage}
        label={`${from + 1}-${to} de ${users.length}`}
        showFastPaginationControls
      />
    </DataTable>
  );
}

export default BasicTable