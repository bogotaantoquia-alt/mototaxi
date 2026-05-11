import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Pasajero() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [celular, setCelular] = useState('');
  const [email, setEmail] = useState('');
  const [dni, setDni] = useState('');
  const [nacionalidad, setNacionalidad] = useState('');
  const [password, setPassword] = useState('');

  const generarId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

  const registrar = async () => {
    if (!nombre || !celular || !password) {
      Alert.alert('Error', 'Nombre, celular y contraseña son obligatorios');
      return;
    }
    const { error } = await supabase.from('usuarios').insert([{
      id: generarId(),
      nombre, celular, email, dni, nacionalidad,
      tipo: 'pasajero', password
    }]);
    if (error) {
      Alert.alert('Error', 'No se pudo registrar');
    } else {
      Alert.alert('¡Listo!', 'Registro exitoso', [{ text: 'OK', onPress: () => router.back() }]);
    }
  };

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Text style={styles.titulo}>👤 Registro Pasajero</Text>
        <TextInput style={styles.input} placeholder="Nombre completo" placeholderTextColor="#999" onChangeText={setNombre} />
        <TextInput style={styles.input} placeholder="Número de celular" placeholderTextColor="#999" keyboardType="phone-pad" onChangeText={setCelular} />
        <TextInput style={styles.input} placeholder="Correo electrónico" placeholderTextColor="#999" keyboardType="email-address" onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Número de DNI" placeholderTextColor="#999" keyboardType="numeric" onChangeText={setDni} />
        <TextInput style={styles.input} placeholder="Nacionalidad" placeholderTextColor="#999" onChangeText={setNacionalidad} />
        <TextInput style={styles.input} placeholder="Contraseña" placeholderTextColor="#999" secureTextEntry onChangeText={setPassword} />
        <TouchableOpacity style={styles.boton} onPress={registrar}>
          <Text style={styles.botonTexto}>Registrarme</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.volver}>← Volver</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { backgroundColor: '#000' },
  container: { alignItems: 'center', justifyContent: 'center', padding: 20, paddingTop: 40 },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#FFD700', marginBottom: 30 },
  input: { backgroundColor: '#111', color: '#fff', width: '100%', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#FFD700' },
  boton: { backgroundColor: '#FFD700', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center', marginBottom: 15, marginTop: 10 },
  botonTexto: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  volver: { color: '#FFD700', fontSize: 16, marginBottom: 40 },
});
