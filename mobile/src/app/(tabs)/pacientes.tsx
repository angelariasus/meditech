import { useState, useEffect } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { api } from '../../services/api';

export default function PacientesScreen() {
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPacientes = async () => {
    try {
      const response = await api.get('/pacientes');
      if (response.data.status === 'success') {
        setPacientes(response.data.data);
      }
    } catch (error) {
      console.error('Error loading pacientes', error);
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPacientes();
    setRefreshing(false);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-3 flex-row items-center">
      <View className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mr-4">
        <Text className="text-sky-500 font-bold text-lg">{item.nombre.charAt(0)}{item.apellido.charAt(0)}</Text>
      </View>
      <View>
        <Text className="text-slate-800 font-bold text-lg">{item.nombre} {item.apellido}</Text>
        <Text className="text-slate-500 text-sm">DNI: {item.dni} | {item.email}</Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-slate-50 p-4">
      <Text className="text-2xl font-bold text-slate-800 mb-4">Directorio de Pacientes</Text>
      <FlatList
        data={pacientes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
