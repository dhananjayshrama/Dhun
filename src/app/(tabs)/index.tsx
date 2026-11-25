import { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, Text, View } from 'react-native';
import { getTrending } from '../../services/musicApi';
import { usePlayer } from '../../context/PlayerContext';
import SongRow from '../../components/SongRow';
import { Song } from '../../types/music';

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const { playSong } = usePlayer();

  useEffect(() => {
    getTrending().then(setSongs).catch(console.warn).finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  return (
    <View style={{ flex: 1, backgroundColor: '#121212', paddingTop: 50 }}>
      <Text style={{ color: '#fff', fontSize: 26, fontWeight: 'bold', padding: 16 }}>Trending</Text>
      <FlatList
        data={songs}
        keyExtractor={(s) => s.id}
        renderItem={({ item }) => <SongRow song={item} onPress={() => playSong(item, songs)} />}
      />
    </View>
  );
}