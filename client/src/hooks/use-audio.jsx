/* eslint-disable */

import { useState, useEffect } from 'react';

const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const toggle = () => {
    setPlaying(!playing);
  };

  useEffect(() => {
    if (playing) {
      audio.play();
    } else {
      audio.currentTime = 0;
      audio.pause();
    }
  }, [playing]);

  useEffect(() => {
    audio.volume = muted ? 0 : 1;
  }, [muted]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));

    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle, muted, setMuted];
};

export default useAudio;
