import { Pressable, Image, Text, View, StyleSheet } from 'react-native';
import { Song } from '../types/music';

export default function SongRow({ song, onPress }: { song: Song; onPress: () => void }) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Image source={{ uri: song.cover }} style={styles.cover} />
      <View style={{ flex: 1 }}>
        <Text style={styles.title} numberOfLines={1}>{song.title}</Text>
        <Text style={styles.artist} numberOfLines={1}>{song.artist}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', padding: 12, gap: 12 },
  cover: { width: 52, height: 52, borderRadius: 8, backgroundColor: '#222' },
  title: { color: '#fff', fontSize: 16, fontWeight: '600' },
  artist: { color: '#aaa', fontSize: 13 },
});