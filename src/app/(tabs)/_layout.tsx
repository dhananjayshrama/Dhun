import { Tabs } from 'expo-router';
import { View } from 'react-native';
import MiniPlayer from '../../components/MiniPlayer';

export default function TabsLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: '#121212' }}>
      <Tabs screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: '#121212' } }}>
        <Tabs.Screen name="index" options={{ title: 'Home' }} />
        <Tabs.Screen name="search" options={{ title: 'Search' }} />
      </Tabs>
      <MiniPlayer />
    </View>
  );
}