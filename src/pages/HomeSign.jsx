import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

function HomeSign() {
  const [videos, setVideos] = useState([]);
  const [Searchbar, setSearchbar] = useState(""); 
  const apiKey = 'AIzaSyAtRECmBKoGM-o1LvRkM5et1Ny-VBx3fAU';
  const apiUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=30&regionCode=US&key=${apiKey}`;

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((res) => {
        setVideos(res.data.items); 
      })
      .catch((error) => {
        console.log('Error fetching videos:', error);
      });
  }, []);
// searchbar
  const filteredVideos = videos.filter((video) =>
    video.snippet.title.toLowerCase().includes(Searchbar.toLowerCase())
  );

  return (
    <>
      <div>
        <nav className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
          <div className="flex items-center space-x-4">
            <img
              src="/menu.png"
              alt="menu"
              className="w-4 h-5 cursor-pointer"
            />
            <img
              src="/youtube-icon-illustration-youtube-app-logo-social-media-icon_561158-3674-removebg-preview.png"
              alt="YouTube logo"
              className="h-8"
            />
          </div>

          <div className="relative flex-1 max-w-xl mx-4">
            <input
              type="text"
              placeholder="Search..."
              value={Searchbar}
              onChange={(e) => setSearchbar(e.target.value)} 
              className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <img
              src="/search.png"
              alt="search"
              className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            />
          </div>

          <div className="flex items-center space-x-4">
            <img src="/upload.png" alt="upload" className="w-6 h-6 cursor-pointer" />
            <img src="/more.png" alt="more" className="w-6 h-6 cursor-pointer" />
            <img src="/notification.png" alt="notification" className="w-6 h-6 cursor-pointer" />
            <img src="/user_profile.jpg" alt="user" className="w-8 h-8 rounded-full cursor-pointer" />
          </div>
        </nav>

        <div className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredVideos.map((video) => (
              <Link to={`/vedsign/${video.id}`} key={video.id}>
                <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={video.snippet.thumbnails.high.url}
                    alt={video.snippet.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-md font-bold mb-1">
                      {video.snippet.title.length > 50? video.snippet.title.slice(0, 50) + '...': video.snippet.title}
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
      </div>
    </>
  );
}

export default HomeSign;
