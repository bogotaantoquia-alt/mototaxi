import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Conductor() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [celular, setCelular] = useState('');
  const [email, setEmail] = useState('');
  const [dni, setDni] = useState('');
  const [nacionalidad, setNacionalidad] = useState('');
  const [licencia, setLicencia] = useState('');
  const [placa, setPlaca] = useState('');
  const [color, setColor] = useState('');
  const [yape, setYape] = useState('');
  const [paradero, setParadero] = useState('');
  const [tipoConductor, setTipoConductor] = useState('');
  const [password, setPassword] = useState('');

  const registrar = async () => {
    if (!nombre || !celular || !password) {
      Alert.alert('Error', 'Nombre, celular y contrasena son obligatorios');
      return;
    }
    const id = Math.random().toString(36).substring(2) + Date.now().toString(36);
    const { error } = await supabase.from('usuarios').insert([{
      id, nombre, celular, email, dni, nacionalidad,
      tipo: 'conductor', password
    }]);
    if (error) {
      Alert.alert('Error', 'No se pudo registrar: ' + error.message);
    } else {
      Alert.alert('Listo!', 'Registro exitoso', [{ text: 'OK', onPress: () => router.back() }]);
    }
  };

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Text style={styles.titulo}>🏍️ Registro Conductor</Text>
        <TextInput style={styles.input} placeholder="Nombre completo" placeholderTextColor="#999" onChangeText={setNombre} />
        <TextInput style={styles.input} placeholder="Numero de celular" placeholderTextColor="#999" keyboardType="phone-pad" onChangeText={setCelular} />
        <TextInput style={styles.input} placeholder="Correo electronico" placeholderTextColor="#999" keyboardType="email-address" onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Nacionalidad" placeholderTextColor="#999" onChangeText={setNacionalidad} />
        <TextInput style={styles.input} placeholder="Numero de DNI" placeholderTextColor="#999" keyboardType="numeric" onChangeText={setDni} />
        <TextInput style={styles.input} placeholder="Numero de licencia" placeholderTextColor="#999" onChangeText={setLicencia} />
        <TextInput style={styles.input} placeholder="Placa de moto" placeholderTextColor="#999" onChangeText={setPlaca} />
        <TextInput style={styles.input} placeholder="Color de moto" placeholderTextColor="#999" onChangeText={setColor} />
        <Text style={styles.label}>Eres propietario o conductor?</Text>
        <View style={styles.fila}>
          <TouchableOpacity style={[styles.opcion, tipoConductor === 'propietario' && styles.opcionActiva]} onPress={() => setTipoConductor('propietario')}>
            <Text style={styles.opcionTexto}>Propietario</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.opcion, tipoConductor === 'conductor' && styles.opcionActiva]} onPress={() => setTipoConductor('conductor')}>
            <Text style={styles.opcionTexto}>Conductor</Text>
          </TouchableOpacity>
        </View>
        <TextInput style={styles.input} placeholder="Nombre de paradero (opcional)" placeholderTextColor="#999" onChangeText={setParadero} />
        <TextInput style={styles.input} placeholder="Numero Yape" placeholderTextColor="#999" keyboardType="phone-pad" onChangeText={setYape} />
        <TextInput style={styles.input} placeholder="Contrasena" placeholderTextColor="#999" secureTextEntry onChangeText={setPassword} />
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
  container: { alignItems: 'center', padding: 20, paddingTop: 40 },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#FFD700', marginBottom: 30 },
  input: { backgroundColor: '#111', color: '#fff', width: '100%', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#FFD700' },
  label: { color: '#FFD700', fontSize: 16, marginBottom: 10, alignSelf: 'flex-start' },
  fila: { flexDirection: 'row', width: '100%', gap: 10, marginBottom: 15 },
  opcion: { flex: 1, backgroundColor: '#111', padding: 15, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#333' },
  opcionActiva: { borderColor: '#FFD700' },
  opcionTexto: { color: '#fff', fontSize: 15 },
  boton: { backgroundColor: '#FFD700', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center', marginBottom: 15, marginTop: 10 },
  botonTexto: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  volver: { color: '#FFD700', fontSize: 16, marginBottom: 40 },
});
