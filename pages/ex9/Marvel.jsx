import axios from "axios";
import md5 from "md5";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  Button,
  Card,
  PaperProvider,
  Paragraph,
  Title,
} from "react-native-paper";

import { LinearGradient } from "expo-linear-gradient";

const PUBLIC_KEY = "9703e3a13f19abc0c9a8b8a27656e7eb";
const PRIVATE_KEY = "672a26aade3ebb4c5a22371303ff5b0305ebd02f";
const TS = "1";
const HASH = md5(TS + PRIVATE_KEY + PUBLIC_KEY);

const MarvelList = () => {
  const [heroes, setHeroes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHeroes = async (name) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "https://gateway.marvel.com/v1/public/characters",
        {
          params: {
            ts: TS,
            apikey: PUBLIC_KEY,
            hash: HASH,
            ...(name ? { nameStartsWith: name } : { limit: 20 }),
          },
        }
      );

      setHeroes(response.data.data.results);
    } catch (err) {
      setError("Erro ao carregar heróis.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

  return (
    <PaperProvider>
      <LinearGradient colors={["#200122", "#6f0000"]} style={styles.container}>
        <Text style={styles.header}>Marvel Heroes</Text>

        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Digite o nome do herói"
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={() => fetchHeroes(search)}
            style={styles.button}
            labelStyle={{ color: "#fff", fontWeight: "700" }}
          >
            Buscar
          </Button>
        </View>

        {loading && (
          <ActivityIndicator
            animating
            size="large"
            color="#E62429"
            style={{ marginTop: 20 }}
          />
        )}
        {error && <Text style={styles.error}>{error}</Text>}
        {!loading && !error && heroes.length === 0 && (
          <Text style={styles.empty}>Nenhum herói encontrado.</Text>
        )}

        <FlatList
          data={heroes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card style={styles.card} mode="elevated">
              <Card.Cover
                source={{
                  uri: `${item.thumbnail.path}.${item.thumbnail.extension}`,
                }}
                style={styles.cardImage}
              />
              <LinearGradient
                colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.9)"]}
                style={styles.overlay}
              >
                <Card.Content>
                  <Title style={styles.cardTitle}>{item.name}</Title>
                  <Paragraph style={styles.cardText}>
                    {item.description ? item.description : "Sem descrição"}
                  </Paragraph>
                </Card.Content>
              </LinearGradient>
            </Card>
          )}
        />
      </LinearGradient>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 20,
    color: "#fff",
    textTransform: "uppercase",
    letterSpacing: 3,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    color: "#fff",
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E62429",
  },
  button: {
    justifyContent: "center",
    backgroundColor: "#E62429",
    borderRadius: 25,
    paddingHorizontal: 20,
    shadowColor: "#E62429",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 6,
  },
  card: {
    marginBottom: 20,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#1E1E1E",
    elevation: 6,
    borderWidth: 1,
    borderColor: "#E62429",
  },
  cardImage: {
    height: 240,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
    letterSpacing: 1,
  },
  cardText: {
    color: "#ddd",
    marginTop: 6,
    lineHeight: 20,
  },
  error: {
    color: "#E62429",
    textAlign: "center",
    marginTop: 20,
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#aaa",
  },
});

export default MarvelList;
