import { useState, useEffect } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { api } from '../../services/api';

export default function DashboardScreen() {
  const [stats, setStats] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      const response = await api.get('/dashboard/stats');
      if (response.data.status === 'success') {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Error loading stats', error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchStats();
    setRefreshing(false);
  };

  return (
    <ScrollView 
      className="flex-1 bg-slate-50 p-4"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <Text className="text-2xl font-bold text-slate-800 mb-6">Resumen del Sistema</Text>
      
      <View className="flex-row flex-wrap justify-between">
        <View className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-4 w-[48%]">
          <Text className="text-slate-500 font-medium">Pacientes</Text>
          <Text className="text-3xl font-bold text-sky-500 mt-1">{stats?.totalPacientes ?? '-'}</Text>
        </View>
        <View className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-4 w-[48%]">
          <Text className="text-slate-500 font-medium">Médicos</Text>
          <Text className="text-3xl font-bold text-sky-500 mt-1">{stats?.totalMedicos ?? '-'}</Text>
        </View>
        <View className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-4 w-[48%]">
          <Text className="text-slate-500 font-medium">Citas Hoy</Text>
          <Text className="text-3xl font-bold text-sky-500 mt-1">{stats?.citasHoy ?? '-'}</Text>
        </View>
      </View>

      <Text className="text-xl font-bold text-slate-800 mt-6 mb-4">Actividad Reciente</Text>
      {stats?.actividadReciente?.map((act: any, idx: number) => (
        <View key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-3">
          <Text className="text-slate-800 font-medium">{act.descripcion}</Text>
          <Text className="text-slate-500 text-sm mt-1">{new Date(act.fecha).toLocaleString()}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
