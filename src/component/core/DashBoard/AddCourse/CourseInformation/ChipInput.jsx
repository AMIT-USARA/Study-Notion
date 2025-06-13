import { useEffect, useState } from "react"
import { MdClose } from "react-icons/md"
import { useSelector } from "react-redux"

export default function ChipInput({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}) {
  const { editCourse, course } = useSelector((state) => state.course)
  const [chips, setChips] = useState([])

  useEffect(() => {
    if (editCourse && course?.tag) {
      setChips(course.tag)
    }
    register(name, { 
      required: true, 
      validate: (value) => value.length > 0 
    })
  }, [register, name, editCourse, course])

  useEffect(() => {
    setValue(name, chips)
  }, [chips, name, setValue])

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault()
      const chipValue = event.target.value.trim()
      if (chipValue && !chips.includes(chipValue)) {
        const newChips = [...chips, chipValue]
        setChips(newChips)
        event.target.value = ""
      }
    }
  }

  const handleDeleteChip = (chipIndex) => {
    const newChips = chips.filter((_, index) => index !== chipIndex)
    setChips(newChips)
  }

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      
      <div className={`flex w-full flex-wrap items-center gap-2 rounded-lg bg-richblack-700 p-3 ${errors[name] ? "ring-1 ring-pink-200" : ""}`}>
        {/* Chips Container */}
        <div className="flex flex-wrap gap-2">
          {chips?.map((chip, index) => (
            <div
              key={index}
              className="flex items-center gap-1 rounded-full bg-yellow-400 px-3 py-1 text-sm font-medium text-richblack-900"
            >
              <span>{chip}</span>
              <button
                type="button"
                className="transition-all duration-200 hover:scale-110 hover:text-richblack-700 focus:outline-none"
                onClick={() => handleDeleteChip(index)}
                aria-label={`Remove ${chip}`}
              >
                <MdClose className="text-sm" />
              </button>
            </div>
          ))}
        </div>

        {/* Input Field */}
        <input
          id={name}
          name={name}
          type="text"
          placeholder={chips.length === 0 ? placeholder : "Add another..."}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-richblack-5 placeholder-richblack-400 focus:outline-none"
        />
      </div>

      {/* Error Message */}
      {errors[name] && (
        <span className="ml-1 text-xs font-medium text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}