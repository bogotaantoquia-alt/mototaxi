import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { supabase } from '../lib/supabase';

export default function Ruta() {
  const router = useRouter();
  const { viajeId, origenLat, origenLng, origen, destino } = useLocalSearchParams();
  const [ubicacion, setUbicacion] = useState(null);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      const loc = await Location.getCurrentPositionAsync({});
      const conductorLat = loc.coords.latitude;
      const conductorLng = loc.coords.longitude;
      setUbicacion({ latitude: conductorLat, longitude: conductorLng });
      setRegion({
        latitude: (conductorLat + parseFloat(origenLat)) / 2,
        longitude: (conductorLng + parseFloat(origenLng)) / 2,
        latitudeDelta: Math.abs(conductorLat - parseFloat(origenLat)) + 0.01,
        longitudeDelta: Math.abs(conductorLng - parseFloat(origenLng)) + 0.01,
      });
    })();
  }, []);

  const completarViaje = async () => {
    const { error } = await supabase.from('viajes').update({ estado: 'completado' }).eq('id', viajeId);
    if (!error) {
      Alert.alert('Viaje completado!', 'El viaje ha sido completado exitosamente', [
        { text: 'OK', onPress: () => router.replace('/conductor-home') }
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🏍️ Navegando</Text>
      <Text style={styles.info}>📍 Recoge: {origen}</Text>
      <Text style={styles.info}>🏁 Lleva a: {destino}</Text>
      {region && ubicacion && (
        <MapView style={styles.mapa} region={region} showsUserLocation={true}>
          <Marker coordinate={ubicacion} title="Tu ubicacion" pinColor="blue" />
          <Marker coordinate={{ latitude: parseFloat(origenLat), longitude: parseFloat(origenLng) }} title="Pasajero" pinColor="red" />
          <Polyline
            coordinates={[
              ubicacion,
              { latitude: parseFloat(origenLat), longitude: parseFloat(origenLng) }
            ]}
            strokeColor="#FFD700"
            strokeWidth={3}
          />
        </MapView>
      )}
      <TouchableOpacity style={styles.boton} onPress={completarViaje}>
        <Text style={styles.botonTexto}>✅ Completar viaje</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.volver}>← Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  titulo: { fontSize: 18, fontWeight: 'bold', color: '#FFD700', textAlign: 'center', padding: 10 },
  info: { color: '#fff', fontSize: 14, textAlign: 'center', marginBottom: 3 },
  mapa: { flex: 1 },
  boton: { backgroundColor: '#FFD700', padding: 15, margin: 15, borderRadius: 10, alignItems: 'center' },
  botonTexto: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  volver: { color: '#FFD700', fontSize: 16, textAlign: 'center', marginBottom: 15 },
});
