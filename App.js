
import React,{useState, useEffect} from 'react';

import { View,Text } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/auth';



import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

              // redux import

import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducers from './redux/reducers'


import Landing from './components/auth/Landing'

import Register from './components/auth/Register'

import Login from './components/auth/Login'

import Main from './components/Main'

import Add from './components/main/Add'

import Save from './components/main/Save'

import Comment from './components/main/Comment'


const store = createStore(rootReducers, applyMiddleware(thunk));




const firebaseConfig = {
  apiKey: process.env.EXPO_FIREBASE_KEY,
  authDomain: process.env.EXPO_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_FIREBASE_SENDER_ID,
  appId: process.env.EXPO_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_FIREBASE_ME_ID,
  };

  if (firebase.apps && firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
  
  }

  
  
  const Stack = createStackNavigator();

  const App = () => {
    
   const [isLoading, setIsLoading] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  
  useEffect(() => {
    firebase.auth().onAuthStateChanged( user =>{
      if (!user) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    });
  }, []);



    const Loading = () => (
      <View  style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text>Bem vindo!</Text>

      </View>
    );

    const LoggedOut = () =>(
      <NavigationContainer>
      <Stack.Navigator initialRouteName='Landing'>
         <Stack.Screen name="Landing" component={Landing} options={{headerShown:false}} />

          <Stack.Screen name="Register" component={Register} />
           <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>

  </NavigationContainer>

    );

    const LoggedIn = () =>(


       <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Main'>
             <Stack.Screen name="Main" component={Main} options={{headerShown:false}} />

              <Stack.Screen name="Add" component={Add}  />

              <Stack.Screen name="Save" component={Save} />

                <Stack.Screen name="Comment" component={Comment} />

          </Stack.Navigator>

        </NavigationContainer>

      </Provider>

    );

   
    if (isLoading) {
    return <Loading />;
  }
  if (isLoggedIn) {
    return <LoggedIn />;
  }

  return <LoggedOut />;


};
 
export default App;

