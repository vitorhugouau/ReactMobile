import { StyleSheet, View } from "react-native";
import Quadrado from './../../components/Quadrado';

const Props = () => {
  return (
    <View style={styles.container}>
      <Quadrado color='red' width={200} />
      <Quadrado color='black' width={100} />
      <Quadrado color='purple' width={300} />
      <Quadrado color='orange' width={100} />
    </View>
  )
};

export default Props;

const styles = StyleSheet.create({
  container: {
    flex: '1',
    flexDirection: 'column',
    width: '100%'
  }
})