import { Pressable, View, StyleSheet, Platform } from "react-native";
import {Ionicons} from '@expo/vector-icons'
function IconButton({name, color , size , onPress}){
    return(
        <Pressable onPress={onPress} style={({pressed}) => pressed ? styles.buttonPressed : null}>
            <Ionicons name={name} size={size} color={color} />
        </Pressable>
    )
}

export default IconButton;

const styles = StyleSheet.create({
    buttonPressed:{
        opacity:0.5
    }
})