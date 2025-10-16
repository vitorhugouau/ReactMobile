import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Tab = ({ setTab }) => {
  const exercicios = [
    // { title: "Estilo e Layout", id: 2 },
    // { title: "Props", id: 3 },
    // { title: "Função Pai", id: 4 },
    // { title: "Lista", id: 5 },
    // { title: "Axios", id: 6 },
    { title: "Calculadora", id: 1 },
    { title: "Buscar", id: 7},
    { title: "Veiculos", id: 8},
    { title: "Marvel", id: 9},
    { title: "Navigation", id: 10 },
    { title: "HomeHerois", id: 11 },
  ];

  const [abaAtiva, setAbaAtiva] = useState(1);

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {exercicios.map((exercicio) => (
          <TouchableOpacity
            key={exercicio.id}
            style={[
              styles.tabButton,
              abaAtiva === exercicio.id && styles.activeTab,
            ]}
            onPress={() => {
                setAbaAtiva(exercicio.id);
                setTab(exercicio.title)
            }}
          >
            <Text
              style={[
                styles.tabText,
                abaAtiva === exercicio.id && styles.activeTabText,
              ]}
            >
              {exercicio.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Tab;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f9fa",
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
  },
  tabBar: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  tabButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#eee",
    margin: 4,
  },
  tabText: {
    fontSize: 14,
    color: "#555",
  },
  activeTab: {
    backgroundColor: "#4b7bec",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
