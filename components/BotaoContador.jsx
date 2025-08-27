import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const BotaoContador = ({ text, setText }) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.button} onPress={setText}>
        <Text style={styles.buttonText}>Clique aqui</Text>
      </TouchableOpacity>
      <Text style={styles.counterText}>Contador: {text}</Text>
    </View>
  );
};

export default BotaoContador;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    gap: 20,
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  counterText: {
    fontSize: 20,
    color: '#333',
    marginTop: 10,
  },
});
