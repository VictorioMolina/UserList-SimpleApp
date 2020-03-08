import 'react-native-gesture-handler';
import React from 'react'
import { View } from 'react-native';
import { createAppContainer } from 'react-navigation'
import { FluidNavigator } from 'react-navigation-fluid-transitions'

// Screens
import UserList from './screens/UserList'
import UserDetails from './screens/UserDetails'

// Disable YellowBox
console.disableYellowBox = true

const AppContainer = createAppContainer(
  FluidNavigator(
    {
      UserList: {
        screen: UserList
      },
      UserDetails: {
        screen: UserDetails
      }
    },
    {
      initialRouteName: 'UserList'
    }
  )
);

function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <AppContainer />
    </View>
  )
}

export default App;