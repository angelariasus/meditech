import { Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: '#0ea5e9',
      headerStyle: {
        backgroundColor: '#ffffff',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#0f172a',
      },
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <SymbolView name="house.fill" tintColor={color} fallback={<></>} />,
        }}
      />
      <Tabs.Screen
        name="pacientes"
        options={{
          title: 'Pacientes',
          tabBarIcon: ({ color }) => <SymbolView name="person.3.fill" tintColor={color} fallback={<></>} />,
        }}
      />
      <Tabs.Screen
        name="citas"
        options={{
          title: 'Citas',
          tabBarIcon: ({ color }) => <SymbolView name="calendar" tintColor={color} fallback={<></>} />,
        }}
      />
    </Tabs>
  );
}
