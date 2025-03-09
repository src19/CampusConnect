import { StyleSheet, Text, View, Image , Pressable} from 'react-native';
import { Link, useSegments } from 'expo-router';
import { Tables } from '@/database.types';
import RemoteImage  from './RemoteImage';

export const defaultImg = 'https://cdn.dribbble.com/users/55871/screenshots/2158022/media/95f08ed3812af28b93fa534fb5d277b3.jpg'

type EventListProps = {
    event: Tables<'events'>;
}

const EventList = ({event}: EventListProps) => {
  const segments = useSegments();
  console.log(segments);
  return (
    <Link href={`/${segments[0]}/event/${event.id}`} asChild>
    <Pressable style={styles.container}>
      <RemoteImage 
      path={event.image}
      fallback={defaultImg}
      style={styles.image} 
      resizeMode='contain'/>
      <View style={styles.content}>
        <Text style={styles.title}>{event.eventname}</Text>
        <Text style={styles.venue}>{event.description}</Text>
      </View>
    </Pressable>
    </Link>
  );
};
export default EventList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff', 
    shadowColor: '#eee', // Adjust shadow color for lighter background
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    padding: 10,
    borderRadius: 10,
    margin: 15,
  },
  content: {
    marginTop: 10, // Space between image and text content
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  venue : {
    fontSize: 15,
    fontWeight: '500',
    marginVertical: 6,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10
  }
});
