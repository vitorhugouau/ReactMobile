import { StyleSheet, View } from "react-native";

const Quadrado = ({ color, width }) => {
  const styles = StyleSheet.create({
    quadrado: {
      backgroundColor: color,
      width: '100%',
      height: width,
    }
  });

  return (
    <View style={styles.quadrado} />
  );
};

export default Quadrado;