import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../Slices/viewCourseSlice';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';
import {AiFillPlayCircle} from "react-icons/ai"
import IconBtn from '../../comman/IconBtn';

const VideoDetails = () => {

  const {courseId, sectionId, subSectionId} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const playerRef = useRef();
  const {token} = useSelector((state)=>state.auth);
  const {courseSectionData, courseEntireData, completedLectures} = useSelector((state)=>state.viewCourse);

  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

useEffect(()=> {

    const setVideoSpecificDetails = async() => {
        if(!courseSectionData.length)
            return;
        if(!courseId && !sectionId && !subSectionId) {
            navigate("/dashboard/enrolled-courses");
        }
        else {
            //let's assume k all 3 fields are present

            const filteredData = courseSectionData.filter(
                (course) => course._id === sectionId
            )
            const filteredVideoData = filteredData?.[0].subSection.filter(
                (data) => data._id === subSectionId
            )
            setVideoData(filteredVideoData[0]);
            setVideoEnded(false);

        }
    }
    setVideoSpecificDetails();

  },[courseSectionData, courseEntireData, location.pathname])
const isFirstVideo = () => {
  const currentSectionIndex = courseSectionData.findIndex(
    (data) => data._id === sectionId
  );

  if (currentSectionIndex === -1) return false;

  const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
    (data) => data._id === subSectionId
  );

  return currentSectionIndex === 0 && currentSubSectionIndex === 0;
};

const isLastVideo = () => {
  const currentSectionIndex = courseSectionData.findIndex(
    (data) => data._id === sectionId
  );

  if (currentSectionIndex === -1) return false;

  const currentSection = courseSectionData[currentSectionIndex];
  const currentSubSectionIndex = currentSection.subSection.findIndex(
    (data) => data._id === subSectionId
  );

  return (
    currentSectionIndex === courseSectionData.length - 1 &&
    currentSubSectionIndex === currentSection.subSection.length - 1
  );
};

const goToNextVideo = () => {
  const currentSectionIndex = courseSectionData.findIndex(
    (data) => data._id === sectionId
  );

  if (currentSectionIndex === -1) return;

  const currentSection = courseSectionData[currentSectionIndex];
  const currentSubSectionIndex = currentSection.subSection.findIndex(
    (data) => data._id === subSectionId
  );

  // Same section → next video
  if (currentSubSectionIndex < currentSection.subSection.length - 1) {
    const nextSubSectionId = currentSection.subSection[currentSubSectionIndex + 1]._id;
    navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
  } 
  // Different section → first video
  else if (currentSectionIndex < courseSectionData.length - 1) {
    const nextSection = courseSectionData[currentSectionIndex + 1];
    const nextSectionId = nextSection._id;
    const nextSubSectionId = nextSection.subSection[0]._id;
    navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`);
  }
};

const goToPrevVideo = () => {
  const currentSectionIndex = courseSectionData.findIndex(
    (data) => data._id === sectionId
  );

  if (currentSectionIndex === -1) return;

  const currentSection = courseSectionData[currentSectionIndex];
  const currentSubSectionIndex = currentSection.subSection.findIndex(
    (data) => data._id === subSectionId
  );

  // Same section → previous video
  if (currentSubSectionIndex > 0) {
    const prevSubSectionId = currentSection.subSection[currentSubSectionIndex - 1]._id;
    navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);
  } 
  // Previous section → last video
  else if (currentSectionIndex > 0) {
    const prevSection = courseSectionData[currentSectionIndex - 1];
    const prevSectionId = prevSection._id;
    const prevSubSectionId = prevSection.subSection[prevSection.subSection.length - 1]._id;
    navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`);
  }
};


  const handleLectureCompletion = async() => {

    ///dummy code, baad me we will replace it witht the actual call
    setLoading(true);
    //PENDING - > Course Progress PENDING
    const res = await markLectureAsComplete({courseId: courseId, subSectionId: subSectionId}, token);
    //state update
    if(res) {
        dispatch(updateCompletedLectures(subSectionId)); 
    }
    setLoading(false);

  }
  return (
    <div>
      {
        !videoData ? (<div>
                        No Data Found
                    </div>)
        : (
            <Player
                ref = {playerRef}
                aspectRatio="16:9"
                playsInline
                onEnded={() => setVideoEnded(true)}
                src={videoData?.videoUrl}
                 >

                <AiFillPlayCircle  />

                {
                    videoEnded && (
                        <div>
                            {
                                !completedLectures.includes(subSectionId) && (
                                    <IconBtn 
                                        disabled={loading}
                                        onClick={() => handleLectureCompletion()}
                                        text={!loading ? "Mark As Completed" : "Loading..."}
                                    />
                                )
                            }

                            <IconBtn 
                                disabled={loading}
                                onClick={() => {
                                    if(playerRef?.current) {
                                        playerRef.current?.seek(0);
                                        setVideoEnded(false);
                                    }
                                }}
                                text="Rewatch"
                                customClasses="text-xl"
                            />

                            <div>
                                {!isFirstVideo() && (
                                    <button
                                    disabled={loading}
                                    onClick={goToPrevVideo}
                                    className='blackButton'
                                    >
                                        Prev
                                    </button>
                                )}
                                {!isLastVideo() && (
                                    <button
                                    disabled={loading}
                                    onClick={goToNextVideo}
                                    className='blackButton'>
                                        Next
                                    </button>
                                )}
                            </div>
                        </div>
                    )
                }
            </Player>
        )
      }
      <h1>
        {videoData?.title}
      </h1>
      <p>
        {videoData?.description}
      </p>
    </div>
  )
}

export default VideoDetails
