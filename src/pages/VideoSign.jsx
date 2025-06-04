import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import SideVed from './SideVed';
import axios from 'axios';
import Swal from 'sweetalert2';
import NavbarMain from '../component/NavbarMain';
function VideoSign() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [channelDet, setChannelDet] = useState(null);
  const [vedComment, setVedComment] = useState([]);
  const [newComment, setNewComment] = useState("");

  const apiKey = 'AIzaSyAtRECmBKoGM-o1LvRkM5et1Ny-VBx3fAU';
  const user = localStorage.getItem("username_key"); 

  useEffect(() => {
    const getVideoData = async () => {
      try {
        const videoRes = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${apiKey}`
        );

        if (videoRes.data.items.length > 0) {
          const vid = videoRes.data.items[0];
          setVideo(vid);

          const channelId = vid.snippet.channelId;
          const channelRes = await axios.get(
            `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`
          );
          if (channelRes.data.items.length > 0) {
            setChannelDet(channelRes.data.items[0]);
          }

          const commentRes = await axios.get(
            `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${id}&maxResults=10&key=${apiKey}`
          );
          setVedComment(commentRes.data.items);
        }
      } catch (err) {
        console.error('Error:', err);
        Swal.fire("Error", "Failed to load video data.", "error");
      }
    };

    getVideoData();
  }, [id]);

  if (!video || !channelDet) return <div className="p-4">Loading Videos...</div>;

  const handleComment = () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to post a comment.",
        confirmButtonText: "Go to Login",
      }).then(() => {
        navigate("/sign");
      });
      return;
    }
const commentsOfinfo = {
      id: Date.now(),
      snippet: {
        topLevelComment: {
          snippet: {
            authorDisplayName: user,
            authorProfileImageUrl: "/user.png", 
            textDisplay: newComment,
          }
        }
      }
    };

    setVedComment([commentsOfinfo, ...vedComment]);
    setNewComment("");
    Swal.fire("Posted!", "Your comment has been added.", "success");
  };


  const handleEdit = (index) => {
    const currentText = vedComment[index].snippet.topLevelComment.snippet.textDisplay;

    Swal.fire({
      title: 'Edit Comment',
      input: 'textarea',
      inputLabel: 'Modify your comment',
      inputValue: currentText,
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value.trim()) {
          return 'Comment cannot be empty!';
        }
        return null;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedComments = [...vedComment];
        updatedComments[index].snippet.topLevelComment.snippet.textDisplay = result.value;
        setVedComment(updatedComments);
        Swal.fire('Saved!','success');
      }
    });
  };

  const handleDelete = (commentId) => {
    Swal.fire({
      title: 'be sure',
      text: "Are you sure?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        const filteredComments = vedComment.filter(c => c.id !== commentId);
        setVedComment(filteredComments);
        Swal.fire('Deleted!', 'Your comment has been deleted.', 'success');
      }
    });
  };
const switchToHome=()=>{
  navigate('/home')
}
  return (
<>
<div>
  {/* <NavbarMain></NavbarMain> */}


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
              placeholder="Search..." onClick={switchToHome}
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
                <span className="text-sm text-gray-500">
                  {parseInt(channelDet.statistics.subscriberCount).toLocaleString()} subscribers
                </span>
              </div>
            </div>
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Subscribe</button>
          </div>

          <p className="text-gray-600">{video.snippet.description.slice(0, 200)}...</p>
          <hr className='border-gray-400' />
{/* comments-api */}
          <div className="space-y-6">
            <div className='flex justify-between items-center'>
              <p className="lg:text-lg text-[.7rem] font-semibold">{vedComment.length} comments</p>
              <div className='flex gap-2'>
                <input
                  className='border rounded p-2 border-gray-400'
                  placeholder='Write a comment...'
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                  className='bg-blue-500 rounded text-white p-2 hover:bg-blue-600 transition'
                  onClick={handleComment}
                >
                  Comment
                </button>
              </div>
            </div>
            <hr className='border-gray-400' />
{/* comments */}
            {vedComment.map((item, i) => {
              const comment = item.snippet.topLevelComment.snippet;
              return (
                <div key={i} className="mb-4 border-b pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img src={comment.authorProfileImageUrl} alt="user" className="w-8 h-8 rounded-full" />
                      <h2 className="font-medium">{comment.authorDisplayName}</h2>
                    </div>
                    {user === comment.authorDisplayName && (
<div className="flex gap-4">
                        <button
                          onClick={() => handleEdit(i)}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-sm mt-1">{comment.textDisplay}</p>
                  <div className="flex space-x-2 mt-2">
                    <div className="flex items-center space-x-1">
                      <img src="/like.png" alt="" className="w-4" />
                      <span>{comment.likeCount}</span>
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

export default VideoSign;
