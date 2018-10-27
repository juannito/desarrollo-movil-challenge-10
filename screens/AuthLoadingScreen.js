import React from 'react'
import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View, TextInput, Button } from 'react-native'
import { getCurrentUser, db, auth } from '../firebase'

export default class AuthLoadingScreen extends React.Component {
  state = {
    name: null,
  }

  constructor(props) {
    super(props)
    this._bootstrapAsync()
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const { name } = this.state
    const currentUser = await getCurrentUser()

    if (name) {
      this.props.navigation.navigate('App')
    }
  }

  nameInset = async () => {
    const { name } = this.state
    const userId = await auth.currentUser.uid

    db.collection('users')
      .doc(userId)
      .set({
        name: name,
      })
      .then(() => {
        console.warn('Name')
      })

    this._bootstrapAsync()
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
        <TextInput
          style={{ width: 100, height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => this.setState({ name: text })}
        />
        <Button onPress={this.nameInset} title="Grabar" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
