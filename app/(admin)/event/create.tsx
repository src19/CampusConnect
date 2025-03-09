import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView , Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDeleteEvent, useEvent, useInsertEvent, useUpdateEvent } from '@/api/events';
import * as FileSystem from 'expo-file-system';;
import { supabase } from '@/lib/supabase';
import { decode } from 'base64-arraybuffer';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '@/providers/AuthProvider';

const customActiveTintColor = '#ba64d9';


const CreateProductScreen = () => {
    const [clubname, setclubname] = useState('');
    const [eventname, seteventname] = useState('');
    const [venue, setvenuename] = useState('');
    const [description,setdescription] = useState('');
    const [reg_link,setreglink] = useState('');
    const [Errors,setErrors] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [date, setDate] = useState(new Date()); 
    const [mode, setMode] = useState('date');
    const [time, setTime] = useState(date.toLocaleTimeString());
    const [showPicker, setShowPicker] = useState(false); 

    const router = useRouter();
    //const { user } = useAuth();
    // const { currentUserId } = useAuth();

    
    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0]);

    const isupdating = !!id;

    const displayDate = date.toLocaleDateString(); 
    const displayTime = date.toLocaleTimeString(); 

    const { mutate: insertEvent } = useInsertEvent();
    const { mutate: updateEvent } = useUpdateEvent();
    const { data: updatedEvent, isLoading } = useEvent(id);
    const {mutate: deleteEvent} = useDeleteEvent();
    useEffect(() => {
        if(updatedEvent) {
            seteventname(updatedEvent.eventname);
            setclubname(updatedEvent.clubname);
            setvenuename(updatedEvent.venue);
            setdescription(updatedEvent.description);
            setreglink(updatedEvent.reg_link);
            setImage(updatedEvent.image);
        }

    }, [updatedEvent])

    useEffect(() => {
        setTime(date.toLocaleTimeString()); // Update time whenever date changes
      }, [date]);

    const validInput = () => {
        setErrors('');
        if(!eventname) {
            setErrors('Event name is required');
            return false;
        }
        if(!clubname) {
            setErrors('Club name is required');
            return false;
        }
        if(!venue) {
            setErrors('Venue is required');
            return false;
        }
        if(!description){
            setErrors('Description is required');
            return false;
        }
        if(!reg_link){
            setErrors('Registration link is required');
            return false;
        }
        return true;
    };
    const onChange = (event, selectedValue) => {
        const currentDate = selectedValue || date;
        setDate(currentDate);
        setShowPicker(false); 
    };
    const showMode = (currentMode) => {
        setShowPicker(true);
        setMode(currentMode);
    };
        

    const onSubmit = () => {
        if(isupdating){
            onUpdate();
        }
        else{
            onCreate();
        }
    };
    const onDelete = () => {
        deleteEvent(id, {
            onSuccess: () => {
                resetFields();
                router.replace('/(admin)');
            }
        })
    }
    const confirmDelete = async () => {
        // const { data, error } = await supabase
        // .from('events')
        // .select('creator_id')
        // .eq('id', id)
        // .single();

        // if (error || data.creator_id !== currentUserId) {
        //     console.error('Unauthorized to delete this event');
        //     return;
        // }

        Alert.alert("Confirm", "Are you sure you want to delete this event", [
            {
                text: 'Cancel'
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: onDelete,

            }
        ])
    }

    const onUpdate = async () => {
        if(!validInput()) return;
        
        // const { data, error } = await supabase
        // .from('events')
        // .select('creator_id')
        // .eq('id', id)
        // .single();

        // if (error || data.creator_id !== currentUserId) {
        //     console.error('Unauthorized to update this event');
        //     return;
        // }
        //store in database
        const imagePath = await uploadImage();
        console.log("the value of image path is:", imagePath)

        updateEvent({id,eventname,clubname,venue,description,reg_link,date,time,image: imagePath}, {
            onSuccess: () => {
                resetFields();
                router.back();
            }
        }) 
    };

    const onCreate = async () => {
        if(!validInput()) {
            return;
        }

        const imagePath = await uploadImage();
        console.log("the value of image path is:", imagePath)

        insertEvent(
        {eventname, clubname, venue, description, reg_link, date, time,  image: imagePath},
        {
            onSuccess: () => {
                resetFields();
                router.back();
            }
        })
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
    };

    const resetFields = () => {
        setclubname('');
        seteventname('');
        setvenuename('');
        setdescription('');
        setreglink('');
    };

    const uploadImage = async () => {
        if (!image?.startsWith('file://')) {
          return;
        }
      
        const base64 = await FileSystem.readAsStringAsync(image, {
          encoding: 'base64',
        });
        const filePath = `${uuidv4()}.png`;
        const contentType = 'image/png';
        const { data, error } = await supabase.storage
        .from('event-images')
        .upload(filePath, decode(base64), { contentType });

        console.log(error);
          
        if (data) {
          return data.path;
        }
    };

    return (
    <ScrollView>
    <View style={styles.container}>
        <Stack.Screen options={{title: isupdating ? 'Update Event' : 'Create Event'}}/>
        <Image 
        source={{uri: image || 'https://cdn.dribbble.com/users/55871/screenshots/2158022/media/95f08ed3812af28b93fa534fb5d277b3.jpg'}}
        style = {styles.imageplaceholder}
        />
        <Text onPress={pickImage} style = {styles.imgbtn}>Select Image</Text>
        <Text style = {styles.label}>Event Name</Text>
        <TextInput 
            placeholder='Event Name'
            value={eventname}
            onChangeText={seteventname}
            style={styles.input}/>
        <Text style = {styles.label}>Club Name</Text>
        <TextInput 
        placeholder='Club Name' 
        style={styles.input}
        value={clubname}
        onChangeText={setclubname}
        />

        <Text style = {styles.label}>Venue</Text>
        <TextInput 
        placeholder='Venue' 
        style={styles.input}
        value={venue}
        onChangeText={setvenuename}
        />
        <Text style = {styles.label}>Description</Text>
        <TextInput 
        placeholder='Description' 
        style={styles.input}
        value={description}
        onChangeText={setdescription}
        />
        <Text style = {styles.label}>Registration Link</Text>
        <TextInput 
        placeholder='URL' 
        style={styles.input}
        value={reg_link}
        onChangeText={setreglink}
        />
        <Text style = {styles.label}>Date</Text>
        <Text onPress={() => showMode('date')} style={styles.input}>
            {displayDate}
        </Text>
        <Text style = {styles.label}>Time</Text>
        <Text onPress={() => showMode('time')} style={styles.input}>
            {displayTime}
        </Text>
        {showPicker && (
        <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={mode} 
        is24Hour={true} 
        display="default" // Can be "clock" or "spinner" (platform-dependent)
        onChange={onChange}
        />
        )}
        <Text style={{color: 'red'}}>{Errors}</Text>
        <View style={styles.registerview}>
            <TouchableOpacity onPress={onSubmit} style={styles.createbtn}>
                <Text style={styles.btnText}>{isupdating ? 'Update' : 'Post'}</Text>
            </TouchableOpacity>
        </View>
        {isupdating && <Text onPress={confirmDelete} style={styles.deltext}>Delete</Text>}
    </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        padding: 10
    },
    input:{
        backgroundColor: 'white',
        padding: 10,
        borderRadius:5,
        marginBottom:20,
        marginTop:5
    },
    label:{
        color:'grey',
        fontSize:17
    },
    createbtn: {
        backgroundColor: '#ba64d9',
        padding: 15,
        borderRadius: 100,
        width: '70%', // Adjust the width as needed
        alignItems: 'center', 
    },
    btnText: {
        color: '#ffffff', // Text color
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    deltext: {
        color:'red',
        textAlign:'center'
    },
    registerview: {
        padding : 6,
        alignItems: 'center',
        
    },
    imgbtn: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: customActiveTintColor,
        marginVertical: 10
    },
    imageplaceholder: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center'
    }
})

export default CreateProductScreen;