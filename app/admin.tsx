import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function Admin() {
  const router = useRouter();
  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Text style={styles.titulo}>👑 Panel Administrador</Text>
        <Text style={styles.subtitulo}>MOTOTAXI EXPRESS</Text>

        <View style={styles.fila}>
          <View style={styles.tarjeta}>
            <Text style={styles.numero}>0</Text>
            <Text style={styles.etiqueta}>👤 Pasajeros</Text>
          </View>
          <View style={styles.tarjeta}>
            <Text style={styles.numero}>0</Text>
            <Text style={styles.etiqueta}>🏍️ Conductores</Text>
          </View>
        </View>

        <View style={styles.fila}>
          <View style={styles.tarjeta}>
            <Text style={styles.numero}>0</Text>
            <Text style={styles.etiqueta}>🟢 Activos</Text>
          </View>
          <View style={styles.tarjeta}>
            <Text style={styles.numero}>0</Text>
            <Text style={styles.etiqueta}>🚗 Viajes hoy</Text>
          </View>
        </View>

        <View style={styles.tarjetaGrande}>
          <Text style={styles.ganancia}>S/ 0.00</Text>
          <Text style={styles.etiqueta}>💰 Ganancias del día</Text>
        </View>

        <TouchableOpacity style={styles.boton}>
          <Text style={styles.botonTexto}>👥 Ver todos los pasajeros</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boton}>
          <Text style={styles.botonTexto}>🏍️ Ver todos los conductores</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boton}>
          <Text style={styles.botonTexto}>🚗 Ver todos los viajes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botonRojo}>
          <Text style={styles.botonTexto}>🔒 Bloquear usuario</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.volver}>← Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { backgroundColor: '#000' },
  container: { alignItems: 'center', padding: 20, paddingTop: 40 },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#FFD700', marginBottom: 5 },
  subtitulo: { fontSize: 14, color: '#fff', marginBottom: 30 },
  fila: { flexDirection: 'row', width: '100%', gap: 10, marginBottom: 10 },
  tarjeta: { flex: 1, backgroundColor: '#111', padding: 20, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#FFD700' },
  tarjetaGrande: { backgroundColor: '#111', padding: 20, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#FFD700', width: '100%', marginBottom: 10 },
  numero: { fontSize: 32, fontWeight: 'bold', color: '#FFD700' },
  ganancia: { fontSize: 36, fontWeight: 'bold', color: '#FFD700' },
  etiqueta: { fontSize: 14, color: '#fff', marginTop: 5 },
  boton: { backgroundColor: '#111', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center', marginBottom: 10, borderWidth: 1, borderColor: '#FFD700' },
  botonRojo: { backgroundColor: '#111', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: '#ff4444' },
  botonTexto: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  volver: { color: '#FFD700', fontSize: 16, marginBottom: 40 },
});
