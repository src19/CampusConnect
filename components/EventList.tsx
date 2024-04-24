import { StyleSheet, Text, View, Image , Pressable} from 'react-native'; 
import { Event } from '@/types';
import { Link, useSegments } from 'expo-router';
import { Tables } from '@/database.types';
type EventListProps = {
    event: Tables<'events'>;
}

const EventList = ({event}: EventListProps) => {
  const segments = useSegments();
  console.log(segments);
  return (
    <Link href={`/${segments[0]}/event/${event.id}`} asChild>
    <Pressable style={styles.container}>
      <Image source={{uri:event.image || 'https://cdn.dribbble.com/users/55871/screenshots/2158022/media/95f08ed3812af28b93fa534fb5d277b3.jpg'}} style={styles.image} resizeMode='contain'/>
      <Text style={styles.title}>{event.eventname}</Text>
      <Text style={styles.venue}>{event.clubname}</Text>
      <Text style={styles.venue}>{event.venue}</Text>
      <Text style={styles.venue}>{event.date}</Text>
      <Text style={styles.venue}>{event.time}</Text>
    </Pressable>
    </Link>
  );
};
export default EventList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    margin: 15
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
