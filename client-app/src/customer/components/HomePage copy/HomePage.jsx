import React from 'react'
import MainCarousel from '../../MainCarousel/MainCarousel'
import HomeSectionCarousel from '../../HomeSectionCarousel/HomeSectionCarousel'
import { mens_kurta } from '../../../../Data/mens_kurta';


export default function HomePage() {
  return (
    <div>
      
      <MainCarousel/>
      
      <div className='space-y-10 py-20'>
        <HomeSectionCarousel data={mens_kurta} sectionName={"Popular Services"}/>
      </div>
    </div>
  )
}
