import React from 'react';
import PropTypes from 'prop-types';
import GameObject from './GameObject';
import SpaceBackgroundGrid from './SpaceBackgroundGrid';
import Instructable from '../containers/Instructable';

export default function SpaceWorld({ fields, width }) {
  const { cols, backgrounds, objects } = prepareFields(fields);
  const fieldSize = width / cols;
  // const height = fieldSize * rows;
  const worldStyle = {
    display: 'block',
    position: 'relative',
  };
  return (
    <Instructable instruction="task-space-world" position="bottom">
      <span style={worldStyle}>
        <SpaceBackgroundGrid backgroundColors={backgrounds} fieldSize={fieldSize} />
        <span>
          {objects.map((object, index) =>
            <GameObject
              // The key must change if the object type changes in order to
              // unregister old instructable and register the new one.
              key={`[${object.row}, ${object.col}]-${object.imageId}`}
              imageId={object.imageId}
              width={fieldSize}
              height={fieldSize}
              position="absolute"
              bottom={object.row * fieldSize}
              left={object.col * fieldSize}
            />
          )}
        </span>
      </span>
    </Instructable>
  );
}

SpaceWorld.propTypes = {
  fields: PropTypes.array.isRequired,
  width: PropTypes.number,
};


SpaceWorld.defaultProps = {
  width: 280,
};


const IMAGE_TYPES = {
  S: 'spaceship',
  '1__red': 'spaceship_down__red',
  '1__blue': 'spaceship_down__blue',
  '1__yellow': 'spaceship_down__yellow',
  '1__green': 'spaceship_down__green',
  '2__red': 'spaceship_up__red',
  '2__blue': 'spaceship_up__blue',
  '2__yellow': 'spaceship_up__yellow',
  '2__green': 'spaceship_up__green',
  '3__red': 'spaceship_left__red',
  '3__blue': 'spaceship_left__blue',
  '3__yellow': 'spaceship_left__yellow',
  '3__green': 'spaceship_left__green',
  '4__red': 'spaceship_right__red',
  '4__blue': 'spaceship_right__blue',
  '4__yellow': 'spaceship_right__yellow',
  '4__green': 'spaceship_right__green',
  A: 'asteroid',
  G: 'asteroid_green',
  M: 'meteoroid',
  F: 'meteoroid_green',
  D: 'diamond',
  W: 'wormhole',
  X: 'wormhole2',
  Y: 'wormhole3',
  Z: 'wormhole4',
  explosion: 'explosion',
  laser: 'laser',
  laserHorizontal: 'laser_horizontal',
  'laser-start': 'laser-start',
  'laser-end': 'laser-end',
  'spaceship-broken': 'spaceship-broken',
  'spaceship-broken__red': 'spaceship-broken',
  'spaceship-broken__blue': 'spaceship-broken',
  'spaceship-broken__yellow': 'spaceship-broken',
  'spaceship-broken__green': 'spaceship-broken',
  'spaceship-out-left': 'spaceship-out-left',
  'spaceship-out-right': 'spaceship-out-right',
  'spaceship-out-top': 'spaceship-out-top',
};


const emptyWorld = {
  rows: 1,
  cols: 1,
  backgrounds: [['k']],
  objects: [],
};


function prepareFields(fields) {
  if (fields == null || fields.length === 0) {
    return emptyWorld;
  }
  const rows = fields.length;
  const cols = fields[0].length;
  const backgrounds = fields.map(row => row.map(field => field[0]));
  const objects = [];
  fields.forEach((row, i) => row.forEach((field, j) => field[1].forEach(object => {
    objects.push({ imageId: IMAGE_TYPES[object], row: rows - i - 1, col: j });
  })));
  return { rows, cols, backgrounds, objects };
}
