import {
  FETCH_WORLD_SUCCESS,
  FETCH_STUDENT_SUCCESS,
  REGISTER_INSTRUCTABLE,
  SEE_INSTRUCTION_REQUEST,
  SHOW_INSTRUCTIONS,
  } from '../action-types';


const initial = {
  byId: {},
  all: [],
  seen: null,  // to distinguish between initial state and no-instruction-seen
  instructables: {}, // maps instructions to number of registered instructables

  // When the joyride is on, we need to remember the list of scheduled
  // instructions in order not to change the steps dynamically during the tour
  // (which leads to strange unwanted behavior, e.g. the user cannot go back
  // to the previous step).
  shown: false,
  scheduled: null,
};


export default function reduceInstructions(state = initial, action) {
  switch (action.type) {
    case FETCH_WORLD_SUCCESS: {
      const instructionList = action.payload.instructions.map(parseInstruction);
      const nextState = {
        ...state,
        byId: createEntityMap(instructionList),
        all: instructionList.map(instruction => instruction.id),
      };
      if (state.seen === null) {
        // To avoid flickering instruction button.
        nextState.seen = state.all;
      }
      return nextState;
    }
    case FETCH_STUDENT_SUCCESS: {
      // Hack to overcome the issue of creating->fetching a new student
      // only after the first seen instruction on the request by FE
      // (see sagas/index.js:createStudentIfNeeded.
      // TODO: Remove this hack once the creation of users/students is
      // completely abstracted away by BE.
      let seen = action.payload.seenInstructions;
      if (state.seen !== null) {
        seen = Array.from(new Set(seen.concat(state.seen)));
      }
      return { ...state, seen };
    }
    case SEE_INSTRUCTION_REQUEST: {
      if (state.seen.includes(action.payload.instructionId)) {
        return state;
      }
      return {
        ...state,
        seen: [...state.seen, action.payload.instructionId],
      };
    }
    case SHOW_INSTRUCTIONS: {
      let scheduled = [];
      if (action.payload.show) {
        if (action.payload.onlyNew) {
          scheduled = getNewRelevantInstructions(state);
        } else {
          scheduled = getAllRelevantInstructions(state);
        }
      }
      return {
        ...state,
        scheduled,
        shown: action.payload.show && scheduled.length > 0,
      };
    }
    case REGISTER_INSTRUCTABLE: {
      const { instructionId } = action.payload;
      let {[instructionId]: prevCount, ...instructables} = state.instructables;
      const delta = action.payload.show ? 1 : -1;
      const newCount = (prevCount || 0) + delta;
      if (newCount > 0) {
        instructables =  {...instructables, [instructionId]: newCount};
      }
      return { ...state, instructables };
    }
    default: {
      return state;
    }
  }
}


function getAllRelevantInstructions(state) {
  return filterRelevant(state, state.all);
}


// TODO: move to selectors + sagas
export function getNewRelevantInstructions(state) {
  return filterRelevant(state, filterUnseen(state, state.all));
}


function filterUnseen(state, instructions) {
  const { seen } = state;
  const unseen = instructions.filter(id => !seen.includes(id));
  return unseen;
}


function filterRelevant(state, instructions) {
  const withInstructables = Object.keys(state.instructables);
  const relevant = instructions.filter(id => withInstructables.includes(id));
  return relevant;
}


const viewData = {
  'env-recommended-task-button': {
    position: 'top',
  },
  'env-menu': {
    position: 'right',
  },
  'env-levelbar': {
    position: 'bottom',
  },
  'env-help': {
    position: 'bottom',
  },
  'env-feedback': {
    position: 'bottom',
  },
  'env-login': {
    position: 'bottom',
  },

  'task-space-world': {
    position: 'bottom',
  },
  'task-toolbox': {
    position: 'right',
  },
  'task-snapping': {
    position: 'bottom-left',
  },
  'task-controls': {
    position: 'bottom-left',
  },
  'task-wormhole': {
    position: 'bottom-left',
  },
  'task-diamond': {
    position: 'bottom-left',
  },
  'task-asteroid': {
    position: 'bottom-left',
  },
  'task-meteoroid': {
    position: 'bottom-left',
  },
  'task-diamond-status': {
    position: 'bottom-left',
  },
  'task-energy-status': {
    position: 'bottom-left',
  },
  'task-length-limit': {
    position: 'bottom-left',
  },
  'task-block-fly': {
    position: 'bottom-left',
  },
  'task-block-shoot': {
    position: 'bottom-left',
  },
  'task-block-repeat': {
    position: 'bottom-left',
  },
  'task-block-while': {
    position: 'bottom-left',
  },
  'task-block-color': {
    position: 'bottom-left',
  },
  'task-block-position': {
    position: 'bottom-left',
  },
  'task-block-if': {
    position: 'bottom-left',
  },
  'task-block-if-else': {
    position: 'bottom-left',
  },

  'editor-setting': {
    position: 'left',
  },
  'editor-space-world': {
    position: 'left',
  },

  'overview-levels': {
    position: 'bottom',
  },
  'overview-recommended-task': {
    position: 'bottom',
  },
  'overview-solved-task': {
    position: 'bottom',
  },
  'overview-difficulty': {
    position: 'bottom',
  },
};


function parseInstruction(data) {
  const instructionId = data['name'];
  if (viewData[instructionId] === undefined) {
    console.warn(`Missing view data for instruction '${instructionId}'`);
  }
  const selectorClass = `instructable-${instructionId}`;
  const instruction = {
    ...viewData[instructionId],
    id: instructionId,
    // save both class and selector
    selectorClass: selectorClass,
    selector: `.${selectorClass}`,
  };

  return instruction;
}


// TODO: factor out to some common utils (core.entities?)
function createEntityMap(list) {
  const map = {};
  for (const entity of list) {
    map[entity.id] = entity;
  }
  return map;
}
