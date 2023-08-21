import React from 'react'
import MainCarousel from '../../MainCarousel/MainCarousel'
import HomeSectionCarousel from '../../HomeSectionCarousel/HomeSectionCarousel'
import { worker_list } from '../../../../Data/worker_list';


export default function HomePage() {
  return (
    <div>
      
      <MainCarousel/>
      
      <div className='space-y-10 py-20'>
        <HomeSectionCarousel data={worker_list} sectionName={"Popular Services"}/>
      </div>
    </div>
  )
}
