import { FETCH_WORLD_SUCCESS } from '../action-types';

export default function reduceChunks(state = {}, action) {
  switch (action.type) {
    case FETCH_WORLD_SUCCESS: {
      const chunkList = action.payload.chunks.map(parseChunk);
      const chunks = {};
      for (const chunk of chunkList) {
        chunks[chunk.id] = chunk;
        // Add links from childre to this chuns.
        for (const subchunkId of chunk.subchunks) {
          chunks[subchunkId].parentChunk = chunk.id
        }
      }
      return chunks;
    }
    default: {
      return state;
    }
  }
}

function parseChunk(data) {
  const chunk = {
    id: data['name'],
    order: data['order'],
    setting: data['setting'],
    tasks: data['tasks'],
    subchunks: data['subchunks'],
    parentChunk: null,
  };
  return chunk;
}