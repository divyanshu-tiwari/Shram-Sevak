import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Button from '@mui/material/Button';

function HomeSectionCarousel({data, sectionName}) {
  const responsive = {
    0: { items: 1 },
    730: { items: 3 },
    1024: { items: 4.5 },
  };
  const items = data.slice(0,9).map((item) => <HomeSectionCard product={item} />);
  const carouselRef = React.useRef();

  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.slideNext();
    }
  };

  return (
    <div className='relative border p-5'>
            <h2 className='text-2xl font-extrabold text-gray-800 py-5'>{sectionName}</h2>
      <div className='relative border p-5'>
        <AliceCarousel
          items={items}
          disableButtonsControls
          disableDotsControls
          responsive={responsive}
          ref={carouselRef} 
        />
        
        <div className="flex justify-between mt-2">

          <Button variant='contained' className='z-50 bg-white'sx={{position:'absolute', top:"8rem", right:"0rem", transform:"translateX(50%) rotate(90deg)", bgcolor:"white"}} onClick={handleNextClick}>
            <KeyboardArrowLeftIcon sx={{transform:"rotate(90deg)", color:"black"}}/>
          </Button>
 
          <Button variant='contained' className='z-50 bg-white'sx={{position:'absolute', top:"8rem", left:"0rem", transform:"translateX(-50%) rotate(90deg)", bgcolor:"white"}} onClick={handlePrevClick}>
            <KeyboardArrowLeftIcon sx={{transform:"rotate(-90deg)", color:"black"}}/>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HomeSectionCarousel;