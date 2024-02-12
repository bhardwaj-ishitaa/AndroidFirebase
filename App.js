import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  NativeModules,
  DeviceEventEmitter,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="CommentScreen" component={CommentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
function Login() {
  const [email, setEmail] = useState('');

  const [error, setError] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    const listener = DeviceEventEmitter.addListener('goToReact', text => {
      navigation.navigate('CommentScreen', {text: text});
    });
    return () => {
      listener.remove();
    };
  }, []);
  const handleOTPLogin = () => {
    if (email.length === 10) {
      auth()
        .signInWithPhoneNumber(`+91 ${email}`)
        .then(res => {
          navigation.navigate('Otp', {otpData: res});
        })
        .catch(error => {
          Alert.alert('Login Failed ');
        });
    } else {
      Alert.alert('Login Failed ');
    }
  };
  const onChangeEmail = text => {
    setEmail(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={email}
        onChangeText={onChangeEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Button title="Verify" onPress={handleOTPLogin} />
    </View>
  );
}
function CommentScreen({route}) {
  const {text} = route.params;
  return (
    <View>
      <Text>Comment Screen</Text>
      <Text>{text}</Text>
    </View>
  );
}
function Otp({route}) {
  const [otp, setOtp] = useState('');
  const {otpData} = route.params;
  const onChangeOtp = text => {
    setOtp(text);
  };
  const handleLogin = () => {
    otpData
      ?.confirm(otp)
      .then(res => {
        NativeModules.CustomActionModules.goToHome();
      })
      .catch(err => {
        Alert.alert('Login Failed ', 'Incorrect Otp');
      });
  };
  return (
    <View>
      <Text>OTP</Text>
      <TextInput
        style={styles.input}
        placeholder="OTP"
        value={otp}
        onChangeText={onChangeOtp}
        keyboardType="numbar-pad"
        autoCapitalize="none"
      />

      <Button title="Verify" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default App;
