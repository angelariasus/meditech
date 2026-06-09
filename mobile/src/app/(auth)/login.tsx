import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa tu correo y contraseña');
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.status === 'success') {
        const { token, refreshToken } = response.data.data;
        await signIn(token, refreshToken);
      } else {
        Alert.alert('Error', response.data.message || 'Error al iniciar sesión');
      }
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Error de conexión con el servidor');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-slate-50 px-6">
      <View className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
        <View className="mb-8 items-center">
          <View className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mb-4">
            <Text className="text-sky-500 text-3xl font-bold">+</Text>
          </View>
          <Text className="text-2xl font-bold text-slate-800 text-center">Bienvenido a Meditech</Text>
          <Text className="text-slate-500 text-center mt-2">Ingresa tus credenciales para continuar</Text>
        </View>

        <View className="space-y-4">
          <View>
            <Text className="text-sm font-medium text-slate-700 mb-1">Correo Electrónico</Text>
            <TextInput
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800"
              placeholder="tu@correo.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              editable={!isLoading}
            />
          </View>

          <View className="mt-4">
            <Text className="text-sm font-medium text-slate-700 mb-1">Contraseña</Text>
            <TextInput
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800"
              placeholder="••••••••"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              editable={!isLoading}
            />
          </View>

          <TouchableOpacity
            className={`w-full bg-sky-500 py-3.5 rounded-xl items-center mt-6 ${isLoading ? 'opacity-70' : ''}`}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-semibold text-base">Iniciar Sesión</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
