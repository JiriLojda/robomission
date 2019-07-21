import React from 'react';
import PropTypes from 'prop-types';
import Image from './Image';
import Instructable from '../containers/Instructable';

export default function GameObject({ imageId, width, height, position, bottom, left }) {
  const imageStyle = {
    position,
    width,
    height,
    bottom,
    left,
  };
  if (imageId && imageId.includes('spaceship_down')) {
    imageStyle.transform = 'rotate(180deg)';
    imageId = `spaceship__${imageId.split('__')[1] || ''}`;
  }
  if (imageId && imageId.includes('spaceship_right')) {
    imageStyle.transform = 'rotate(90deg)';
    imageId = `spaceship__${imageId.split('__')[1] || ''}`;
  }
  if (imageId && imageId.includes('spaceship_left')) {
    imageStyle.transform = 'rotate(-90deg)';
    imageId = `spaceship__${imageId.split('__')[1] || ''}`;
  }
  if (imageId && imageId.includes('spaceship_up')) {
    imageId = `spaceship__${imageId.split('__')[1] || ''}`;
  }
  if (imageId === 'laser_horizontal') {
    imageStyle.transform = 'rotate(90deg)';
    imageId = 'laser';
  }
  return (
    <Instructable instruction={`task-${imageId}`} position="bottom-left">
      <Image imageId={imageId} style={imageStyle} />
    </Instructable>
  );
}

GameObject.propTypes = {
  imageId: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  position: PropTypes.string,
  bottom: PropTypes.number,
  left: PropTypes.number,
};

GameObject.defaultProps = {
  position: 'relative',
  bottom: 0,
  left: 0,
};
