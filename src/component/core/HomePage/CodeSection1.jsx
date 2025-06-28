import React from 'react'
import HighlightText from './HighlightText'
import CodeBlocks from './CodeBlocks'

function CodeSection1() {
  return (
    <div className='flex items-center flex-col py-[12px] pt-10 w-11/12'>
            <div className='pt-[40px] max-550:w-full md:w-[95%] xl:max-w-[75%]'>
                <CodeBlocks
                position = "lg:flex-row"
                heading = {
                    <div>Unlock your <HighlightText text=' coding potential '/> with our online courses.</div>
                  } 
                subheading = "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                ctabtn1 = {
                  {
                    active:true,
                    linkto:"/login",
                    btnText:"Try it Yourself",
                  }  
                }
                ctabtn2 = {
                  {
                    active:false,
                    linkto:"/signup",
                    btnText:"Learn More",
                  }  
                }
                codeblock = {`<!DOCTYPE> <html><html>\n <head><title>Example</title><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a>\n</h1>\n<nav><a href="one/">One</a>\t\n<a href="two/">Two</a>\t\n<a href="three/">Three</a>\n</nav>`} 
                backgroundGradient = "bg-gradient-to-br to-[#8A2BE2,#FFA500] from-[#F8F8FF]" 
                codeColor ="text-yellow-100"
                />
            </div>
        </div>
  )
}

export default CodeSection1
