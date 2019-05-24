export const completeToolbox = [
  // TODO: rewrite as a selector on state.toolboxes
  {
    type: 'fly',
    fields: { direction: 'ahead' },
  },
  {
    type: 'fly',
    fields: { direction: 'left' },
  },
  {
    type: 'fly',
    fields: { direction: 'right' },
  },
  { type: 'shoot' },
  {
    type: 'turn',
    fields: { direction: 'left' },
  },
  {
    type: 'turn',
    fields: { direction: 'right' },
  },
  { type: 'setVariable' },
  { type: 'getStringVariable' },
  { type: 'getNumericVariable' },
  { type: 'repeat' },
  { type: 'while' },
  { type: 'position_value' },
  { type: 'tile' },
  { type: 'color' },
  { type: 'position' },
  { type: 'if' },
  { type: 'if-else' },
];


export function expandBlocks(toolbox) {
  const expandedBlockLists = toolbox.map(block => expandBlock(block));
  return [].concat.apply([], expandedBlockLists);
}


function expandBlock(block) {
  switch (block) {
    case 'fly': {
      return [
        {
          type: 'fly',
          fields: { direction: 'ahead' },
        },
        {
          type: 'fly',
          fields: { direction: 'left' },
        },
        {
          type: 'fly',
          fields: { direction: 'right' },
        },
      ];
    }
    case 'turn': {
      return [
        {
          type: 'turn',
          fields: { direction: 'left' },
        },
        {
          type: 'turn',
          fields: { direction: 'right' },
        },
      ];
    }
    default: {
      return { type: block };
    }
  }
}
