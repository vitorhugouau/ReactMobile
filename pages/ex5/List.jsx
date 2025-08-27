import { FlatList, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import CardPessoa from './../../components/CardPessoa';

const List = () => {
  const pessoas = [
  { id: '1', nome: 'Alice Silva', email: 'alice@gmail.com' },
  { id: '2', nome: 'Bruno Costa', email: 'bruno@hotmail.com' },
  { id: '3', nome: 'Carla Dias', email: 'carla@outlook.com' },
  { id: '4', nome: 'Diego Ramos', email: 'diego@yahoo.com' },
  { id: '5', nome: 'Eduarda Lopes', email: 'eduarda@gmail.com' },
];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={pessoas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardPessoa nome={item.nome} email={item.email} />
        )}
      />
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: StatusBar.currentHeight || 20,
  },
});