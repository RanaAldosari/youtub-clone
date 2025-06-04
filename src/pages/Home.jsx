import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import NavbarMain from '../component/NavbarMain';

function Home() {
  const [videos, setVideos] = useState([]);

const apiKey = 'AIzaSyAtRECmBKoGM-o1LvRkM5et1Ny-VBx3fAU';
  const apiUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=30&regionCode=US&key=${apiKey}`;

  useEffect(() => {
    axios.get(apiUrl)
      .then((res) => setVideos(res.data.items))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <NavbarMain />
 <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <Link to={`/video/${video.id}`} key={video.id}>
              <div className="bg-white rounded-md overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
                <img
                  src={video.snippet.thumbnails.high.url}
                  alt={video.snippet.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-md font-bold mb-1">
                    {video.snippet.title.length > 50
                      ? video.snippet.title.slice(0, 50) + '...'
                      : video.snippet.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {video.snippet.channelTitle}
                  </p>
                  <p className="text-xs text-gray-500">
                    {parseInt(video.statistics.viewCount).toLocaleString()} views
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
