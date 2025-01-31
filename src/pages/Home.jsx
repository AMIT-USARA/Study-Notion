import React from 'react'

import BannerSection from '../component/core/HomePage/BannerSection';
import CodeSection1 from '../component/core/HomePage/CodeSection1';
import CodeSection2 from '../component/core/HomePage/CodeSection2';
import TagSection from '../component/core/HomePage/TagSection';
import TimeLineSection from '../component/core/HomePage/TimeLineSection.jsx';
import LearningCycleSection from '../component/core/HomePage/LearningCycleSection.jsx';
import InstructorSection from '../component/core/HomePage/InstructorSection.jsx'
import Footer from "../component/comman/footer.jsx";
function Home() {
    return (
        <div className='items-center bg-richblack-900 text-white flex flex-col overflow-x-hidden'>
          <BannerSection/>
          
          <CodeSection1/>
          
          <CodeSection2/>

          <TagSection/>
          
          <TimeLineSection/>

          <LearningCycleSection/>

          <InstructorSection/>

          <Footer/>
      </div>
    )
}

export default Home;