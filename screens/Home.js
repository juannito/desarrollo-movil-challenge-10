import React from 'react'
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native'
import { filter, has } from 'lodash'
import Artista from '../components/Artista'

import { setArtistAsFavorite, favoritesCollection } from './../firebase/artists'
import { getCurrentUser } from '../firebase'

import artistas from '../artists'

import { Notifications } from 'expo'

class HomeScreen extends React.Component {
  state = {
    result: null,
    favoritos: {},
  }

  componentDidMount() {
    getCurrentUser().then(currentUser => this.setState({ currentUser }))

    this.unsubscribeFavoritesListener = favoritesCollection.onSnapshot(querySnapshot => {
      const favoritos = {}
      querySnapshot.forEach(function(doc) {
        favoritos[doc.id] = doc.data()
      })
      this.setState({ favoritos })
    })
  }

  componentWillUnmount() {
    this.unsubscribeFavoritesListener()
  }

  handleFavoriteButtonPress = artist => {
    const { favoritos, currentUser } = this.state

    const artistaFavorito = favoritos[artist.nombre]
    const eraFavorito = currentUser && artistaFavorito && artistaFavorito[currentUser.uid]

    setArtistAsFavorite(artist.nombre, !eraFavorito)
  }

  render() {
    const { loggedIn, favoritos, currentUser } = this.state
    const userId = currentUser ? currentUser.uid : null

    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          {artistas &&
            artistas.map(artist => (
              <Artista
                artista={artist}
                key={artist.nombre}
                esFavorito={favoritos[artist.nombre] && favoritos[artist.nombre][userId]}
                onFavoriteButtonPress={() => this.handleFavoriteButtonPress(artist)}
              />
            ))}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    minHeight: 45,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#000000C0',
  },

  scrollView: {
    flex: 1,
    width: '100%',
  },

  scrollViewContent: {
    alignItems: 'center',
    paddingTop: 20,
  },
})

export default HomeScreen
