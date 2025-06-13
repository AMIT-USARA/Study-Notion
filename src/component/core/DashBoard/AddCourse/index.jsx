import RenderSteps from "./RenderSteps"

export default function AddCourse() {
    return (
        <div className="w-full h-full flex flex-col gap-6 p-5">
        <h1 className="font-bold text-2xl">Add Course</h1>
            <div className="w-full text-white flex max-xl:flex-col-reverse gap-10 justify-evenly">
                
                    
                    <div className="2xl:w-[40vw] xl:w-[33.1vw] ">
                        <RenderSteps />
                    
                </div>
                <div className="border-richblack-700 bg-richblack-800 p-6 rounded-xl h-[35vh] w-auto">
                    <p>Code Upload Tips</p>
                    <ul>
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                        <li>Video section controls the course overview video.</li>
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                        <li>Video section controls the course overview video.</li>
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}