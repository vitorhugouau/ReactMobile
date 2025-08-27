import { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { api } from './../../api';

const PROFILE_PIC = "https://randomuser.me/api/portraits/men/1.jpg";

const Axios = () => {
  const [posts, setPosts] = useState([]);

  const getRandomTimeAgo = () => {
    const units = [
      { label: 'min', max: 60 },
      { label: 'h', max: 24 },
      { label: 'dias', max: 7 },
    ];

    const unit = units[Math.floor(Math.random() * units.length)];
    const value = Math.floor(Math.random() * unit.max) + 1;

    return `${value} ${unit.label} atrás`;
  };
  
  const getPosts = async () => {
    try {
      const posts = await api.get("/posts");
      setPosts(posts);
    } catch (e) {
      console.log("Erro ao buscar posts: ", e);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {posts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <Image source={{ uri: PROFILE_PIC }} style={styles.profilePic} />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>Usuário Exemplo</Text>
                <Text style={styles.postTime}>{getRandomTimeAgo()}</Text>
              </View>
            </View>

            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postBody} numberOfLines={3} ellipsizeMode="tail">
              {post.body}
            </Text>

            <Image
              source={{ uri: "https://picsum.photos/400/200?random=" + post.id }}
              style={styles.postImage}
              resizeMode="cover"
            />

            <View style={styles.postFooter}>
              <TouchableOpacity style={styles.footerButton}>
                <Text style={styles.footerButtonText}>Curtir</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerButton}>
                <Text style={styles.footerButtonText}>Comentar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerButton}>
                <Text style={styles.footerButtonText}>Compartilhar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Axios;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e9ebee" },
  scrollContent: { padding: 10, paddingBottom: 30 },
  postCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
  },
  userInfo: {
    marginLeft: 10,
  },
  userName: {
    fontWeight: "700",
    fontSize: 16,
    color: "#333",
  },
  postTime: {
    fontSize: 12,
    color: "#666",
  },
  postTitle: {
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 5,
    color: "#222",
  },
  postBody: {
    fontSize: 14,
    color: "#444",
    marginBottom: 10,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 8,
  },
  footerButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  footerButtonText: {
    color: "#1877f2",
    fontWeight: "600",
  },
});