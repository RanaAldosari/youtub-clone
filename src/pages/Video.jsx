import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router'; 
import SideVed from './SideVed';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
// import Navbar from '../component/Navbar';
import NavbarMain from '../component/NavbarMain';
function Video() {
  const navigate=useNavigate()
  const { id } = useParams(); 
  const [video, setVideo] = useState(null);
  const [channelDet, setChannelDet] = useState(null);
  const [vedComment, setVedComment] = useState([]);

  const apiKey = 'AIzaSyAtRECmBKoGM-o1LvRkM5et1Ny-VBx3fAU';

  useEffect(() => {
    const getdataofVed = async () => {
      try {
        const videoRes = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${apiKey}`
        );

        if (videoRes.data.items.length > 0) {
          const vid = videoRes.data.items[0];
          setVideo(vid);

          const channelId = vid.snippet.channelId;
          const channelRes = await axios.get(
            `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`
          );
if (channelRes.data.items.length > 0) {
setChannelDet(channelRes.data.items[0]);
}
// comments
          const commentRes = await axios.get(
            `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${id}&maxResults=10&key=${apiKey}`
          );
          setVedComment(commentRes.data.items);
        }
      } catch (err) {
        console.error('Error:', err);
        alert('Error loading video, channel or comments');
      }
    };

    getdataofVed();
  }, [id]);

  if (!video || !channelDet) {
    return <div className="p-4">Loading Videos...</div>;
  }
const handelComment=()=>{
  Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "You Need To SignIn!",
});
navigate('/sign')
}
  return (

<>
<div>
  <NavbarMain></NavbarMain>
 <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3 space-y-6">
          <div>
            <iframe
              width="100%"
              height="400"
              className="rounded-lg"
              src={`https://www.youtube.com/embed/${id}`}
              title={video.snippet.title}
              allowFullScreen
            ></iframe>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold">{video.snippet.title}</h2>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <p>
                {parseInt(video.statistics.viewCount).toLocaleString()} views ·{' '}
                {new Date(video.snippet.publishedAt).toDateString()}
              </p>
              <div className="flex space-x-4 items-center">
                <div className="flex items-center space-x-1 cursor-pointer">
                  <img className="w-5" src="/like.png" alt="like" />
                  <h1>{video.statistics.likeCount}</h1>
                </div>                
                <div className="flex items-center space-x-1 cursor-pointer">
                  <img className="w-5" src="/dislike.png" alt="dislike" />
                  <h1>100</h1>
                </div>                
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={channelDet.snippet.thumbnails.default.url} alt="channel" className="w-12 h-12 rounded-full" />
              <div>
                <h2 className="font-bold text-md">{channelDet.snippet.title}</h2>
                <span className="text-sm text-gray-500">{parseInt(channelDet.statistics.subscriberCount).toLocaleString()} subscribers</span>
              </div>
            </div>
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Subscribe</button>
          </div>

          <div>
            <p className="text-gray-600">{video.snippet.description.slice(0, 200) + "..."}</p>
          </div>

          <hr className='border-gray-400' />

          <div className="space-y-6">
            <div className='flex justify-between items-center'>
            <p className="lg:text-lg text-[.7rem] items-center font-semibold">{video.statistics.commentCount} comments</p>
            <div className='flex gap-2'>
              <input className='border rounded p-2 border-gray-400' placeholder='comment...' type="text" />
              <button className='bg-blue-500 rounded text-white p-2 hover:bg-blue-600 delay-100 duration-300 cursor-pointer' onClick={handelComment}>Comment</button>
            </div>
            </div>
            <hr className='border-gray-400' />

{vedComment.map((item, i) => {
     
              return (
                <div key={i} className="mb-4">
                  <div className="flex items-center space-x-2">
                    <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="user" className="w-8 h-8 rounded-full" />
                    <h2 className="font-medium">{item.snippet.topLevelComment.snippet.authorDisplayName}</h2>
                  </div>
                  <p className="text-sm mt-1">{item.snippet.topLevelComment.snippet.textDisplay}</p>
                  <div className="flex space-x-2 mt-2">
                    <div className="flex items-center space-x-1">
                      <img src="/like.png" alt="" className="w-4" />
                      <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <img src="/dislike.png" alt="" className="w-4" />
                      <span>Dislike</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <SideVed />
        </div>
      </div>
    </div>
    </div>
</>
  );
}

export default Video;
