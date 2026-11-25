import { createContext, useContext, useState, ReactNode } from 'react';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { Song } from '../types/music';

type PlayerState = {
  current: Song | null;
  isPlaying: boolean;
  playSong: (song: Song, list: Song[]) => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
};

const PlayerContext = createContext<PlayerState>(null as any);
export const usePlayer = () => useContext(PlayerContext);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const player = useAudioPlayer(null);
  const status = useAudioPlayerStatus(player);
  const [current, setCurrent] = useState<Song | null>(null);
  const [queue, setQueue] = useState<Song[]>([]);

  const playSong = (song: Song, list: Song[]) => {
    setQueue(list);
    setCurrent(song);
    player.replace({ uri: song.url });
    player.play();
  };

  const toggle = () => (status.playing ? player.pause() : player.play());

  const step = (dir: 1 | -1) => {
    if (!current || queue.length === 0) return;
    const i = queue.findIndex((s) => s.id === current.id);
    const nextSong = queue[(i + dir + queue.length) % queue.length];
    playSong(nextSong, queue);
  };

  return (
    <PlayerContext.Provider
      value={{ current, isPlaying: status.playing, playSong, toggle, next: () => step(1), prev: () => step(-1) }}
    >
      {children}
    </PlayerContext.Provider>
  );
}