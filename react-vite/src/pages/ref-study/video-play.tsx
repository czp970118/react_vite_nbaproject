import React, { useState, useEffect, useRef } from "react";
import { Button } from "antd";

interface VideoProps {
   src: string;
   isPlaying: boolean;
}

const Video = (props: VideoProps) => {
   const ref: any = useRef(null);
   const { src, isPlaying } = props;

   useEffect(() => {
      if (isPlaying) {
         ref.current.play();
      } else {
         ref.current.pause();
      }
   }, [isPlaying]);

   return <video className="video" ref={ref} src={src} loop playsInline />;
};
const VideoPlay = () => {
   const intervalRef = useRef(0);
   const [isPlayIng, setIsPlaying] = useState<boolean>(false);
   const [now, setNow] = useState<number>();
   const [startTime, setStartTime] = useState<number>();

   const handleStart = () => {
      setIsPlaying(!isPlayIng);
      setStartTime(Date.now());
      setNow(Date.now());
      intervalRef.current = setInterval(() => {
         setNow(Date.now());
      }, 10);
   };

   const handleStop = () => {
      setIsPlaying(!isPlayIng);
      clearInterval(intervalRef.current);
   };

   let secondsPassed = 0;
   if (startTime != null && now != null) {
      secondsPassed = (now - startTime) / 1000;
   }

   return (
      <div>
         <h2>1.Video Play的Demo</h2>
         <div className="video-paly">
            <Button
               type="primary"
               onClick={isPlayIng ? handleStop : handleStart}
               style={{ width: "100px" }}
            >
               {isPlayIng ? "暂停" : "播放"}
            </Button>
            <Video
               src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
               isPlaying={isPlayIng}
            />
            <span>{`视频播放了 ${secondsPassed}s`}</span>
         </div>
      </div>
   );
};

export default VideoPlay;
