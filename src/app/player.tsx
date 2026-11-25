import { View, Image, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { usePlayer } from '../context/PlayerContext';

export default function Player() {
  const { current, isPlaying, toggle, next, prev } = usePlayer();
  const router = useRouter();

  if (!current) {
    return (
      <View style={styles.container}>
        <Text style={styles.artist}>Nothing playing</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} style={{ position: 'absolute', top: 50, left: 20 }}>
        <Text style={{ color: '#fff', fontSize: 28 }}>⌄</Text>
      </Pressable>
      <Image source={{ uri: current.cover }} style={styles.cover} />
      <Text style={styles.title} numberOfLines={2}>{current.title}</Text>
      <Text style={styles.artist}>{current.artist}</Text>
      <View style={styles.controls}>
        <Pressable onPress={prev}><Text style={styles.btn}>⏮</Text></Pressable>
        <Pressable onPress={toggle}><Text style={[styles.btn, { fontSize: 56 }]}>{isPlaying ? '⏸' : '▶️'}</Text></Pressable>
        <Pressable onPress={next}><Text style={styles.btn}>⏭</Text></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', alignItems: 'center', justifyContent: 'center', padding: 24 },
  cover: { width: 280, height: 280, borderRadius: 16, marginBottom: 24, backgroundColor: '#222' },
  title: { color: '#fff', fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  artist: { color: '#aaa', fontSize: 16, marginTop: 6 },
  controls: { flexDirection: 'row', alignItems: 'center', gap: 32, marginTop: 32 },
  btn: { color: '#fff', fontSize: 36 },
});