import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

export default function Mapa() {
  const router = useRouter();
  const [ubicacion, setUbicacion] = useState({
    latitude: -7.4005,
    longitude: -79.5042,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Necesitamos acceso a tu ubicación');
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setUbicacion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🏍️ MOTOTAXI EXPRESS</Text>
      <MapView style={styles.mapa} region={ubicacion} showsUserLocation={true} showsMyLocationButton={true}>
        <Marker coordinate={{ latitude: ubicacion.latitude, longitude: ubicacion.longitude }} title="Tu ubicación" description="Estás aquí" />
      </MapView>
      <TouchableOpacity style={styles.boton}>
        <Text style={styles.botonTexto}>🏍️ Pedir Mototaxi</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.volver}>← Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  titulo: { fontSize: 18, fontWeight: 'bold', color: '#FFD700', textAlign: 'center', padding: 15 },
  mapa: { flex: 1 },
  boton: { backgroundColor: '#FFD700', padding: 15, margin: 15, borderRadius: 10, alignItems: 'center' },
  botonTexto: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  volver: { color: '#FFD700', fontSize: 16, textAlign: 'center', marginBottom: 15 },
});
