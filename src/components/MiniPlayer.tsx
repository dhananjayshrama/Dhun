import { Pressable, Image, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { usePlayer } from '../context/PlayerContext';

export default function MiniPlayer() {
  const { current, isPlaying, toggle } = usePlayer();
  const router = useRouter();
  if (!current) return null;

  return (
    <Pressable style={styles.bar} onPress={() => router.push('/player')}>
      <Image source={{ uri: current.cover }} style={styles.cover} />
      <Text style={styles.title} numberOfLines={1}>{current.title}</Text>
      <Pressable onPress={toggle}>
        <Text style={styles.btn}>{isPlaying ? '⏸' : '▶️'}</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1f1f1f', padding: 10, gap: 10 },
  cover: { width: 40, height: 40, borderRadius: 6 },
  title: { flex: 1, color: '#fff' },
  btn: { fontSize: 24, paddingHorizontal: 8 },
});