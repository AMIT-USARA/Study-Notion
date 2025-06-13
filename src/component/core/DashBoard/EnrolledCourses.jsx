import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import ProgressBar from "react-bootstrap/ProgressBar";
import { FiBookOpen, FiClock, FiPercent, FiArrowRight } from "react-icons/fi";

function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const getEnrolledCourses = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Unable to Fetch Enrolled Courses:", error);
      setEnrolledCourses([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    getEnrolledCourses();
  }, [getEnrolledCourses]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Your Learning Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Track your progress, revisit lessons, and achieve your learning goals
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : enrolledCourses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center max-w-md mx-auto">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiBookOpen className="text-blue-600 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Your Learning Journey Awaits
            </h3>
            <p className="text-gray-600 mb-6">
              You haven't enrolled in any courses yet. Discover our catalog and start learning today!
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center mx-auto">
              Explore Courses <FiArrowRight className="ml-2" />
            </button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {enrolledCourses.map((course, index) => (
              <div
                key={index}
                className="bg-blue-900 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                {/* Course Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                      <FiBookOpen className="text-white text-5xl" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                    <h3 className="text-xl font-bold text-white">
                      {course.courseName}
                    </h3>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {course.courseDescription || "No description available"}
                  </p>

                  {/* Progress Section */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-gray-700">
                        <FiClock className="mr-2 text-blue-500" />
                        <span className="text-sm font-medium">
                          {course?.totalDuration || "Duration: N/A"}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <FiPercent className="mr-2 text-blue-500" />
                        <span className="text-sm font-medium">
                          {course.progressPercentage || 0}% Complete
                        </span>
                      </div>
                    </div>

                    <ProgressBar
                      now={course.progressPercentage || 0}
                      className="h-2"
                      variant={
                        course.progressPercentage >= 80
                          ? "success"
                          : course.progressPercentage >= 50
                          ? "info"
                          : "primary"
                      }
                    />
                  </div>

                  {/* Action Button */}
                  <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-300 flex items-center justify-center">
                    {course.progressPercentage === 100 ? (
                      <>
                        View Certificate <FiArrowRight className="ml-2" />
                      </>
                    ) : (
                      <>
                        Continue Learning <FiArrowRight className="ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EnrolledCourses;