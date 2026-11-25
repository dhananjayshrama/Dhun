import { Song } from '../types/music';

const CLIENT_ID = 'YOUR_JAMENDO_CLIENT_ID';
const BASE = 'https://api.jamendo.com/v3.0';

const toSong = (t: any): Song => ({
  id: t.id,
  title: t.name,
  artist: t.artist_name,
  cover: t.image,
  url: t.audio,
  duration: t.duration,
});

export async function getTrending(): Promise<Song[]> {
  const res = await fetch(
    `${BASE}/tracks/?client_id=${CLIENT_ID}&format=json&limit=30&order=popularity_week&imagesize=300`
  );
  const json = await res.json();
  return json.results.map(toSong);
}

export async function searchSongs(query: string): Promise<Song[]> {
  const res = await fetch(
    `${BASE}/tracks/?client_id=${CLIENT_ID}&format=json&limit=30&search=${encodeURIComponent(query)}&imagesize=300`
  );
  const json = await res.json();
  return json.results.map(toSong);
}