import React, {useState, useEffect} from 'react';
import { BiChevronLeftCircle, BiChevronRightCircle} from 'react-icons/bi';
import ThumbnailWrapper from './ThumbnailWrapper';

const SwipperWrapper = () => {
  const [data, setData] = useState();
  const [slide, setSlide] = useState(0);
  const [touchStart, settouchStart] = useState(0);
  const [touchEnd, settouchEnd] = useState(0);

  const fetchData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/photos');
    const data = await response.json();
    setData(data.slice(0, 6));
  }

  console.log(data);

  useEffect(() => {
    fetchData();
  }, [])

  const handleForwardSlide = () => {
    slide === 5 ? setSlide(0) : setSlide(slide + 1);
  }

  const handleBackwardSlide = () => {
    slide === 0 ? setSlide(5) : setSlide(slide - 1);
  }

  const onThumbClick = (index) => {
    setSlide(index)
  }

  const handleOnTouchStart = (e) => {
    settouchStart(e.touches[0].clientX);
  }

  const handleOnTouchMove = (e) => {
    settouchEnd(e.touches[0].clientX);
  }

  const handleOnTouchEnd = (e) => {
    if (touchEnd - touchStart > 0) {
      handleBackwardSlide();
    } else {
      handleForwardSlide();
    }
  }

  return (
    <div className='swipper-wrapper'>
      {data === undefined ? <p>Loading...</p> : (
        <>
        <h2>MASTER WiZR Modules</h2>
        <div className='thumbnail-wrapper'>
          {data && data.map((item, index) => (
            <ThumbnailWrapper
              key={item.id} 
              title={item.title}
              thumbnailUrl={item.thumbnailUrl}
              onThumbClick={() => onThumbClick(index)} 
            />
          ))}
        </div>

        <div className='slide'>
           <div className='navigation'>
             <BiChevronLeftCircle
               onClick={handleBackwardSlide}
             />
           </div>

           <div className='slideImage'>
              <img
                 src={data[slide].url}
                 alt={data[slide].title}
                 onTouchStart={handleOnTouchStart}
                 onTouchMove={handleOnTouchMove}
                 onTouchEnd={handleOnTouchEnd}
              />   
           </div>
           
           <div className='navigation'>
              <BiChevronRightCircle
                 onClick={handleForwardSlide}
              />
           </div>
        </div>
        </>
      )}
    </div>
  )
}

export default SwipperWrapper;