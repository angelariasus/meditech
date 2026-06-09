import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { api } from '../../services/api';

export default function NuevaCitaModal() {
  const router = useRouter();
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [medicos, setMedicos] = useState<any[]>([]);
  
  const [selectedPaciente, setSelectedPaciente] = useState<string | null>(null);
  const [selectedMedico, setSelectedMedico] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [pacientesRes, medicosRes] = await Promise.all([
          api.get('/pacientes'),
          api.get('/medicos')
        ]);
        
        if (pacientesRes.data.status === 'success') setPacientes(pacientesRes.data.data);
        if (medicosRes.data.status === 'success') setMedicos(medicosRes.data.data);
      } catch (error) {
        Alert.alert('Error', 'No se pudo cargar la información necesaria');
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async () => {
    if (!selectedPaciente || !selectedMedico) {
      Alert.alert('Incompleto', 'Debes seleccionar un paciente y un médico');
      return;
    }

    setIsSubmitting(true);
    try {
      // Agendar para mañana a las 10am como prueba rápida
      const fecha = new Date();
      fecha.setDate(fecha.getDate() + 1);
      fecha.setHours(10, 0, 0, 0);

      const response = await api.post('/citas', {
        paciente_id: selectedPaciente,
        medico_id: selectedMedico,
        fecha_hora: fecha.toISOString()
      });

      if (response.data.status === 'success') {
        Alert.alert('Éxito', 'La cita fue registrada correctamente', [
          { text: 'OK', onPress: () => router.back() }
        ]);
      }
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Error al guardar la cita');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-50">
        <ActivityIndicator size="large" color="#0ea5e9" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-slate-50 p-4">
      <Text className="text-lg font-bold text-slate-800 mb-2">Selecciona un Paciente</Text>
      <View className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-6">
        {pacientes.map((p) => (
          <TouchableOpacity 
            key={p.id}
            onPress={() => setSelectedPaciente(p.id)}
            className={`p-4 border-b border-slate-100 ${selectedPaciente === p.id ? 'bg-sky-50' : 'bg-white'}`}
          >
            <Text className={`font-medium ${selectedPaciente === p.id ? 'text-sky-700' : 'text-slate-700'}`}>
              {p.nombre} {p.apellido}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text className="text-lg font-bold text-slate-800 mb-2">Selecciona un Médico</Text>
      <View className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-8">
        {medicos.map((m) => (
          <TouchableOpacity 
            key={m.id}
            onPress={() => setSelectedMedico(m.id)}
            className={`p-4 border-b border-slate-100 ${selectedMedico === m.id ? 'bg-sky-50' : 'bg-white'}`}
          >
            <Text className={`font-medium ${selectedMedico === m.id ? 'text-sky-700' : 'text-slate-700'}`}>
              Dra/Dr. {m.nombre} {m.apellido} ({m.especialidad})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        className={`w-full bg-sky-500 py-4 rounded-xl items-center mb-8 ${isSubmitting ? 'opacity-70' : ''}`}
        onPress={handleSave}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-bold text-lg">Confirmar Cita</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
