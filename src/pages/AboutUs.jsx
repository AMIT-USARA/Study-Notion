import React from 'react';

import HighlightPoint from '../component/core/AboutPage/HighlightPoint';
import StoryLineSection from '../component/core/AboutPage/StoryLineSection';
import Footer from '../component/comman/footer';
import TopBoxSection from '../component/core/AboutPage/TopBoxSection';
import PlateFormInfo from './PlateFormInfo';
import ContectUsFile from '../component/core/AboutPage/ContectUsFile';
function AboutUs() {
  return (
    <div className="text-white flex relative min-w-screen flex-col gap-[32px]">
      
        <TopBoxSection/>
        <HighlightPoint/>
        <StoryLineSection/>
        <PlateFormInfo/>
        <ContectUsFile/>
    
      <Footer/>
    </div>

  );
}

export default AboutUs;



