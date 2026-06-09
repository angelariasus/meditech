import { useState, useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { api } from '../../services/api';

export default function CitasScreen() {
  const router = useRouter();
  const [citas, setCitas] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCitas = async () => {
    try {
      const response = await api.get('/citas');
      if (response.data.status === 'success') {
        setCitas(response.data.data);
      }
    } catch (error) {
      console.error('Error loading citas', error);
    }
  };

  useEffect(() => {
    fetchCitas();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCitas();
    setRefreshing(false);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-3">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-sky-500 font-bold">{new Date(item.fecha_hora).toLocaleDateString()} {new Date(item.fecha_hora).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
        <View className="bg-emerald-100 px-2 py-1 rounded-md">
          <Text className="text-emerald-700 text-xs font-bold uppercase">{item.estado}</Text>
        </View>
      </View>
      <Text className="text-slate-800 font-bold">Paciente: {item.paciente.nombre} {item.paciente.apellido}</Text>
      <Text className="text-slate-600 text-sm mt-1">Médico: Dra/Dr. {item.medico.nombre} {item.medico.apellido}</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-slate-50 p-4">
      <Text className="text-2xl font-bold text-slate-800 mb-4">Agenda Médica</Text>
      <FlatList
        data={citas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ paddingBottom: 80 }}
        ListEmptyComponent={<Text className="text-center text-slate-500 mt-10">No hay citas registradas</Text>}
      />
      
      <TouchableOpacity 
        onPress={() => router.push('/nueva-cita')}
        className="absolute bottom-6 right-6 w-14 h-14 bg-sky-500 rounded-full flex items-center justify-center shadow-lg shadow-sky-500/50"
      >
        <Text className="text-white text-3xl font-light mb-1">+</Text>
      </TouchableOpacity>
    </View>
  );
}
