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
  if (imageId === 'spaceship_down') {
    imageStyle.transform = 'rotate(180deg)';
    imageId = 'spaceship';
  }
  if (imageId === 'spaceship_right') {
    imageStyle.transform = 'rotate(90deg)';
    imageId = 'spaceship';
  }
  if (imageId === 'spaceship_left') {
    imageStyle.transform = 'rotate(-90deg)';
    imageId = 'spaceship';
  }
  if (imageId === 'spaceship_up') {
    imageId = 'spaceship';
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
