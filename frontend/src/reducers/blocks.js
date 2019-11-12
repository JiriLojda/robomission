import { FETCH_WORLD_SUCCESS } from '../action-types.ts';

export default function reduceBlocks(state = {}, action) {
  switch (action.type) {
    case FETCH_WORLD_SUCCESS: {
      const blockList = action.payload.blocks.map(parseBlock);
      const blocks = {};
      for (const block of blockList) {
        blocks[block.id] = block;
      }
      return blocks;
    }
    default: {
      return state;
    }
  }
}

function parseBlock(data) {
  const block = {
    id: data['name'],
  };
  return block;
}
