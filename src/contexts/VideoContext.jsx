import { createContext, useState } from "react";

export const VideoContext = createContext();

const VideoProvider = ({ children }) => {
    const [videos, setVideos] = useState([]);
    const [vdofunc,setVdofunc]=useState(false);
    const [vdoTobeAdded,setVdoTobeAdded]=useState("");

    return (
        <VideoContext.Provider
            value={{
                videos,
                setVideos,
                vdofunc,
                setVdofunc,
                vdoTobeAdded,
                setVdoTobeAdded
            }}
        >
            {children}
        </VideoContext.Provider>
    );
};

export default VideoProvider;
