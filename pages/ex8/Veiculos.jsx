import { View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { cars } from "./veiculos_aula"

const Veiculos = () => {

    // const carros = veiculos.map(linha => {
    //     return <Text key={linha.model}> {linha.name} </Text>
    // })

    const filteredVeiculos = cars

    return (
        <View>
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
    )
}

export default Veiculos;