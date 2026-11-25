import { useState } from 'react';
import { FlatList, TextInput, View, ActivityIndicator } from 'react-native';
import { searchSongs } from '../../services/musicApi';
import { usePlayer } from '../../context/PlayerContext';
import SongRow from '../../components/SongRow';
import { Song } from '../../types/music';

export default function Search() {
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const { playSong } = usePlayer();

  const run = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      setSongs(await searchSongs(query));
    } catch (e) {
      console.warn(e);
    }
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#121212', paddingTop: 50 }}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={run}
        placeholder="Search songs or artists"
        placeholderTextColor="#888"
        returnKeyType="search"
        style={{ margin: 16, padding: 12, borderRadius: 10, backgroundColor: '#1f1f1f', color: '#fff' }}
      />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={songs}
          keyExtractor={(s) => s.id}
          renderItem={({ item }) => <SongRow song={item} onPress={() => playSong(item, songs)} />}
        />
      )}
    </View>
  );
}