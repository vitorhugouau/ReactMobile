/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import md5 from "md5";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Card, PaperProvider } from "react-native-paper";

const PUBLIC_KEY = "9703e3a13f19abc0c9a8b8a27656e7eb";
const PRIVATE_KEY = "672a26aade3ebb4c5a22371303ff5b0305ebd02f";
const TS = "1";
const HASH = md5(TS + PRIVATE_KEY + PUBLIC_KEY);

const DetalhesHerois = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // Protege contra params indefinido
  const id = route?.params?.id;

  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHeroDetails = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://gateway.marvel.com/v1/public/characters/${id}`,
        {
          params: {
            ts: TS,
            apikey: PUBLIC_KEY,
            hash: HASH,
          },
        }
      );
      setHero(response.data.data.results[0]);
    } catch (err) {
      setError("Erro ao carregar detalhes do herói.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Params recebidos:", route.params);
    fetchHeroDetails();
  }, [id]);

  return (
    <PaperProvider>
      <View style={styles.container}>
        {!id && (
          <Text style={styles.error}>
            Nenhum herói selecionado. Volte e escolha um herói.
          </Text>
        )}

        {loading && (
          <ActivityIndicator
            animating
            size="large"
            color="#E62429"
            style={{ marginTop: 20 }}
          />
        )}

        {error && <Text style={styles.error}>{error}</Text>}

        {!loading && hero && (
          <ScrollView>
            <Card style={styles.card} mode="elevated">
              <Image
                source={{
                  uri: `${hero.thumbnail.path}.${hero.thumbnail.extension}`,
                }}
                style={styles.image}
              />

              <Card.Content>
                <Text style={styles.name}>{hero.name}</Text>
                <Text style={styles.description}>
                  {hero.description
                    ? hero.description
                    : "Sem descrição disponível."}
                </Text>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Quadrinhos:</Text>
                  <Text style={styles.sectionText}>
                    {hero.comics.available > 0
                      ? `${hero.comics.available} quadrinhos`
                      : "Nenhum quadrinho encontrado"}
                  </Text>
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Séries:</Text>
                  <Text style={styles.sectionText}>
                    {hero.series.available > 0
                      ? `${hero.series.available} séries`
                      : "Nenhuma série encontrada"}
                  </Text>
                </View>

                <Button
                  mode="contained"
                  onPress={() => navigation.goBack()}
                  style={styles.button}
                  labelStyle={{ color: "#fff", fontWeight: "600" }}
                >
                  Voltar
                </Button>
              </Card.Content>
            </Card>
          </ScrollView>
        )}
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 15,
  },
  error: {
    color: "#E62429",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#1E1E1E",
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#E62429",
    shadowColor: "#E62429",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  image: {
    height: 340,
    width: "100%",
  },
  name: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
    marginVertical: 15,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  description: {
    color: "#ccc",
    fontSize: 16,
    lineHeight: 22,
    textAlign: "justify",
    marginBottom: 25,
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    color: "#E62429",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  sectionText: {
    color: "#ddd",
    fontSize: 15.5,
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#E62429",
    borderRadius: 25,
    marginTop: 25,
    paddingVertical: 10,
    shadowColor: "#E62429",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 6,
  },
});


export default DetalhesHerois;
