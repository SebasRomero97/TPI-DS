import React, { useState } from 'react';
import { View } from 'react-native';
import { DataTable, TextInput } from 'react-native-paper';
import { useSortedData } from './useSortDataForDataTable';



const initialValues = [
{"DNI":56777994,
  "Nombre":"Sig Saddington",
  "Edad":83,
  "Sexo":"Male",
  "Medicamento":"Ipratropio",
  "Dosis":927,
  "ViaDeAdministracion":"Subcutánea",
  "Fecha":"20-05-2024",
  "Comentarios":"Vivamus vestibulum sagittis sapien."},
];

  
type User = {
  DNI: number,
  Nombre: string,
  Edad: number,
  Sexo: string,
  Medicamento: string,
  Dosis: number,
  ViaDeAdministracion: string,
  Fecha: string,
  Comentarios: string
};

interface Props {
  items?: User[];
}

const BasicTableDosis = ({ items = initialValues }: Props) => {
  const [search, setSearch] = useState('');
  const [sortColumn, setSortColumn] = useState<'DNI' | 'Nombre' | 'Edad' | 'Sexo' | 'Medicamento' | 'Dosis' | 'ViaDeAdministracion' | 'Fecha' | 'Comentarios' | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(0);
  const [bandera, setBandera] = useState(true)
  const itemsPerPage = 8; 

   
  const filteredUsers = items.filter((user) =>
    `${user.DNI} ${user.Nombre} ${user.Edad} ${user.Sexo} ${user.Medicamento} ${user.Dosis} ${user.ViaDeAdministracion} ${user.Fecha} ${user.Comentarios}`.toLowerCase().includes(search.toLowerCase())
  );

   
  const sortedUsers = useSortedData(filteredUsers, sortColumn, sortAsc);

  
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, sortedUsers.length);
  const paginatedUsers = sortedUsers.slice(from, to);

  const sortBy = (column: 'DNI' | 'Nombre' | 'Edad' | 'Sexo' | 'Medicamento' | 'Dosis' | 'ViaDeAdministracion' | 'Fecha' | 'Comentarios') => {
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
            sortDirection={sortColumn === 'DNI' ? (sortAsc ? 'ascending' : 'descending') : (bandera ? 'descending' : undefined)}
            onPress={() => sortBy('DNI')}
          >
            DNI
          </DataTable.Title>
          
          <DataTable.Title 
            sortDirection={sortColumn === 'Nombre' ? (sortAsc ? 'ascending' : 'descending') : undefined}
            onPress={() => sortBy('Nombre')}
          >
            Nombre
          </DataTable.Title>

          <DataTable.Title 
            sortDirection={sortColumn === 'Edad' ? (sortAsc ? 'ascending' : 'descending') : undefined}
            onPress={() => sortBy('Edad')}
          >
            Edad
          </DataTable.Title>

          <DataTable.Title 
            sortDirection={sortColumn === 'Sexo' ? (sortAsc ? 'ascending' : 'descending') : undefined}
            onPress={() => sortBy('Sexo')}
          >
            Sexo
          </DataTable.Title>

          <DataTable.Title 
            sortDirection={sortColumn === 'Medicamento' ? (sortAsc ? 'ascending' : 'descending') : undefined}
            onPress={() => sortBy('Medicamento')}
          >
            Medicamento
          </DataTable.Title>

          <DataTable.Title 
            sortDirection={sortColumn === 'Dosis' ? (sortAsc ? 'ascending' : 'descending') : undefined}
            onPress={() => sortBy('Dosis')}
          >
            Dosis(mg)
          </DataTable.Title>

          <DataTable.Title 
            sortDirection={sortColumn === 'ViaDeAdministracion' ? (sortAsc ? 'ascending' : 'descending') : undefined}
            onPress={() => sortBy('ViaDeAdministracion')}
          >
            Via de Administracion
          </DataTable.Title>

          <DataTable.Title 
            sortDirection={sortColumn === 'Fecha' ? (sortAsc ? 'ascending' : 'descending') : undefined}
            onPress={() => sortBy('Fecha')}
          >
            Fecha
          </DataTable.Title>

          <DataTable.Title 
            sortDirection={sortColumn === 'Comentarios' ? (sortAsc ? 'ascending' : 'descending') : undefined}
            onPress={() => sortBy('Comentarios')}
          >
            Comentarios
          </DataTable.Title>

        </DataTable.Header>
        {paginatedUsers.map((user) => ( 
          <DataTable.Row key={user.DNI}>
            <DataTable.Cell>{user.DNI}</DataTable.Cell>
            <DataTable.Cell>{user.Nombre}</DataTable.Cell>
            <DataTable.Cell>{user.Edad}</DataTable.Cell>
            <DataTable.Cell>{user.Sexo}</DataTable.Cell>
            <DataTable.Cell>{user.Medicamento}</DataTable.Cell>
            <DataTable.Cell>{user.Dosis}</DataTable.Cell>
            <DataTable.Cell>{user.ViaDeAdministracion}</DataTable.Cell>
            <DataTable.Cell>{user.Fecha}</DataTable.Cell>
            <DataTable.Cell>{user.Comentarios}</DataTable.Cell>
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

export default BasicTableDosis;


