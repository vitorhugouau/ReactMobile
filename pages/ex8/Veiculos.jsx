import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import { cars } from './veiculos_aula';

const Veiculos = () => {
  const [texto, setTexto] = useState('');

  const handleChange = (value) => {
    setTexto(value);
  };

  const filteredVeiculos = cars.filter(linha =>
    linha.model.toLowerCase().includes(texto.toLowerCase()) ||
    linha.brand.toLowerCase().includes(texto.toLowerCase()) ||
    linha.name.toLowerCase().includes(texto.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Procurar"
        value={texto}
        onChangeText={handleChange}
        style={styles.input}
      />

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Model</DataTable.Title>
          <DataTable.Title>Brand</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
        </DataTable.Header>

        {filteredVeiculos.map((linha, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>{linha.model}</DataTable.Cell>
            <DataTable.Cell>{linha.brand}</DataTable.Cell>
            <DataTable.Cell>{linha.name}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#999',
    borderWidth: 1,
    marginBottom: 12,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
});

export default Veiculos;
