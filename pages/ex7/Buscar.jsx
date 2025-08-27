import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { api } from '../../api';

const Buscar = () => {
  const [inputId, setInputId] = useState('');
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBuscar = async () => {
    Keyboard.dismiss();
    const id = parseInt(inputId);
    if (isNaN(id) || id < 1 || id > 100) {
      setError('Digite um número entre 1 e 100');
      setPost(null);
      setComments([]);
      return;
    }

    setLoading(true);
    setError('');
    setPost(null);
    setComments([]);

    try {
      const postResponse = await api.get(`posts/${id}`);
      const commentsResponse = await api.get(`posts/${id}/comments`);

      if (!postResponse || Object.keys(postResponse).length === 0) {
        setError('Post não encontrado.');
      } else {
        setPost(postResponse);
        setComments(commentsResponse);
      }
    } catch (_err) {
      setError('Erro ao buscar post.');
    } finally {
      setLoading(false);
    }
  };


  //   useEffect(() => {
  //   fetch('https://jsonplaceholder.typicode.com/posts/100')
  //     .then(res => res.json())
  //     .then(data => console.log('Teste fetch:', data))
  //     .catch(err => console.log('Erro fetch:', err));
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Buscar Post por ID</Text>

        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          placeholder="Digite um ID entre 1 e 100"
          value={inputId}
          onChangeText={setInputId}
          maxLength={3}
        />

        {error !== '' && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleBuscar}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>BUSCAR</Text>
          )}
        </TouchableOpacity>

        {post && (
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.postTitle}>{post.title}</Title>
              <Paragraph>{post.body}</Paragraph>
            </Card.Content>
          </Card>
        )}

        {comments.length > 0 && (
          <View style={styles.commentsContainer}>
            <Text style={styles.commentsTitle}>Comentários</Text>
            {comments.map((comment) => (
              <Card key={comment.id} style={styles.commentCard}>
                <Card.Content>
                  <Text style={styles.commentName}>{comment.name}</Text>
                  <Text style={styles.commentBody}>{comment.body}</Text>
                  <Text style={styles.commentEmail}>{comment.email}</Text>
                </Card.Content>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Buscar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1C1C1E',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonDisabled: {
    backgroundColor: '#A0CFFF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  commentsContainer: {
    marginTop: 10,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#1C1C1C',
  },
  commentCard: {
    marginBottom: 12,
    paddingHorizontal: 6,
    backgroundColor: '#FFF',
    elevation: 2,
    borderRadius: 10,
  },
  commentName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  commentBody: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  commentEmail: {
    fontSize: 12,
    color: '#888',
  },
});
