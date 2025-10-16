import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
            activeOpacity={0.8}
            style={[
              styles.tabButton,
              abaAtiva === exercicio.id && styles.activeTab,
              { shadowOpacity: abaAtiva === exercicio.id ? 0.25 : 0.1 },
            ]}
            onPress={() => {
              setAbaAtiva(exercicio.id);
              setTab(exercicio.title);
            }}
          >
            <Ionicons
              name={exercicio.icon}
              size={18}
              color={abaAtiva === exercicio.id ? "#fff" : "#4b7bec"}
              style={{ marginBottom: 2 }}
            />
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
    backgroundColor: "#f2f4f7",
    paddingVertical: 10,
  },
  tabBar: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 8,
    gap: 10,
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    margin: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
    transition: "all 0.2s ease",
  },
  tabText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4b7bec",
  },
  activeTab: {
    backgroundColor: "#4b7bec",
    shadowColor: "#4b7bec",
    elevation: 5,
  },
  activeTabText: {
    color: "#fff",
  },
});
