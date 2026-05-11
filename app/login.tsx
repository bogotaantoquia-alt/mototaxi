import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const router = useRouter();
  const [celular, setCelular] = useState('');
  const [password, setPassword] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const verificarSesion = async () => {
      const sesion = await AsyncStorage.getItem('usuario');
      if (sesion) {
        const usuario = JSON.parse(sesion);
        if (usuario.tipo === 'pasajero') router.replace('/pedir');
        else if (usuario.tipo === 'conductor') router.replace('/conductor-home');
        else if (usuario.tipo === 'admin') router.replace('/admin');
      }
      setCargando(false);
    };
    verificarSesion();
  }, []);

  const ingresar = async () => {
    if (celular === 'admin' && password === 'admin123') {
      await AsyncStorage.setItem('usuario', JSON.stringify({ tipo: 'admin' }));
      router.replace('/admin');
      return;
    }
    setCargando(true);
    const { data, error } = await supabase.from('usuarios').select('*').eq('celular', celular).eq('password', password).single();
    setCargando(false);
    if (error || !data) {
      Alert.alert('Error', 'Celular o contraseña incorrectos');
    } else {
      await AsyncStorage.setItem('usuario', JSON.stringify(data));
      if (data.tipo === 'pasajero') router.replace('/pedir');
      else if (data.tipo === 'conductor') router.replace('/conductor-home');
    }
  };

  if (cargando) return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🏍️ MOTOTAXI EXPRESS</Text>
      <Text style={styles.subtitulo}>Cargando...</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🏍️ MOTOTAXI EXPRESS</Text>
      <Text style={styles.subtitulo}>Iniciar Sesión</Text>
      <TextInput style={styles.input} placeholder="Número de celular" placeholderTextColor="#999" onChangeText={setCelular} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Contraseña" placeholderTextColor="#999" secureTextEntry onChangeText={setPassword} />
      <TouchableOpacity style={styles.boton} onPress={ingresar} disabled={cargando}>
        <Text style={styles.botonTexto}>{cargando ? 'Ingresando...' : 'Ingresar'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.volver}>← Volver al inicio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center', padding: 20 },
  titulo: { fontSize: 26, fontWeight: 'bold', color: '#FFD700', marginBottom: 5 },
  subtitulo: { fontSize: 18, color: '#fff', marginBottom: 30 },
  input: { backgroundColor: '#111', color: '#fff', width: '100%', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#FFD700' },
  boton: { backgroundColor: '#FFD700', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center', marginBottom: 15, marginTop: 10 },
  botonTexto: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  volver: { color: '#FFD700', fontSize: 16 },
});
