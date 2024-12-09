"use client";

import { formatTime } from "@/lib/formatTime";
import { cn } from "@/lib/utils";
import { useAudio } from "@/providers/AudioProvider";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Progress } from "./ui/progress";

const PodcastPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const { audio } = useAudio();

  const togglePlayPause = () => {
    if (audioRef.current?.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;

      setIsMuted((prevState) => !prevState);
    }
  };

  const forward = () => {
    if (!audioRef.current) return;
    if (!audioRef.current.currentTime && !audioRef.current.duration) return;
    if (audioRef.current.currentTime + 5 < audioRef.current.duration) {
      audioRef.current.currentTime += 5;
    }
  };

  const rewind = () => {
    if (!audioRef.current) return;
    if (audioRef.current.currentTime - 5 > 0) {
      audioRef.current.currentTime -= 5;
    } else {
      audioRef.current.currentTime = 0;
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audio?.audioUrl) {
      if (!audioElement) return;

      audioElement.play().then(() => setIsPlaying(true));
    } else {
      audioElement?.pause();
      setIsPlaying(true);
    }
  }, [audio?.audioUrl]);

  useEffect(() => {
    const updatedCurrentTime = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };

    const audioElement = audioRef.current;

    if (audioElement) {
      audioElement.addEventListener("timeupdate", updatedCurrentTime);

      return () => {
        audioElement.removeEventListener("timeupdate", updatedCurrentTime);
      };
    }
  }, []);

  return (
    <article
      className={cn("sticky bottom-0 left-0 flex size-full flex-col", {
        hidden: !audio?.audioUrl || audio.audioUrl === "",
      })}
    >
      {duration > 0 && (
        <Progress
          value={(currentTime / duration) * 100}
          className="w-full"
          max={duration}
        />
      )}
      <section className="glassmorphism-black flex h-[112px] w-full items-center justify-between px-4 max-md:justify-center max-md:gap-5 md:px-12">
        <audio
          className="hidden"
          ref={audioRef}
          src={audio?.audioUrl}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleAudioEnded}
        />
        <div className="flex items-center gap-4 max-md:hidden">
          <Link href={`/podcasts/id`}>
            <Image
              src={audio?.imageUrl || "/images/player1.png"}
              height={64}
              width={64}
              alt="player"
              className="aspect-square rounded-xl"
            />
          </Link>
          <div className="flex w-[160px] flex-col">
            <h3 className="text-14 truncate font-semibold text-white-1">
              {audio?.title}
            </h3>
            <p className="text-12 font-normal text-white-2">{audio?.author}</p>
          </div>
        </div>
        <div
          className="flex-center cursor-pointer gap-3
         md:gap-6"
        >
          <div className="flex items-center gap-1.5">
            <Image
              src="/icons/reverse.svg"
              width={24}
              height={24}
              alt="rewind"
              onClick={rewind}
            />
            <h3 className="text-12 font-bold text-white-4">-5</h3>
          </div>
          <Image
            src={isPlaying ? "/icons/Pause.svg" : "/icons/Play.svg"}
            height={30}
            width={30}
            alt="player"
            onClick={togglePlayPause}
          />
          <div className="flex items-center gap-1.5">
            <Image
              src="/icons/forward.svg"
              width={24}
              height={24}
              onClick={forward}
              alt="forward"
            />
            <h3 className="text-12 font-bold text-white-4">+5</h3>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <h2 className="text-16 font-normal text-white-2 max-md:hidden">
            {formatTime(duration)}
          </h2>
          <div className="flex w-full gap-2">
            <Image
              src={isMuted ? "/icons/unmute.svg" : "/icons/mute.svg"}
              className="cursor-pointer"
              width={24}
              height={24}
              alt="unmuted"
              onClick={toggleMute}
            />
          </div>
        </div>
      </section>
    </article>
  );
};

export default PodcastPlayer;
