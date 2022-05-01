import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Game from './components/Game';

export default function App() {
  return (
    <View style={styles.container}>
      <Game randomNumbersCount={6} initialSeconds={10}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 50,
  },
});
