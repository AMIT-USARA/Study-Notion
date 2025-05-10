import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from '../../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import { BiUpload } from 'react-icons/bi';
import RequirementField from './RequirementField';
import { setStep, setCourse } from '../../../../../Slices/courseSlice';
import IconBtn from '../../../../../component/comman/IconBtn';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { toast } from 'react-hot-toast';

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState('');

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      if (categories.length > 0) {
        setCourseCategories(categories);
      }
      setLoading(false);
    };

    if (editCourse && course) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category._id || course.category);
      setValue("courseRequirements", course.instructions || []);
      setThumbnailPreview(course.thumbnail);

      const initialTags = Array.isArray(course.tag)
        ? course.tag
        : (course.tag || '').split(',').map(tag => tag.trim()).filter(Boolean);
      setTags(initialTags);
    }

    getCategories();
  }, [editCourse, course, setValue]);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
    }
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && inputTag.trim() !== '') {
      e.preventDefault();
      if (!tags.includes(inputTag.trim())) {
        setTags([...tags, inputTag.trim()]);
        setInputTag('');
      }
    }
  };

  const removeTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const isFormUpdated = () => {
    const currentValues = getValues();
    return (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory !== (course.category._id || course.category) ||
      (thumbnailFile && thumbnailPreview !== course.thumbnail) ||
      JSON.stringify(currentValues.courseRequirements) !== JSON.stringify(course.instructions) ||
      JSON.stringify(tags) !== JSON.stringify(course.tag)
    );
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("tag", JSON.stringify(tags));
    formData.append("status", COURSE_STATUS.DRAFT);

    if (thumbnailFile) {
      formData.append("thumbnail", thumbnailFile);
    }

    try {
      setLoading(true);

      if (editCourse) {
        if (!isFormUpdated()) {
          toast.error("No changes made so far");
          setLoading(false);
          return;
        }

        formData.append("courseId", course._id);
        const result = await editCourseDetails(formData, token);
        if (result) {
          dispatch(setCourse(result));
          dispatch(setStep(2));
        }
      } else {
        const result = await addCourseDetails(formData, token);
        if (result) {
          dispatch(setCourse(result));
          dispatch(setStep(2));
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8">
      {/* Course Title */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseTitle">
          Course Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="form-style w-full bg-richblack-700 text-richblack-5 p-3 rounded-md border-b border-richblack-500 focus:outline-none focus:ring-1 focus:ring-richblack-200"
        />
        {errors.courseTitle && (
          <span className="text-xs text-pink-200">Course Title is Required**</span>
        )}
      </div>

      {/* Course Short Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
          Course Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          className="form-style w-full min-h-[140px] bg-richblack-700 text-richblack-5 p-3 rounded-md border-b border-richblack-500 focus:outline-none focus:ring-1 focus:ring-richblack-200"
        />
        {errors.courseShortDesc && (
          <span className="text-xs text-pink-200">Course Description is required**</span>
        )}
      </div>

      {/* Course Price */}
      <div className="flex flex-col space-y-2 relative">
        <label className="text-sm text-richblack-5" htmlFor="coursePrice">
          Course Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
            })}
            className="form-style w-full bg-richblack-700 text-richblack-5 p-3 pl-8 rounded-md border-b border-richblack-500 focus:outline-none focus:ring-1 focus:ring-richblack-200"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-richblack-400" />
        </div>
        {errors.coursePrice && (
          <span className="text-xs text-pink-200">Course Price is Required**</span>
        )}
      </div>

      {/* Course Category */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseCategory">
          Course Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          id="courseCategory"
          defaultValue=""
          {...register("courseCategory", { required: true })}
          className="form-style w-full bg-richblack-700 text-richblack-5 p-3 rounded-md border-b border-richblack-500 focus:outline-none focus:ring-1 focus:ring-richblack-200"
        >
          <option value="" disabled className="text-richblack-700">
            Choose a Category
          </option>
          {!loading &&
            courseCategories.map((category, index) => (
              <option key={index} value={category._id} className="text-richblack-5">
                {category.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="text-xs text-pink-200">Course Category is Required</span>
        )}
      </div>

      {/* Course Tags */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5">
          Course Tags <sup className="text-pink-200">*</sup>
        </label>
        <div className="flex flex-col space-y-2">
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <div key={index} className="flex items-center bg-richblack-600 text-richblack-5 px-2 py-1 rounded-full text-xs">
                {tag}
                <button type="button" onClick={() => removeTag(index)} className="ml-1 text-richblack-300 hover:text-richblack-100">
                  ×
                </button>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={inputTag}
            onChange={(e) => setInputTag(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Type a tag and press Enter"
            className="form-style w-full bg-richblack-700 text-richblack-5 p-3 rounded-md border-b border-richblack-500 focus:outline-none focus:ring-1 focus:ring-richblack-200"
          />
          <p className="text-xs text-richblack-400">Press Enter to add tags</p>
        </div>
      </div>

      {/* Course Thumbnail */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5">
          Course Thumbnail <sup className="text-pink-200">*</sup>
        </label>
        <div className="flex flex-col items-center justify-center w-full">
          <label
            htmlFor="thumbnail"
            className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer 
              ${thumbnailPreview ? 'border-richblack-500' : 'border-richblack-500 hover:border-richblack-200'} 
              bg-richblack-700 hover:bg-richblack-600 transition-all duration-200`}
          >
            {thumbnailPreview ? (
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <img src={thumbnailPreview} alt="Thumbnail Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                  <BiUpload className="text-3xl text-white" />
                  <span className="text-white ml-2">Change Thumbnail</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <BiUpload className="text-4xl text-richblack-200 mb-3" />
                <p className="mb-2 text-sm text-richblack-200">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-richblack-400">SVG, PNG, JPG or GIF (MAX. 2MB)</p>
              </div>
            )}
            <input id="thumbnail" type="file" accept="image/*" className="hidden" onChange={handleThumbnailChange} />
          </label>
        </div>
        {!thumbnailPreview && errors.thumbnail && (
          <span className="text-xs text-pink-200">Thumbnail is required**</span>
        )}
      </div>

      {/* Benefits of the Course */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5">
          Benefits of the course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter Benefits of the course"
          {...register("courseBenefits", { required: true })}
          className="form-style w-full min-h-[130px] bg-richblack-700 text-richblack-5 p-3 rounded-md border-b border-richblack-500 focus:outline-none focus:ring-1 focus:ring-richblack-200"
        />
        {errors.courseBenefits && (
          <span className="text-xs text-pink-200">Benefits of the course are required**</span>
        )}
      </div>

      {/* Requirements/Instructions */}
      <RequirementField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      {/* Buttons */}
      <div className="flex justify-end gap-x-3">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            className="flex items-center gap-x-2 bg-yellow-100 text-richblack-900 py-2 px-4 rounded-md font-medium hover:bg-yellow-300 transition-all duration-200"
          >
            Continue Without Saving
          </button>
        )}
        <IconBtn
          active={true}
          text={!editCourse ? "Next" : "Save Changes"}
          type="submit"
          customClasses={"bg-yellow-50 text-richblack-900 hover:bg-yellow-25"}
        />
      </div>
    </form>
  );
};

export default CourseInformationForm;
