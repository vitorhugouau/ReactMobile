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
  },
  card: {
    backgroundColor: "#1E1E1E",
    borderRadius: 16,
    overflow: "hidden",
  },
  image: {
    height: 350,
    width: "100%",
  },
  name: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
  description: {
    color: "#bbb",
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 22,
    textAlign: "justify",
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    color: "#E62429",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  sectionText: {
    color: "#ccc",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#E62429",
    borderRadius: 12,
    marginTop: 20,
  },
});

export default DetalhesHerois;
