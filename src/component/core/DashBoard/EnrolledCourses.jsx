import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import ProgressBar from "react-bootstrap/ProgressBar";

function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const getEnrolledCourses = useCallback(async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      if (Array.isArray(response)) {
        setEnrolledCourses(response);
      } else {
        setEnrolledCourses([]);
      }
      console.log("response getuserenrolledCourses:-", response);
    } catch (error) {
      console.log("Unable to Fetch Enrolled Courses.");
      setEnrolledCourses([]);
    }
  }, [token]);

  useEffect(() => {
    getEnrolledCourses();
  }, [getEnrolledCourses]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Enrolled Courses</h2>
      
      {enrolledCourses.length === 0 ? (
        <p className="text-center text-lg text-gray-600">You have not enrolled in any course yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {enrolledCourses.map((course, index) => (
            <div key={index} className="bg-white shadow-lg rounded-xl p-5">
              {/* Course Thumbnail */}
              {course.thumbnail && (
                <img
                  src={course.thumbnail}
                  alt="Course Thumbnail"
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}
              
              {/* Course Details */}
              <h3 className="text-xl font-semibold text-gray-900">{course.courseName}</h3>
              <p className="text-gray-600 text-sm mt-1">{course.courseDescription}</p>

              {/* Course Duration */}
              <div className="text-gray-700 font-medium mt-3">
                Duration: <span className="text-blue-600">{course?.totalDuration || "N/A"}</span>
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
                <p className="text-gray-700 font-medium">Progress: {course.progressPercentage || 0}%</p>
                <ProgressBar animated now={course.progressPercentage || 0} className="h-2 mt-1" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EnrolledCourses;
