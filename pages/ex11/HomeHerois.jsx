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

const PUBLIC_KEY = "9703e3a13f19abc0c9a8b8a27656e7eb";
const PRIVATE_KEY = "672a26aade3ebb4c5a22371303ff5b0305ebd02f";
const TS = "1";
const HASH = md5(TS + PRIVATE_KEY + PUBLIC_KEY);

const HomeHerois = ({ navigation }) => {
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

    const handleSeeDetails = (id) => {
        navigation.navigate('Details', { id: id });
    };

    useEffect(() => {
        fetchHeroes();
    }, []);

    return (
        <PaperProvider>
            <View style={styles.container}>
                <Text style={styles.header}>Marvel</Text>

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
                        labelStyle={{ color: "#fff", fontWeight: "600" }}
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
                            <Card.Content>
                                <Title style={styles.cardTitle}>{item.name}</Title>
                                <Paragraph style={styles.cardText}>
                                    {item.description ? item.description : "Sem descrição"}
                                </Paragraph>
                            </Card.Content>
                            <Button onPress={() => handleSeeDetails(item.id.toString())} style={styles.buttonCards}>
                                <Text style={styles.buttonCardsColor}>
                                    Ver Detalhes
                                </Text>
                            </Button>
                        </Card>
                    )}
                />
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "#121212",
    },
    header: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#fff",
        letterSpacing: 1,
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
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#333",
    },
    button: {
        justifyContent: "center",
        backgroundColor: "#E62429",
        borderRadius: 12,
        paddingHorizontal: 10,
    },
    card: {
        marginBottom: 15,
        borderRadius: 16,
        overflow: "hidden",
        backgroundColor: "#1E1E1E",
        elevation: 4,
    },
    cardImage: {
        height: 200,
    },
    cardTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
    },
    cardText: {
        color: "#bbb",
        marginTop: 5,
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
    buttonCards: {
        marginTop: 10,
        backgroundColor: "#E62429",
        borderRadius: 8,
        marginBottom: 10,
    },
    buttonCardsColor: {
        color: "#fff",
    }
});

export default HomeHerois;