import React, { useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TrocaTema() {
    const { toggleTheme, theme } = useTheme()
    
 
    
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: 'transparent' }]}
            onPress={toggleTheme}
        >           
        <MaterialIcons name={theme ==='dark'?'dark-mode':'light-mode'} size={24} color={theme==='dark'?'white':'black'} />
        </TouchableOpacity>
    )
 
    
    
}
const styles = StyleSheet.create({
    button: {
        width:50,
        height:50,
        alignItems:'center',
        justifyContent:"center",
        borderRadius: 30

    },
    texto: { fontSize: 16, fontWeight: 'bold' }
})