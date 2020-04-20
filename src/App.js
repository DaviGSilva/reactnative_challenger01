import React, { useEffect, useState } from 'react';

import api from './services/api';

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);

      console.log(response.data);
    });
  }, []);

  async function handleLikeRepository(id) {
    const newRepositories = repositories.map((repos) => {
      if (repos.id === id) repos.likes++;

      return repos;
    });

    setRepositories(newRepositories);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />

      <SafeAreaView style={styles.container}>

        <FlatList
          data={repositories}
          keyExtractor={repos => repos.id}
          renderItem={({ item: repos }) => (
            <View style={styles.repositoryContainer}>

              {/* Repository title */}
              <Text style={styles.repository}>
                {repos.title.toString()}
              </Text>

              {/* Repository technologies */}
              <FlatList
                style={styles.techsContainer}
                data={repos.techs}
                keyExtractor={(tech, i) => `${i} - ${tech}`}
                renderItem={({ item }) => (
                  <View style={styles.techsContainer}>
                    <Text style={styles.tech}>
                      {item}
                    </Text>
                  </View>
                )}
              />

              {/* Repository likes */}
              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  testID={`repository-likes-${repos.id}`}
                >
                  {repos.likes} curtida{repos.likes !== 1 ? 's' : ''}
                </Text>
              </View>

              {/* Like the repository */}
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(repos.id)}
                testID={`like-button-${repos.id}`}
              >
                <Text style={styles.buttonText}>
                  Curtir
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },

  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },

  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },

  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },

  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
