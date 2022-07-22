import React from 'react';

const ThumbnailWrapper = ({title, thumbnailUrl, onThumbClick}) => {
  const iconTitle = title.split(' ')[0];
  return (
    <div onClick={onThumbClick}>
      <div className='thumbnail'>
        <img src={thumbnailUrl} alt={title} />
      </div>
      <p className='thumbnail-title'>{iconTitle}</p>
    </div>
  )
}

export default ThumbnailWrapper;