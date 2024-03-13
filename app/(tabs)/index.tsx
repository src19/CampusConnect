import { StyleSheet, Text, View, Image} from 'react-native'; 
import events from '@/assets/data/events';

const event = events[0];
export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Image source={{uri:event.image}} style={styles.image}/>
      <Text style={styles.title}>{event.clubname}</Text>
      <Text style={styles.venue}>{event.venue}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  venue : {
    fontSize: 15,
    fontWeight: '500',
    marginVertical: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  image: {
    width: '100%',
    aspectRatio: 1
  }
});
