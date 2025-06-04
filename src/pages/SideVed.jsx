import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Advertisement from './advertisement';
function SideVed() {
  const [videos, setVideos] = useState([]);

  const apiKey = 'AIzaSyAtRECmBKoGM-o1LvRkM5et1Ny-VBx3fAU';
  const apiUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=10&regionCode=US&key=${apiKey}`;

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((res) => {
        console.log(res.data);
        setVideos(res.data.items);
      })
      .catch((err) => {
        console.log('There is an error', err);
      });
  }, []);

  return (
    <div className="space-y-4">
<div className=' rounded'>
  <Advertisement></Advertisement>
</div>
      {videos.map((video) => (
        <div key={video.id} className="flex space-x-4 hover:bg-gray-100 cursor-pointer">
<img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} className="w-40 h-24 object-cover rounded"/>
          <div className="flex-1">
            {/* title-length */}
            <h4 className="font-semibold text-sm">
{video.snippet.title.length > 50 ? video.snippet.title.slice(0, 50) + '...' : video.snippet.title}
</h4>
            <p className="text-gray-600 text-xs">{video.snippet.channelTitle}</p>
            <p className="text-gray-500 text-xs">
              {parseInt(video.statistics.viewCount).toLocaleString()} views
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SideVed;
