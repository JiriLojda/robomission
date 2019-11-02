export const initialStore = {
  api: {
    currentUserUrl: '/learn/api/users/current/',
    worldUrl: '/learn/api/domain/',
    feedbackUrl: '/monitoring/api/feedback/'
  },
  app: {
    mode: 'intro',
    staticDataLoaded: true,
    studentLoaded: true,
    practiceOverviewLoaded: true,
    practiceOverviewInvalidated: false,
    isLoginModalOpen: false,
    isSignUpModalOpen: false,
    signUpModalErrors: {},
    loginFailed: false,
    snackbarMessageId: null
  },
  blocks: {
    fly: {
      id: 'fly'
    },
    shoot: {
      id: 'shoot'
    },
    repeat: {
      id: 'repeat'
    },
    'while': {
      id: 'while'
    },
    color: {
      id: 'color'
    },
    position: {
      id: 'position'
    },
    'if': {
      id: 'if'
    },
    'if-else': {
      id: 'if-else'
    }
  },
  problemSets: {
    'multiple-whiles': {
      id: 'multiple-whiles',
      granularity: 'phase',
      section: '4.2',
      level: 4,
      order: 2,
      setting: {},
      tasks: [
        'yellow-is-not-red',
        'yellow-hint',
        'stop-on-red',
        'direction-change'
      ],
      parts: [],
      parent: 'while',
      skill: 0
    },
    diamonds: {
      id: 'diamonds',
      granularity: 'phase',
      section: '1.3',
      level: 1,
      order: 3,
      setting: {},
      tasks: [
        'diamond-on-right',
        'beware-of-asteroid',
        'plus',
        'diamond-path',
        'surrounded-diamond'
      ],
      parts: [],
      parent: 'commands',
      skill: 0
    },
    comparing: {
      id: 'comparing',
      granularity: 'mission',
      section: '7',
      level: 7,
      order: 7,
      setting: {
        toolbox: 'loops-if-position'
      },
      tasks: [],
      parts: [
        'comparing-intro',
        'comparing-practice',
        'comparing-puzzles'
      ],
      parent: null,
      skill: 0
    },
    'if-else-puzzles': {
      id: 'if-else-puzzles',
      granularity: 'phase',
      section: '8.3',
      level: 8,
      order: 3,
      setting: {},
      tasks: [
        'colorful-flowers'
      ],
      parts: [],
      parent: 'if-else',
      skill: 0
    },
    'loops-if': {
      id: 'loops-if',
      granularity: 'mission',
      section: '9',
      level: 9,
      order: 9,
      setting: {
        toolbox: 'loops-if-else'
      },
      tasks: [],
      parts: [
        'loops-if-practice-1',
        'loops-if-practice-2',
        'loops-if-practice-3'
      ],
      parent: null,
      skill: 0
    },
    wormhole: {
      id: 'wormhole',
      granularity: 'phase',
      section: '2.2',
      level: 2,
      order: 2,
      setting: {},
      tasks: [
        'wormhole-demo'
      ],
      parts: [],
      parent: 'commands-2',
      skill: 0
    },
    'comparing-puzzles': {
      id: 'comparing-puzzles',
      granularity: 'phase',
      section: '7.3',
      level: 7,
      order: 3,
      setting: {},
      tasks: [
        'wave',
        'slalom-position-testing'
      ],
      parts: [],
      parent: 'comparing',
      skill: 0
    },
    'multiple-repeats': {
      id: 'multiple-repeats',
      granularity: 'phase',
      section: '3.2',
      level: 3,
      order: 2,
      setting: {},
      tasks: [
        'big-left-turn',
        'big-right-turn',
        'blocked-wormhole',
        'triangle',
        'n'
      ],
      parts: [],
      parent: 'repeat',
      skill: 0
    },
    'while': {
      id: 'while',
      granularity: 'mission',
      section: '4',
      level: 4,
      order: 4,
      setting: {
        toolbox: 'while'
      },
      tasks: [],
      parts: [
        'single-while',
        'multiple-whiles',
        'while-practice'
      ],
      parent: null,
      skill: 0
    },
    'comparing-practice': {
      id: 'comparing-practice',
      granularity: 'phase',
      section: '7.2',
      level: 7,
      order: 2,
      setting: {},
      tasks: [
        'free-column',
        'diamond-lines',
        'letter-h'
      ],
      parts: [],
      parent: 'comparing',
      skill: 0
    },
    'if-else': {
      id: 'if-else',
      granularity: 'mission',
      section: '8',
      level: 8,
      order: 8,
      setting: {
        toolbox: 'loops-if-else'
      },
      tasks: [],
      parts: [
        'if-else-intro',
        'if-else-practice',
        'if-else-puzzles'
      ],
      parent: null,
      skill: 0
    },
    'repeat-while-2': {
      id: 'repeat-while-2',
      granularity: 'phase',
      section: '5.2',
      level: 5,
      order: 2,
      setting: {},
      tasks: [
        'collect-diamonds',
        'color-slalom',
        'zig-zag-plus',
        'four-vs',
        'rectangle'
      ],
      parts: [],
      parent: 'loops',
      skill: 0
    },
    'shooting-wormholes': {
      id: 'shooting-wormholes',
      granularity: 'phase',
      section: '2.3',
      level: 2,
      order: 3,
      setting: {},
      tasks: [
        'tunnel',
        'dont-forget-shot',
        '2diamonds-2meteorids',
        'last-shot'
      ],
      parts: [],
      parent: 'commands-2',
      skill: 0
    },
    'commands-2': {
      id: 'commands-2',
      granularity: 'mission',
      section: '2',
      level: 2,
      order: 2,
      setting: {
        toolbox: 'shoot'
      },
      tasks: [],
      parts: [
        'shooting',
        'wormhole',
        'shooting-wormholes'
      ],
      parent: null,
      skill: 0
    },
    loops: {
      id: 'loops',
      granularity: 'mission',
      section: '5',
      level: 5,
      order: 5,
      setting: {
        toolbox: 'loops'
      },
      tasks: [],
      parts: [
        'repeat-while-1',
        'repeat-while-2',
        'loops-practice'
      ],
      parent: null,
      skill: 0
    },
    'single-while': {
      id: 'single-while',
      granularity: 'phase',
      section: '4.1',
      level: 4,
      order: 1,
      setting: {},
      tasks: [
        'zig-zag',
        'direct-flight-ahead'
      ],
      parts: [],
      parent: 'while',
      skill: 0
    },
    'repeat-practice': {
      id: 'repeat-practice',
      granularity: 'phase',
      section: '3.3',
      level: 3,
      order: 3,
      setting: {},
      tasks: [
        'steal-the-nose',
        'find-the-path',
        'stairs',
        'clean-your-path'
      ],
      parts: [],
      parent: 'repeat',
      skill: 0
    },
    'loops-if-practice-2': {
      id: 'loops-if-practice-2',
      granularity: 'phase',
      section: '9.2',
      level: 9,
      order: 2,
      setting: {},
      tasks: [
        'two-color-tracks',
        'diamond-ring',
        'cross-2',
        'diagonal-diamonds',
        'six-diamonds'
      ],
      parts: [],
      parent: 'loops-if',
      skill: 0
    },
    repeat: {
      id: 'repeat',
      granularity: 'mission',
      section: '3',
      level: 3,
      order: 3,
      setting: {
        toolbox: 'repeat'
      },
      tasks: [],
      parts: [
        'single-repeat',
        'multiple-repeats',
        'repeat-practice'
      ],
      parent: null,
      skill: 0
    },
    turn: {
      id: 'turn',
      granularity: 'phase',
      section: '1.2',
      level: 1,
      order: 2,
      setting: {},
      tasks: [
        'turning-right',
        'turning-left',
        'turning-right-and-left',
        'turning-left-and-right'
      ],
      parts: [],
      parent: 'commands',
      skill: 0
    },
    'loops-if-practice-1': {
      id: 'loops-if-practice-1',
      granularity: 'phase',
      section: '9.1',
      level: 9,
      order: 1,
      setting: {},
      tasks: [
        'five-diamonds',
        'mirror',
        'plan-your-shooting',
        'diagonal-lines',
        'wormhole-cloud',
        'edge-wormholes'
      ],
      parts: [],
      parent: 'loops-if',
      skill: 0
    },
    'while-practice': {
      id: 'while-practice',
      granularity: 'phase',
      section: '4.3',
      level: 4,
      order: 3,
      setting: {},
      tasks: [
        'diamond-in-house'
      ],
      parts: [],
      parent: 'while',
      skill: 0
    },
    'if-practice': {
      id: 'if-practice',
      granularity: 'phase',
      section: '6.2',
      level: 6,
      order: 2,
      setting: {},
      tasks: [
        'two-diamonds',
        'red-shooting',
        'yellow-squares'
      ],
      parts: [],
      parent: 'if',
      skill: 0
    },
    'if': {
      id: 'if',
      granularity: 'mission',
      section: '6',
      level: 6,
      order: 6,
      setting: {
        toolbox: 'loops-if'
      },
      tasks: [],
      parts: [
        'if-intro',
        'if-practice',
        'if-puzzles'
      ],
      parent: null,
      skill: 0
    },
    commands: {
      id: 'commands',
      granularity: 'mission',
      section: '1',
      level: 1,
      order: 1,
      setting: {
        toolbox: 'fly'
      },
      tasks: [],
      parts: [
        'fly-forward',
        'turn',
        'diamonds'
      ],
      parent: null,
      skill: 0
    },
    'if-intro': {
      id: 'if-intro',
      granularity: 'phase',
      section: '6.1',
      level: 6,
      order: 1,
      setting: {},
      tasks: [
        'on-yellow-to-left',
        'diamonds-with-signals',
        'follow-colors'
      ],
      parts: [],
      parent: 'if',
      skill: 0
    },
    'single-repeat': {
      id: 'single-repeat',
      granularity: 'phase',
      section: '3.1',
      level: 3,
      order: 1,
      setting: {},
      tasks: [
        'ladder',
        'diamonds-in-meteoroid-cloud'
      ],
      parts: [],
      parent: 'repeat',
      skill: 0
    },
    'loops-if-practice-3': {
      id: 'loops-if-practice-3',
      granularity: 'phase',
      section: '9.3',
      level: 9,
      order: 3,
      setting: {},
      tasks: [
        'triple-slalom',
        'turning-in-square',
        'letter-d',
        'meteoroids-on-left',
        'two-bit-instructions'
      ],
      parts: [],
      parent: 'loops-if',
      skill: 0
    },
    'if-else-intro': {
      id: 'if-else-intro',
      granularity: 'phase',
      section: '8.1',
      level: 8,
      order: 1,
      setting: {},
      tasks: [
        'letter-e',
        'narrow-passage',
        'color-navigation'
      ],
      parts: [],
      parent: 'if-else',
      skill: 0
    },
    'loops-practice': {
      id: 'loops-practice',
      granularity: 'phase',
      section: '5.3',
      level: 5,
      order: 3,
      setting: {},
      tasks: [
        'arrow',
        'double-track'
      ],
      parts: [],
      parent: 'loops',
      skill: 0
    },
    'repeat-while-1': {
      id: 'repeat-while-1',
      granularity: 'phase',
      section: '5.1',
      level: 5,
      order: 1,
      setting: {},
      tasks: [
        'diamond-cross',
        'stripes',
        'big-slalom',
        'double-bend'
      ],
      parts: [],
      parent: 'loops',
      skill: 0
    },
    shooting: {
      id: 'shooting',
      granularity: 'phase',
      section: '2.1',
      level: 2,
      order: 1,
      setting: {},
      tasks: [
        'shot',
        'shooting'
      ],
      parts: [],
      parent: 'commands-2',
      skill: 0
    },
    'fly-forward': {
      id: 'fly-forward',
      granularity: 'phase',
      section: '1.1',
      level: 1,
      order: 1,
      setting: {},
      tasks: [
        'three-steps-forward'
      ],
      parts: [],
      parent: 'commands',
      skill: 0
    },
    'if-else-practice': {
      id: 'if-else-practice',
      granularity: 'phase',
      section: '8.2',
      level: 8,
      order: 2,
      setting: {},
      tasks: [
        'bouncing-from-edge',
        'diamonds-on-yellow',
        'triple-steps'
      ],
      parts: [],
      parent: 'if-else',
      skill: 0
    },
    'if-puzzles': {
      id: 'if-puzzles',
      granularity: 'phase',
      section: '6.3',
      level: 6,
      order: 3,
      setting: {},
      tasks: [
        'belgian-flag'
      ],
      parts: [],
      parent: 'if',
      skill: 0
    },
    'comparing-intro': {
      id: 'comparing-intro',
      granularity: 'phase',
      section: '7.1',
      level: 7,
      order: 1,
      setting: {},
      tasks: [
        'chessboard',
        'edge-to-edge',
        'meteoroids-and-wormholes',
        'maneuvers-on-left'
      ],
      parts: [],
      parent: 'comparing',
      skill: 0
    }
  },
  instructions: {
    byId: {
      'env-recommended-task-button': {
        id: 'env-recommended-task-button',
        selectorClass: 'instructable-env-recommended-task-button',
        selector: '.instructable-env-recommended-task-button',
        position: 'top'
      },
      'env-menu': {
        id: 'env-menu',
        selectorClass: 'instructable-env-menu',
        selector: '.instructable-env-menu',
        position: 'bottom'
      },
      'env-levelbar': {
        id: 'env-levelbar',
        selectorClass: 'instructable-env-levelbar',
        selector: '.instructable-env-levelbar',
        position: 'bottom'
      },
      'env-help': {
        id: 'env-help',
        selectorClass: 'instructable-env-help',
        selector: '.instructable-env-help',
        position: 'bottom'
      },
      'env-feedback': {
        id: 'env-feedback',
        selectorClass: 'instructable-env-feedback',
        selector: '.instructable-env-feedback',
        position: 'bottom'
      },
      'env-login': {
        id: 'env-login',
        selectorClass: 'instructable-env-login',
        selector: '.instructable-env-login',
        position: 'bottom'
      },
      'task-space-world': {
        id: 'task-space-world',
        selectorClass: 'instructable-task-space-world',
        selector: '.instructable-task-space-world',
        position: 'bottom'
      },
      'task-toolbox': {
        id: 'task-toolbox',
        selectorClass: 'instructable-task-toolbox',
        selector: '.instructable-task-toolbox'
      },
      'task-snapping': {
        id: 'task-snapping',
        selectorClass: 'instructable-task-snapping',
        selector: '.instructable-task-snapping'
      },
      'task-controls': {
        id: 'task-controls',
        selectorClass: 'instructable-task-controls',
        selector: '.instructable-task-controls'
      },
      'task-asteroid': {
        id: 'task-asteroid',
        selectorClass: 'instructable-task-asteroid',
        selector: '.instructable-task-asteroid',
        position: 'bottom-left'
      },
      'task-meteoroid': {
        id: 'task-meteoroid',
        selectorClass: 'instructable-task-meteoroid',
        selector: '.instructable-task-meteoroid',
        position: 'bottom-left'
      },
      'task-diamond': {
        id: 'task-diamond',
        selectorClass: 'instructable-task-diamond',
        selector: '.instructable-task-diamond',
        position: 'bottom-left'
      },
      'task-diamond-status': {
        id: 'task-diamond-status',
        selectorClass: 'instructable-task-diamond-status',
        selector: '.instructable-task-diamond-status'
      },
      'task-wormhole': {
        id: 'task-wormhole',
        selectorClass: 'instructable-task-wormhole',
        selector: '.instructable-task-wormhole'
      },
      'task-energy-status': {
        id: 'task-energy-status',
        selectorClass: 'instructable-task-energy-status',
        selector: '.instructable-task-energy-status'
      },
      'task-length-limit': {
        id: 'task-length-limit',
        selectorClass: 'instructable-task-length-limit',
        selector: '.instructable-task-length-limit'
      },
      'task-block-fly': {
        id: 'task-block-fly',
        selectorClass: 'instructable-task-block-fly',
        selector: '.instructable-task-block-fly'
      },
      'task-block-shoot': {
        id: 'task-block-shoot',
        selectorClass: 'instructable-task-block-shoot',
        selector: '.instructable-task-block-shoot'
      },
      'task-block-repeat': {
        id: 'task-block-repeat',
        selectorClass: 'instructable-task-block-repeat',
        selector: '.instructable-task-block-repeat'
      },
      'task-block-while': {
        id: 'task-block-while',
        selectorClass: 'instructable-task-block-while',
        selector: '.instructable-task-block-while'
      },
      'task-block-color': {
        id: 'task-block-color',
        selectorClass: 'instructable-task-block-color',
        selector: '.instructable-task-block-color'
      },
      'task-block-position': {
        id: 'task-block-position',
        selectorClass: 'instructable-task-block-position',
        selector: '.instructable-task-block-position'
      },
      'task-block-if': {
        id: 'task-block-if',
        selectorClass: 'instructable-task-block-if',
        selector: '.instructable-task-block-if'
      },
      'task-block-if-else': {
        id: 'task-block-if-else',
        selectorClass: 'instructable-task-block-if-else',
        selector: '.instructable-task-block-if-else'
      },
      'editor-setting': {
        id: 'editor-setting',
        selectorClass: 'instructable-editor-setting',
        selector: '.instructable-editor-setting'
      },
      'editor-space-world': {
        id: 'editor-space-world',
        selectorClass: 'instructable-editor-space-world',
        selector: '.instructable-editor-space-world'
      },
      'overview-levels': {
        id: 'overview-levels',
        selectorClass: 'instructable-overview-levels',
        selector: '.instructable-overview-levels'
      },
      'overview-difficulty': {
        id: 'overview-difficulty',
        selectorClass: 'instructable-overview-difficulty',
        selector: '.instructable-overview-difficulty'
      },
      'overview-solved-task': {
        id: 'overview-solved-task',
        selectorClass: 'instructable-overview-solved-task',
        selector: '.instructable-overview-solved-task'
      },
      'overview-recommended-task': {
        id: 'overview-recommended-task',
        selectorClass: 'instructable-overview-recommended-task',
        selector: '.instructable-overview-recommended-task'
      },
      'task-spaceship': {
        position: 'bottom-left'
      }
    },
    all: [
      'env-recommended-task-button',
      'env-menu',
      'env-levelbar',
      'env-help',
      'env-feedback',
      'env-login',
      'task-space-world',
      'task-toolbox',
      'task-snapping',
      'task-controls',
      'task-asteroid',
      'task-meteoroid',
      'task-diamond',
      'task-diamond-status',
      'task-wormhole',
      'task-energy-status',
      'task-length-limit',
      'task-block-fly',
      'task-block-shoot',
      'task-block-repeat',
      'task-block-while',
      'task-block-color',
      'task-block-position',
      'task-block-if',
      'task-block-if-else',
      'editor-setting',
      'editor-space-world',
      'overview-levels',
      'overview-difficulty',
      'overview-solved-task',
      'overview-recommended-task'
    ],
    seen: [],
    instructables: {
      'env-menu': 1,
      'env-levelbar': 1,
      'env-help': 1,
      'env-feedback': 1,
      'env-login': 1,
      'task-space-world': 1,
      'env-recommended-task-button': 2,
      'task-asteroid': 3,
      'task-diamond': 2,
      'task-spaceship': 1,
      'task-meteoroid': 4
    },
    shown: false,
    scheduled: null
  },
  tasks: {
    'three-steps-forward': {
      id: 'three-steps-forward',
      category: 1,
      level: 1,
      levels: [
        1,
        1,
        1
      ],
      order: 1,
      problemSet: 'fly-forward',
      setting: {
        fields: 'b|b|b|b|b;k|k|k|k|k;k|k|k|k|k;k|k|kS|k|k'
      },
      solved: false,
      time: null,
      toolbox: [
        'fly'
      ]
    },
    'turning-right': {
      id: 'turning-right',
      category: 1,
      level: 1,
      levels: [
        1,
        2,
        1
      ],
      order: 1,
      problemSet: 'turn',
      setting: {
        fields: 'b|bM|b|b|bM;kA|k|kM|k|kA;k|kM|kA|k|k;kA|k|kS|k|kM'
      },
      solved: false,
      time: null
    },
    'turning-left': {
      id: 'turning-left',
      category: 1,
      level: 1,
      levels: [
        1,
        2,
        2
      ],
      order: 2,
      problemSet: 'turn',
      setting: {
        fields: 'bM|b|b|bM|b;kA|k|kM|k|kA;k|k|kA|kM|k;kM|k|kS|k|kA'
      },
      solved: false,
      time: null
    },
    'turning-right-and-left': {
      id: 'turning-right-and-left',
      category: 1,
      level: 1,
      levels: [
        1,
        2,
        3
      ],
      order: 3,
      problemSet: 'turn',
      setting: {
        fields: 'b|bM|b|bM|bA;k|kA|kA|k|kM;kA|kM|k|kM|kA;kM|k|kS|kM|k'
      },
      solved: false,
      time: null
    },
    'turning-left-and-right': {
      id: 'turning-left-and-right',
      category: 1,
      level: 1,
      levels: [
        1,
        2,
        4
      ],
      order: 4,
      problemSet: 'turn',
      setting: {
        fields: 'b|bM|b|bM|b;kM|kA|k|kA|k;kA|k|kA|kM|kA;k|kM|kS|k|kM'
      },
      solved: false,
      time: null
    },
    'diamond-on-right': {
      id: 'diamond-on-right',
      category: 1,
      level: 1,
      levels: [
        1,
        3,
        1
      ],
      order: 1,
      problemSet: 'diamonds',
      setting: {
        fields: 'b|bM|b|b|b;k|k|k|kA|k;kA|k|k|k|kD;k|kM|k|k|k;k|k|kS|k|kM'
      },
      solved: false,
      time: null
    },
    'beware-of-asteroid': {
      id: 'beware-of-asteroid',
      category: 1,
      level: 1,
      levels: [
        1,
        3,
        2
      ],
      order: 2,
      problemSet: 'diamonds',
      setting: {
        fields: 'bM|b|bD|b|b;k|kM|kA|k|kA;kA|k|kD|kM|k;k|k|kS|k|kM'
      },
      solved: false,
      time: null,
      toolbox: [
        'fly'
      ]
    },
    plus: {
      id: 'plus',
      category: 1,
      level: 1,
      levels: [
        1,
        3,
        3
      ],
      order: 3,
      problemSet: 'diamonds',
      setting: {
        fields: 'b|b|bD|b|b;k|k|kA|k|k;k|kA|kA|kA|k;k|k|kA|k|k;k|k|kS|k|k'
      },
      solved: false,
      time: null
    },
    'diamond-path': {
      id: 'diamond-path',
      category: 1,
      level: 1,
      levels: [
        1,
        3,
        4
      ],
      order: 4,
      problemSet: 'diamonds',
      setting: {
        fields: 'b|b|b|bD|b;k|k|kD|k|k;k|kD|k|k|k;k|k|kD|k|k;k|k|k|kD|k;k|k|kD|k|k;k|k|kS|k|k'
      },
      solved: false,
      time: null
    },
    'surrounded-diamond': {
      id: 'surrounded-diamond',
      category: 1,
      level: 1,
      levels: [
        1,
        3,
        5
      ],
      order: 5,
      problemSet: 'diamonds',
      setting: {
        fields: 'b|bA|bM|bM|b;kA|k|k|k|kA;k|k|kA|kM|k;k|kM|kD|k|k;k|kM|kA|k|kM;kA|k|kM|kA|k;kM|k|kA|k|k;k|k|kS|k|kM'
      },
      solved: false,
      time: null
    },
    shot: {
      id: 'shot',
      category: 2,
      level: 2,
      levels: [
        2,
        1,
        1
      ],
      order: 1,
      problemSet: 'shooting',
      setting: {
        fields: 'b|bA|b|bA|b;k|kA|kM|kA|k;k|kA|k|kA|k;k|kA|kS|kA|k'
      },
      solved: false,
      time: null
    },
    shooting: {
      id: 'shooting',
      category: 2,
      level: 2,
      levels: [
        2,
        1,
        2
      ],
      order: 2,
      problemSet: 'shooting',
      setting: {
        fields: 'bA|bA|bA|b|bA;kA|k|kA|kM|kA;kA|k|kA|kM|kA;kA|k|kA|k|kA;kA|k|k|k|kA;kA|k|kS|k|kA'
      },
      solved: false,
      time: null
    },
    'wormhole-demo': {
      id: 'wormhole-demo',
      category: 2,
      level: 2,
      levels: [
        2,
        2,
        1
      ],
      order: 1,
      problemSet: 'wormhole',
      setting: {
        fields: 'b|b|b|b|b;k|k|k|k|k;kW|k|kA|kA|kA;kA|kA|kA|k|kW;k|k|k|k|k;k|k|kS|k|k'
      },
      solved: false,
      time: null
    },
    tunnel: {
      id: 'tunnel',
      category: 2,
      level: 2,
      levels: [
        2,
        3,
        1
      ],
      order: 1,
      problemSet: 'shooting-wormholes',
      setting: {
        fields: 'b|b|b|b|b;kA|kA|kM|kA|kA;kA|kA|kM|kA|kA;kA|kA|kM|kA|kA;k|kD|k|k|k;k|k|k|k|k;k|k|k|k|k;k|k|k|kD|k;k|k|k|k|k;k|k|kS|k|k'
      },
      solved: false,
      time: null
    },
    'dont-forget-shot': {
      id: 'dont-forget-shot',
      category: 2,
      level: 2,
      levels: [
        2,
        3,
        2
      ],
      order: 2,
      problemSet: 'shooting-wormholes',
      setting: {
        fields: 'b|b|b|b|b;k|kM|kA|kA|kA;k|k|k|k|k;k|k|k|kD|k;k|k|k|k|k;k|k|k|k|k;k|k|k|k|k;k|k|kS|k|k'
      },
      solved: false,
      time: null
    },
    '2diamonds-2meteorids': {
      id: '2diamonds-2meteorids',
      category: 2,
      level: 2,
      levels: [
        2,
        3,
        3
      ],
      order: 3,
      problemSet: 'shooting-wormholes',
      setting: {
        fields: 'b|b|b|b|b;kW|kA|kA|k|k;k|kD|kM|kA|kA;k|kD|kM|kA|kA;k|k|k|k|k;k|k|kS|k|kW'
      },
      solved: false,
      time: null
    },
    'last-shot': {
      id: 'last-shot',
      category: 2,
      level: 2,
      levels: [
        2,
        3,
        4
      ],
      order: 4,
      problemSet: 'shooting-wormholes',
      setting: {
        fields: 'b|b|b|b|b;kM|kA|kM|kM|k;kM|k|kA|k|kM;k|kA|kM|kA|kM;k|k|kA|k|k;k|k|k|k|k;k|k|kS|k|k',
        energy: 1
      },
      solved: false,
      time: null
    },
    ladder: {
      id: 'ladder',
      category: 3,
      level: 3,
      levels: [
        3,
        1,
        1
      ],
      order: 1,
      problemSet: 'single-repeat',
      setting: {
        fields: 'b|bA|bM|bA|b;k|kA|k|kA|k;k|kA|kM|kA|k;k|kA|k|kA|k;k|kA|kM|kA|k;k|kA|k|kA|k;k|kA|kM|kA|k;k|kA|k|kA|k;k|kA|kS|kA|k',
        energy: 4,
        length: 3
      },
      solved: false,
      time: null
    },
    'diamonds-in-meteoroid-cloud': {
      id: 'diamonds-in-meteoroid-cloud',
      category: 3,
      level: 3,
      levels: [
        3,
        1,
        2
      ],
      order: 2,
      problemSet: 'single-repeat',
      setting: {
        fields: 'b|b|b|b|b;k|k|k|kM|kD;k|k|k|kM|kM;k|k|kM|kD|kM;k|k|kM|kM|k;k|kM|kD|kM|k;k|kM|kM|k|k;kM|kD|kM|k|k;kM|kM|k|k|k;kS|k|k|k|k',
        length: 4
      },
      solved: false,
      time: null
    },
    'big-left-turn': {
      id: 'big-left-turn',
      category: 3,
      level: 3,
      levels: [
        3,
        2,
        1
      ],
      order: 1,
      problemSet: 'multiple-repeats',
      setting: {
        fields: 'bA|bA|bA|b|bA;kA|kA|k|k|kA;kA|k|k|kA|kA;k|k|kA|kA|kA;k|kA|kA|kA|kA;k|kA|kA|kA|kA;k|k|kA|kA|kA;kA|k|k|kA|kA;kA|kA|k|k|kA;kA|kA|kA|kS|kA'
      },
      solved: false,
      time: null
    },
    'big-right-turn': {
      id: 'big-right-turn',
      category: 3,
      level: 3,
      levels: [
        3,
        2,
        2
      ],
      order: 2,
      problemSet: 'multiple-repeats',
      setting: {
        fields: 'b|bM|bA|bA|bA;kM|k|kM|kA|kA;kA|kM|k|kM|kA;kA|kA|kM|k|kM;kA|kA|kA|kM|k;kA|kA|kA|kM|k;kA|kA|kM|k|kM;kA|kM|k|kM|kA;kA|kS|kM|kA|kA',
        length: 5
      },
      solved: false,
      time: null
    },
    'blocked-wormhole': {
      id: 'blocked-wormhole',
      category: 3,
      level: 3,
      levels: [
        3,
        2,
        3
      ],
      order: 3,
      problemSet: 'multiple-repeats',
      setting: {
        fields: 'bA|bA|bA|b|bA;kA|kW|kA|k|kA;kA|kM|kA|k|kA;kA|kM|kA|k|kA;kA|kM|kA|kW|kA;kA|k|kA|kA|kA;kA|k|kA|kA|kA;kA|k|kA|kA|kA;kA|k|kA|kA|kA;kA|kS|kA|kA|kA',
        energy: 3,
        length: 4
      },
      solved: false,
      time: null
    },
    triangle: {
      id: 'triangle',
      category: 3,
      level: 3,
      levels: [
        3,
        2,
        4
      ],
      order: 4,
      problemSet: 'multiple-repeats',
      setting: {
        fields: 'bX|b|b|b|b;k|kD|k|k|k;k|kD|kD|k|k;k|kD|k|kD|k;k|kD|k|k|kD;k|kD|k|kD|k;k|kD|kD|k|k;k|kD|k|k|k;kS|kX|k|k|k',
        length: 6
      },
      solved: false,
      time: null
    },
    n: {
      id: 'n',
      category: 3,
      level: 3,
      levels: [
        3,
        2,
        5
      ],
      order: 5,
      problemSet: 'multiple-repeats',
      setting: {
        fields: 'b|b|b|b|b;kWD|k|k|k|kD;kD|kXD|k|k|kD;kD|k|kD|k|kD;kD|k|k|kD|kXD;kS|k|k|k|kWD',
        length: 6
      },
      solved: false,
      time: null
    },
    'steal-the-nose': {
      id: 'steal-the-nose',
      category: 3,
      level: 3,
      levels: [
        3,
        3,
        1
      ],
      order: 1,
      problemSet: 'repeat-practice',
      setting: {
        fields: 'b|b|b|b|b;k|kW|k|kW|k;k|k|k|k|k;k|k|yD|k|k;rA|k|k|k|rA;k|rA|rA|rA|k;kS|k|k|k|k',
        length: 4
      },
      solved: false,
      time: null
    },
    'find-the-path': {
      id: 'find-the-path',
      category: 3,
      level: 3,
      levels: [
        3,
        3,
        2
      ],
      order: 2,
      problemSet: 'repeat-practice',
      setting: {
        fields: 'b|bA|b|bA|b;kM|kM|kA|k|kM;kM|k|kA|k|kM;k|kA|k|kA|k;kA|kM|kM|kA|kA;k|k|kM|k|k;k|kA|k|kA|k;kM|kM|kM|k|kM;kA|k|kA|kM|kA;k|k|kS|k|k',
        length: 4
      },
      solved: false,
      time: null
    },
    stairs: {
      id: 'stairs',
      category: 3,
      level: 3,
      levels: [
        3,
        3,
        3
      ],
      order: 3,
      problemSet: 'repeat-practice',
      setting: {
        fields: 'b|b|b|b|b;k|k|k|k|kD;k|k|k|k|kD;k|k|k|kD|k;k|k|k|kD|k;k|k|kD|k|k;k|k|kD|k|k;k|kD|k|k|k;k|kD|k|k|k;kD|k|k|k|k;kD|k|k|k|k;kS|k|k|k|k',
        length: 6
      },
      solved: false,
      time: null
    },
    'clean-your-path': {
      id: 'clean-your-path',
      category: 3,
      level: 3,
      levels: [
        3,
        3,
        4
      ],
      order: 4,
      problemSet: 'repeat-practice',
      setting: {
        fields: 'b|b|b|b|b|b|b;kW|kM|kA|k|k|k|k;k|k|kM|kA|k|k|k;k|k|k|kM|kA|k|k;k|k|k|k|kM|kA|k;k|k|k|k|k|kM|kA;k|k|k|k|k|k|kD;k|k|k|k|k|k|kW;k|k|k|k|k|k|k;k|k|k|k|k|k|k;k|k|k|k|k|k|k;k|k|k|k|k|kS|k',
        length: 7
      },
      solved: false,
      time: null
    },
    'zig-zag': {
      id: 'zig-zag',
      category: 4,
      level: 4,
      levels: [
        4,
        1,
        1
      ],
      order: 1,
      problemSet: 'single-while',
      setting: {
        fields: 'b|b|b|b|b;kA|k|kA|k|kA;k|kA|k|kA|k;kA|k|kA|k|kA;k|kA|k|kA|k;kA|k|kA|k|kA;k|kA|k|kA|k;kA|k|kA|k|kA;k|k|kS|k|k',
        length: 3
      },
      solved: false,
      time: null
    },
    'direct-flight-ahead': {
      id: 'direct-flight-ahead',
      category: 4,
      level: 4,
      levels: [
        4,
        1,
        2
      ],
      order: 2,
      problemSet: 'single-while',
      setting: {
        fields: 'b|b|b|bD|b;k|kW|k|k|k;k|k|k|kD|k;k|kD|k|k|k;k|k|k|kD|k;k|kD|k|k|k;k|k|k|kD|k;k|kD|k|k|k;k|k|k|kD|k;k|kS|k|kW|k',
        length: 2
      },
      solved: false,
      time: null
    },
    'yellow-is-not-red': {
      id: 'yellow-is-not-red',
      category: 4,
      level: 4,
      levels: [
        4,
        2,
        1
      ],
      order: 1,
      problemSet: 'multiple-whiles',
      setting: {
        fields: 'b|b|b|b|b;k|k|k|kD|k;k|k|k|y|k;k|k|kD|k|k;k|kD|k|k|k;kD|k|k|k|k;k|r|k|k|k;k|k|r|k|k;k|k|k|r|k;k|k|k|k|rS',
        length: 6
      },
      solved: false,
      time: null
    },
    'yellow-hint': {
      id: 'yellow-hint',
      category: 4,
      level: 4,
      levels: [
        4,
        2,
        2
      ],
      order: 2,
      problemSet: 'multiple-whiles',
      setting: {
        fields: 'b|b|b|b|b;k|k|k|kD|k;k|k|k|kD|k;k|k|k|kD|k;k|k|k|kD|k;k|k|yD|k|k;k|yD|k|k|k;yS|k|k|k|k',
        length: 4
      },
      solved: false,
      time: null
    },
    'stop-on-red': {
      id: 'stop-on-red',
      category: 4,
      level: 4,
      levels: [
        4,
        2,
        3
      ],
      order: 3,
      problemSet: 'multiple-whiles',
      setting: {
        fields: 'b|b|b|b|b;k|k|k|k|k;k|k|k|k|k;k|k|k|k|k;kA|kA|kM|kA|kA;k|k|rD|k|k;k|k|k|k|k;k|k|k|k|k;k|k|k|k|k;k|k|kS|k|k',
        energy: 1,
        length: 5
      },
      solved: false,
      time: null
    },
    'direction-change': {
      id: 'direction-change',
      category: 4,
      level: 4,
      levels: [
        4,
        2,
        4
      ],
      order: 4,
      problemSet: 'multiple-whiles',
      setting: {
        fields: 'b|b|b|b|b;k|k|k|k|k;kA|kA|k|kA|kA;k|k|k|k|k;kA|kA|kA|kA|y;k|k|k|k|k;k|k|k|k|k;k|k|k|k|k;k|k|k|k|k;k|k|k|k|k;k|k|k|k|kS',
        length: 4
      },
      solved: false,
      time: null
    },
    'diamond-in-house': {
      id: 'diamond-in-house',
      category: 4,
      level: 4,
      levels: [
        4,
        3,
        1
      ],
      order: 1,
      problemSet: 'while-practice',
      setting: {
        fields: 'b|b|bA|b|b;k|kA|y|kA|k;kA|y|y|y|kA;y|yA|yA|yA|y;k|kA|kX|kA|k;kW|kA|kD|kA|kX;k|kA|kW|kA|k;k|kA|kA|kA|k;g|g|g|g|g;g|g|g|g|g;g|g|g|gS|g'
      },
      solved: false,
      time: null
    },
    'diamond-cross': {
      id: 'diamond-cross',
      category: 5,
      level: 5,
      levels: [
        5,
        1,
        1
      ],
      order: 1,
      problemSet: 'repeat-while-1',
      setting: {
        fields: 'b|b|b|b|b;kW|k|k|k|k;k|kD|k|kD|k;k|k|kD|k|k;k|kD|k|kD|k;kW|k|k|k|kS',
        length: 5
      },
      solved: false,
      time: null
    },
    stripes: {
      id: 'stripes',
      category: 5,
      level: 5,
      levels: [
        5,
        1,
        2
      ],
      order: 2,
      problemSet: 'repeat-while-1',
      setting: {
        fields: 'b|bW|b|bX|b|b;k|kD|k|kD|k|kD;k|kD|k|kD|k|kD;k|kD|k|kD|k|kD;k|kD|k|kD|k|kD;k|kD|k|kD|k|kD;kS|k|kW|k|kX|k',
        length: 4
      },
      solved: false,
      time: null
    },
    'big-slalom': {
      id: 'big-slalom',
      category: 5,
      level: 5,
      levels: [
        5,
        1,
        3
      ],
      order: 3,
      problemSet: 'repeat-while-1',
      setting: {
        fields: 'bD|b|b|b;k|kD|k|k;k|k|kD|k;k|k|k|kD;k|k|kD|k;k|kD|k|k;kD|k|k|k;k|kD|k|k;k|k|kD|k;k|k|k|kD;k|k|kD|k;k|kD|k|k;kS|k|k|k',
        length: 5
      },
      solved: false,
      time: null
    },
    'double-bend': {
      id: 'double-bend',
      category: 5,
      level: 5,
      levels: [
        5,
        1,
        4
      ],
      order: 4,
      problemSet: 'repeat-while-1',
      setting: {
        fields: 'b|b|b|b|bD;k|k|k|kD|kW;k|k|kD|kD|k;k|kD|kD|k|k;kD|kD|k|k|k;kD|kD|k|k|k;k|kD|kD|k|k;k|k|kD|kD|k;k|k|k|kD|kW;k|k|k|k|kS',
        length: 5
      },
      solved: false,
      time: null
    },
    'collect-diamonds': {
      id: 'collect-diamonds',
      category: 5,
      level: 5,
      levels: [
        5,
        2,
        1
      ],
      order: 1,
      problemSet: 'repeat-while-2',
      setting: {
        fields: 'b|b|b|b|b;k|k|k|k|kD;k|k|k|k|kD;k|k|k|k|kD;k|k|k|k|k;kA|kA|k|kA|kA;k|k|k|k|k;k|k|k|k|k;kD|k|k|k|k;kD|k|k|k|k;kD|k|k|k|k;k|k|k|k|k;k|k|kS|k|k',
        length: 8
      },
      solved: false,
      time: null
    },
    'color-slalom': {
      id: 'color-slalom',
      category: 5,
      level: 5,
      levels: [
        5,
        2,
        2
      ],
      order: 2,
      problemSet: 'repeat-while-2',
      setting: {
        fields: 'b|b|b|b|b;k|rD|k|k|k;k|k|k|k|k;k|k|k|k|k;k|k|k|k|yD;k|k|k|k|k;k|k|k|k|k;k|rD|k|k|k;k|k|k|k|k;k|k|k|yD|k;k|k|k|k|k;k|k|k|k|k;kS|k|k|k|k',
        length: 6
      },
      solved: false,
      time: null
    },
    'zig-zag-plus': {
      id: 'zig-zag-plus',
      category: 5,
      level: 5,
      levels: [
        5,
        2,
        3
      ],
      order: 3,
      problemSet: 'repeat-while-2',
      setting: {
        fields: 'b|b|b|b|b;kA|k|kA|k|kA;k|kA|k|kA|k;kA|k|kA|k|kA;k|kA|kM|kA|k;kA|k|kA|k|kA;kM|kA|k|kA|kM;kA|k|kA|k|kA;k|kA|k|kA|k;kA|k|kA|k|kA;k|kA|k|kA|k;kA|k|kA|k|kA;k|k|kS|k|k',
        length: 8
      },
      solved: false,
      time: null
    },
    'four-vs': {
      id: 'four-vs',
      category: 5,
      level: 5,
      levels: [
        5,
        2,
        4
      ],
      order: 4,
      problemSet: 'repeat-while-2',
      setting: {
        fields: 'b|b|b|b|b;k|kY|kD|k|k;k|kX|kD|kD|k;k|kW|kD|kD|kD;k|k|gD|kD|kD;k|k|kD|gD|kD;k|kY|kD|kD|gD;k|kX|kD|gD|k;k|kW|gD|k|k;k|kS|k|k|k',
        length: 5
      },
      solved: false,
      time: null
    },
    rectangle: {
      id: 'rectangle',
      category: 5,
      level: 5,
      levels: [
        5,
        2,
        5
      ],
      order: 5,
      problemSet: 'repeat-while-2',
      setting: {
        fields: 'b|bY|bX|b|b;k|kM|kM|kM|k;k|kD|kD|kD|k;k|kD|kD|kD|k;k|kD|kD|kD|k;k|kD|kD|kD|k;k|kD|kD|kD|k;k|kS|kY|kX|k',
        energy: 3,
        length: 5
      },
      solved: false,
      time: null
    },
    arrow: {
      id: 'arrow',
      category: 5,
      level: 5,
      levels: [
        5,
        3,
        1
      ],
      order: 1,
      problemSet: 'loops-practice',
      setting: {
        fields: 'b|b|b|b|b;kD|k|k|k|k;k|kM|k|k|k;k|k|kD|k|k;k|k|k|kD|k;kW|k|kA|kA|kM;k|k|k|kD|k;k|k|kD|k|k;k|kD|k|k|k;kD|k|k|k|k;k|k|k|k|k;kW|k|k|k|kS',
        energy: 2
      },
      solved: false,
      time: null
    },
    'double-track': {
      id: 'double-track',
      category: 5,
      level: 5,
      levels: [
        5,
        3,
        2
      ],
      order: 2,
      problemSet: 'loops-practice',
      setting: {
        fields: 'b|b|b|b|b|b;kW|kD|k|k|k|k;kD|kD|k|k|k|k;k|kD|kD|k|k|k;k|k|kD|kD|k|k;k|k|kD|kD|k|k;k|k|kD|kD|k|k;k|k|kD|kD|k|k;k|k|k|kD|kD|k;k|k|k|k|kD|kD;k|k|k|k|kD|kD;k|k|k|k|kD|kD;k|k|k|k|kS|kW',
        length: 8
      },
      solved: false,
      time: null
    },
    'on-yellow-to-left': {
      id: 'on-yellow-to-left',
      category: 6,
      level: 6,
      levels: [
        6,
        1,
        1
      ],
      order: 1,
      problemSet: 'if-intro',
      setting: {
        fields: 'b|b|b|b|b;k|kA|kA|kA|kA;kA|y|k|k|k;k|k|k|k|k;k|k|k|k|k;k|k|kA|kA|kA;kA|kA|y|k|k;k|k|k|k|k;k|k|kS|k|k',
        length: 4
      },
      solved: false,
      time: null
    },
    'diamonds-with-signals': {
      id: 'diamonds-with-signals',
      category: 6,
      level: 6,
      levels: [
        6,
        1,
        2
      ],
      order: 2,
      problemSet: 'if-intro',
      setting: {
        fields: 'b|b|b|b|bA;k|k|k|kD|kA;k|k|y|k|kA;k|k|k|kA|kA;k|k|k|kD|kA;k|k|y|k|kA;k|k|k|k|kA;k|k|k|kA|kA;k|k|k|k|kA;k|k|k|kD|kA;k|k|y|k|kA;k|k|kS|k|kA',
        length: 5
      },
      solved: false,
      time: null
    },
    'follow-colors': {
      id: 'follow-colors',
      category: 6,
      level: 6,
      levels: [
        6,
        1,
        3
      ],
      order: 3,
      problemSet: 'if-intro',
      setting: {
        fields: 'b|b|b|b|b;kA|kA|k|k|k;k|y|kA|kA|k;k|k|r|kA|kA;kA|kA|kA|r|k;k|k|y|k|k;k|k|kS|k|k',
        length: 7
      },
      solved: false,
      time: null
    },
    'two-diamonds': {
      id: 'two-diamonds',
      category: 6,
      level: 6,
      levels: [
        6,
        2,
        1
      ],
      order: 1,
      problemSet: 'if-practice',
      setting: {
        fields: 'b|b|b|b;kA|kA|k|kA;kW|k|k|k;k|k|k|k;kD|k|kD|k;kM|y|kM|y;k|k|k|k;k|k|k|k;k|k|k|kW;k|k|k|k;k|kS|k|k',
        length: 4
      },
      solved: false,
      time: null
    },
    'red-shooting': {
      id: 'red-shooting',
      category: 6,
      level: 6,
      levels: [
        6,
        2,
        2
      ],
      order: 2,
      problemSet: 'if-practice',
      setting: {
        fields: 'b|b|b|b|b|b;kA|kA|kA|kA|kA|kM;k|k|kW|k|k|k;k|y|k|k|k|r;kM|kM|kA|k|y|k;k|k|kA|k|k|k;k|r|kA|y|k|k;y|k|kA|k|k|k;kS|k|k|kW|k|k',
        energy: 2,
        length: 6
      },
      solved: false,
      time: null
    },
    'yellow-squares': {
      id: 'yellow-squares',
      category: 6,
      level: 6,
      levels: [
        6,
        2,
        3
      ],
      order: 3,
      problemSet: 'if-practice',
      setting: {
        fields: 'b|b|b|b|b;k|k|yM|yM|k;k|k|yM|yD|k;k|kW|k|k|k;yM|yM|k|yM|yM;yM|yD|k|yD|yM;k|k|k|kW|k;k|yM|yM|k|k;k|yD|yM|k|k;k|k|k|k|k;k|kS|k|k|k',
        energy: 4,
        length: 4
      },
      solved: false,
      time: null
    },
    'belgian-flag': {
      id: 'belgian-flag',
      category: 6,
      level: 6,
      levels: [
        6,
        3,
        1
      ],
      order: 1,
      problemSet: 'if-puzzles',
      setting: {
        fields: 'b|b|b|b|b|b;kY|kA|kW|kA|kA|k;kD|k|y|yD|rD|r;kD|k|yD|y|r|rD;kD|k|y|yD|rD|r;kD|k|yD|y|r|rD;kW|kA|k|kA|kA|kY;k|k|kS|k|k|k',
        length: 9
      },
      solved: false,
      time: null
    },
    chessboard: {
      id: 'chessboard',
      category: 7,
      level: 7,
      levels: [
        7,
        1,
        1
      ],
      order: 1,
      problemSet: 'comparing-intro',
      setting: {
        fields: 'bY|b|b|b|b;kD|k|kD|k|k;kX|kD|k|kD|k;kD|k|kD|k|kY;kW|kD|k|kD|k;kD|k|kD|k|kX;k|kD|k|kD|k;k|k|kS|k|kW',
        length: 4
      },
      solved: false,
      time: null
    },
    'edge-to-edge': {
      id: 'edge-to-edge',
      category: 7,
      level: 7,
      levels: [
        7,
        1,
        2
      ],
      order: 2,
      problemSet: 'comparing-intro',
      setting: {
        fields: 'b|b|b|b|b;k|kD|k|k|k;k|k|kD|k|k;k|k|k|kD|k;k|k|k|k|kD;k|k|k|kD|k;k|kW|kD|k|k;k|kD|kD|k|k;kD|k|k|kD|k;k|kD|k|k|kD;k|k|kD|kD|k;k|k|kD|kW|k;k|kS|k|k|k',
        length: 5
      },
      solved: false,
      time: null
    },
    'meteoroids-and-wormholes': {
      id: 'meteoroids-and-wormholes',
      category: 7,
      level: 7,
      levels: [
        7,
        1,
        3
      ],
      order: 3,
      problemSet: 'comparing-intro',
      setting: {
        fields: 'b|b|b|b|b;k|k|k|kA|kM;k|k|k|k|kD;k|k|k|k|kY;k|k|kY|kA|kM;k|k|k|k|kD;k|k|k|k|kX;k|k|k|kA|kM;k|kX|k|k|kD;k|k|k|k|kW;k|k|k|kA|kM;k|k|k|k|kD;kW|k|k|k|k;k|k|kS|k|k',
        length: 5
      },
      solved: false,
      time: null
    },
    'maneuvers-on-left': {
      id: 'maneuvers-on-left',
      category: 7,
      level: 7,
      levels: [
        7,
        1,
        4
      ],
      order: 4,
      problemSet: 'comparing-intro',
      setting: {
        fields: 'bM|bM|b|b|b;kM|kZ|k|k|k;kM|kM|k|k|k;kM|kD|k|k|k;kX|kY|kW|kY|kZ;kM|kM|k|k|k;kD|kM|k|k|k;kW|kM|k|k|k;kM|kM|kS|kX|k',
        length: 6
      },
      solved: false,
      time: null
    },
    'free-column': {
      id: 'free-column',
      category: 7,
      level: 7,
      levels: [
        7,
        2,
        1
      ],
      order: 1,
      problemSet: 'comparing-practice',
      setting: {
        fields: 'bA|bA|bA|b|bA;kA|kW|kA|kM|kA;kA|k|kA|kZ|kA;kA|k|kA|kA|kX;kA|k|kA|kA|kM;kZ|kX|kY|kA|k;kM|kA|kM|kA|kM;k|kA|k|kA|k;kM|kA|kM|kA|kM;kW|kA|kS|kA|kY',
        energy: 8,
        length: 4
      },
      solved: false,
      time: null
    },
    'diamond-lines': {
      id: 'diamond-lines',
      category: 7,
      level: 7,
      levels: [
        7,
        2,
        2
      ],
      order: 2,
      problemSet: 'comparing-practice',
      setting: {
        fields: 'b|b|b|b|bD;k|k|k|kD|k;k|k|kD|k|k;k|k|kD|k|k;k|kD|k|k|k;kW|k|k|k|kW;k|k|k|kD|k;k|k|kD|k|k;k|k|kD|k|k;k|kD|k|k|k;kS|k|k|k|k',
        length: 4
      },
      solved: false,
      time: null
    },
    'letter-h': {
      id: 'letter-h',
      category: 7,
      level: 7,
      levels: [
        7,
        2,
        3
      ],
      order: 3,
      problemSet: 'comparing-practice',
      setting: {
        fields: 'b|b|b|b|b;kY|k|k|k|kD;kM|k|k|k|kD;kM|k|k|k|kD;kX|k|k|k|kY;kM|kM|kM|kM|kM;kW|k|k|k|kX;kM|k|k|k|kD;kM|k|k|k|kD;kS|k|k|k|kW',
        energy: 4,
        length: 5
      },
      solved: false,
      time: null
    },
    wave: {
      id: 'wave',
      category: 7,
      level: 7,
      levels: [
        7,
        3,
        1
      ],
      order: 1,
      problemSet: 'comparing-puzzles',
      setting: {
        fields: 'b|bD|b|b|b;k|yD|k|k|k;k|k|yD|k|k;k|k|k|yD|k;k|k|k|yD|k;k|k|yD|k|k;k|yD|k|k|k;k|yD|k|k|k;k|k|yD|k|k;k|k|k|yD|k;k|k|k|yD|k;k|k|yS|k|k',
        length: 7
      },
      solved: false,
      time: null
    },
    'slalom-position-testing': {
      id: 'slalom-position-testing',
      category: 7,
      level: 7,
      levels: [
        7,
        3,
        2
      ],
      order: 2,
      problemSet: 'comparing-puzzles',
      setting: {
        fields: 'b|bD|b|b|b;kD|k|k|k|k;k|kD|k|k|k;kD|k|k|k|k;k|kD|k|k|k;k|k|kD|k|k;k|kD|k|k|k;k|k|kD|k|k;k|k|k|kS|k',
        length: 5
      },
      solved: false,
      time: null
    },
    'letter-e': {
      id: 'letter-e',
      category: 8,
      level: 8,
      levels: [
        8,
        1,
        1
      ],
      order: 1,
      problemSet: 'if-else-intro',
      setting: {
        fields: 'b|b|b|b|b;kD|k|k|k|k;kY|kD|k|k|k;kD|k|kD|k|k;kD|k|k|kY|k;kZ|kD|k|k|k;kD|k|kD|k|k;kD|k|k|kZ|k;k|kD|k|k|k;k|k|kD|k|k;k|k|k|kS|k',
        length: 4
      },
      solved: false,
      time: null
    },
    'narrow-passage': {
      id: 'narrow-passage',
      category: 8,
      level: 8,
      levels: [
        8,
        1,
        2
      ],
      order: 2,
      problemSet: 'if-else-intro',
      setting: {
        fields: 'b|b|b|b|b;kA|kA|kA|kA|k;k|k|k|k|k;k|k|k|k|k;k|k|k|k|k;kA|kA|kA|kA|k;k|k|k|k|kW;k|k|k|k|k;k|kW|k|k|k;kA|kA|kA|kA|k;k|k|k|k|k;k|k|k|k|k;k|k|k|k|k;kS|k|k|k|k',
        length: 4
      },
      solved: false,
      time: null
    },
    'color-navigation': {
      id: 'color-navigation',
      category: 8,
      level: 8,
      levels: [
        8,
        1,
        3
      ],
      order: 3,
      problemSet: 'if-else-intro',
      setting: {
        fields: 'b|b|b|b|b;kD|k|k|kW|k;k|yD|k|kD|k;k|kD|k|kD|k;rD|k|k|k|yD;k|yD|k|rD|k;k|kD|k|kD|k;k|kD|rD|k|k;rD|k|kD|k|k;kD|k|kD|k|k;kW|k|kS|k|k',
        length: 6
      },
      solved: false,
      time: null
    },
    'bouncing-from-edge': {
      id: 'bouncing-from-edge',
      category: 8,
      level: 8,
      levels: [
        8,
        2,
        1
      ],
      order: 1,
      problemSet: 'if-else-practice',
      setting: {
        fields: 'b|b|bD|b|b;k|k|k|kD|k;k|k|k|k|kD;k|k|k|kD|k;k|k|k|k|kD;k|k|k|kD|k;k|k|k|k|kD;k|k|k|kD|k;k|k|kD|k|k;k|kS|k|k|k',
        length: 5
      },
      solved: false,
      time: null
    },
    'diamonds-on-yellow': {
      id: 'diamonds-on-yellow',
      category: 8,
      level: 8,
      levels: [
        8,
        2,
        2
      ],
      order: 2,
      problemSet: 'if-else-practice',
      setting: {
        fields: 'b|b|b|b|b;k|yD|k|k|k;k|k|yD|k|k;k|k|k|k|k;k|k|k|k|k;k|yD|k|k|k;k|k|yD|k|k;k|k|k|yD|k;k|k|k|k|k;k|k|k|k|k;k|k|yD|k|k;k|k|k|yS|k',
        length: 4
      },
      solved: false,
      time: null
    },
    'triple-steps': {
      id: 'triple-steps',
      category: 8,
      level: 8,
      levels: [
        8,
        2,
        3
      ],
      order: 3,
      problemSet: 'if-else-practice',
      setting: {
        fields: 'b|b|b|b|b|b;k|k|k|kD|k|k;k|k|kD|k|k|k;k|yD|k|k|k|k;k|k|kD|k|k|kX;k|k|k|kD|kD|k;k|k|k|kD|kX|k;kW|k|yD|k|k|k;k|kD|k|kD|k|k;k|k|kD|k|kD|k;k|k|k|kS|k|kW',
        length: 6
      },
      solved: false,
      time: null
    },
    'colorful-flowers': {
      id: 'colorful-flowers',
      category: 8,
      level: 8,
      levels: [
        8,
        3,
        1
      ],
      order: 1,
      problemSet: 'if-else-puzzles',
      setting: {
        fields: 'b|b|b|b|b|b;k|kW|k|k|k|k;k|yD|k|k|k|k;rD|k|r|k|k|k;k|gD|k|k|yD|k;k|k|k|g|k|gD;k|yD|k|k|rD|k;rD|k|y|k|k|k;k|gD|k|k|kW|k;k|kS|k|k|k|k',
        length: 6
      },
      solved: false,
      time: null
    },
    'five-diamonds': {
      id: 'five-diamonds',
      category: 9,
      level: 9,
      levels: [
        9,
        1,
        1
      ],
      order: 1,
      problemSet: 'loops-if-practice-1',
      setting: {
        fields: 'b|b|b|b|b;k|kX|kD|k|k;kW|yD|yD|k|k;yD|k|kD|k|k;k|k|k|k|kX;k|k|k|k|kW;k|k|k|k|k;k|k|k|k|kS',
        length: 5
      },
      solved: false,
      time: null
    },
    mirror: {
      id: 'mirror',
      category: 9,
      level: 9,
      levels: [
        9,
        1,
        2
      ],
      order: 2,
      problemSet: 'loops-if-practice-1',
      setting: {
        fields: 'b|b|b|b|b|b|b;k|k|kW|kA|kD|k|k;k|k|k|kA|k|k|k;k|rD|k|kA|k|rD|k;k|k|y|kA|y|k|k;k|rD|k|kA|k|rD|k;k|k|k|kA|k|k|k;rD|k|k|kA|k|k|rD;k|y|k|kA|k|y|k;rD|k|k|kA|k|k|rD;k|y|k|kA|k|y|k;k|k|y|kA|y|k|k;k|k|kS|kA|kW|k|k',
        length: 13
      },
      solved: false,
      time: null
    },
    'plan-your-shooting': {
      id: 'plan-your-shooting',
      category: 9,
      level: 9,
      levels: [
        9,
        1,
        3
      ],
      order: 3,
      problemSet: 'loops-if-practice-1',
      setting: {
        fields: 'bA|bW|bA|bM|bA;kA|kD|kA|kD|kA;kA|kM|kA|kM|kA;kA|kM|kA|kM|kA;k|k|k|k|k;k|k|k|k|k;k|k|k|k|k;k|k|k|k|k;k|k|k|k|k;k|k|k|k|k;k|kS|k|kW|k',
        energy: 5,
        length: 5
      },
      solved: false,
      time: null
    },
    'diagonal-lines': {
      id: 'diagonal-lines',
      category: 9,
      level: 9,
      levels: [
        9,
        1,
        4
      ],
      order: 4,
      problemSet: 'loops-if-practice-1',
      setting: {
        fields: 'b|b|bD|b|b;k|k|k|k|k;rD|k|k|k|k;k|y|k|k|k;k|k|y|k|k;k|k|k|y|k;k|k|k|k|rD;k|k|k|k|k;k|k|k|k|k;k|rD|k|k|k;k|k|y|k|k;k|k|k|rD|k;k|k|k|k|k;k|kS|k|k|k',
        length: 9
      },
      solved: false,
      time: null
    },
    'wormhole-cloud': {
      id: 'wormhole-cloud',
      category: 9,
      level: 9,
      levels: [
        9,
        1,
        5
      ],
      order: 5,
      problemSet: 'loops-if-practice-1',
      setting: {
        fields: 'bA|bA|bA|b|bA;kA|kM|kA|kZ|kA;kM|kX|kM|kX|kM;kM|kZ|kX|kY|kM;kA|kM|kY|kW|kX;kM|kW|kM|kX|kM;kA|kM|kS|kM|kA',
        length: 3
      },
      solved: false,
      time: null
    },
    'edge-wormholes': {
      id: 'edge-wormholes',
      category: 9,
      level: 9,
      levels: [
        9,
        1,
        6
      ],
      order: 6,
      problemSet: 'loops-if-practice-1',
      setting: {
        fields: 'b|b|b|b|b|b;k|kD|k|k|k|kZ;kX|k|kD|k|kD|k;kY|kD|k|kD|k|k;k|kD|kD|k|kD|kW;k|kD|kD|kD|kD|kZ;kY|k|k|kD|kD|k;k|k|kD|k|kD|kW;k|kD|k|k|k|kX;kS|k|k|k|k|k',
        length: 6
      },
      solved: false,
      time: null
    },
    'two-color-tracks': {
      id: 'two-color-tracks',
      category: 9,
      level: 9,
      levels: [
        9,
        2,
        1
      ],
      order: 1,
      problemSet: 'loops-if-practice-2',
      setting: {
        fields: 'b|b|b|b|b|b;k|kW|k|k|y|k;kD|k|k|k|k|kD;k|y|k|k|r|k;k|y|k|k|y|k;k|k|kD|k|k|kD;k|r|k|k|r|k;k|y|k|k|y|k;k|k|kD|kD|k|k;k|r|k|k|y|k;k|y|k|k|y|k;kD|k|k|kD|k|k;k|y|k|k|y|k;k|y|k|k|y|k;k|kS|k|k|kW|k',
        length: 10
      },
      solved: false,
      time: null
    },
    'diamond-ring': {
      id: 'diamond-ring',
      category: 9,
      level: 9,
      levels: [
        9,
        2,
        2
      ],
      order: 2,
      problemSet: 'loops-if-practice-2',
      setting: {
        fields: 'b|b|b|b|b|b;kW|k|k|k|k|k;k|k|k|k|k|k;k|k|k|k|k|k;k|k|k|k|k|k;k|k|k|k|k|k;k|k|k|k|k|k;k|k|kD|kD|k|k;k|kD|k|k|kD|k;kD|k|k|k|k|kD;k|kD|k|k|kD|k;k|k|kD|kD|k|k;k|k|k|k|k|k;k|k|k|k|k|k;k|k|k|k|k|k;k|k|kS|kW|k|k',
        length: 6
      },
      solved: false,
      time: null
    },
    'cross-2': {
      id: 'cross-2',
      category: 9,
      level: 9,
      levels: [
        9,
        2,
        3
      ],
      order: 3,
      problemSet: 'loops-if-practice-2',
      setting: {
        fields: 'b|b|b|b|b;kD|k|k|k|kW;k|kA|kA|kA|k;k|kD|k|kD|k;k|k|k|k|k;k|k|kD|k|k;k|k|k|k|k;k|kD|k|kD|k;k|kA|kA|kA|k;kS|k|k|k|kW',
        length: 11
      },
      solved: false,
      time: null
    },
    'diagonal-diamonds': {
      id: 'diagonal-diamonds',
      category: 9,
      level: 9,
      levels: [
        9,
        2,
        4
      ],
      order: 4,
      problemSet: 'loops-if-practice-2',
      setting: {
        fields: 'b|b|b|b|b|b;k|k|k|yD|k|k;k|k|k|kW|yD|k;k|k|yD|k|k|yD;k|yD|k|k|k|k;yD|k|k|k|k|k;kS|k|k|k|k|kW',
        length: 6
      },
      solved: false,
      time: null
    },
    'six-diamonds': {
      id: 'six-diamonds',
      category: 9,
      level: 9,
      levels: [
        9,
        2,
        5
      ],
      order: 5,
      problemSet: 'loops-if-practice-2',
      setting: {
        fields: 'b|b|b|b;k|k|kW|k;k|kD|kD|k;k|kD|kD|k;k|kD|kD|k;kS|k|k|kW',
        length: 4
      },
      solved: false,
      time: null
    },
    'triple-slalom': {
      id: 'triple-slalom',
      category: 9,
      level: 9,
      levels: [
        9,
        3,
        1
      ],
      order: 1,
      problemSet: 'loops-if-practice-3',
      setting: {
        fields: 'b|b|b|b|b|b;kW|k|k|k|k|k;rD|k|k|k|rD|k;k|yD|k|kX|k|yD;yD|k|k|rD|yD|k;k|yD|k|k|yD|yD;yD|k|k|yD|yD|k;k|yD|k|k|yD|yD;kS|k|k|kW|kX|k',
        length: 6
      },
      solved: false,
      time: null
    },
    'turning-in-square': {
      id: 'turning-in-square',
      category: 9,
      level: 9,
      levels: [
        9,
        3,
        2
      ],
      order: 2,
      problemSet: 'loops-if-practice-3',
      setting: {
        fields: 'b|b|b|b|b;kW|k|k|k|kX;k|k|k|k|k;k|gD|gD|gD|k;k|yD|yD|yD|k;k|gD|gD|gD|k;k|k|k|k|k;k|k|k|k|k;k|kW|kS|kX|k',
        length: 10
      },
      solved: false,
      time: null
    },
    'letter-d': {
      id: 'letter-d',
      category: 9,
      level: 9,
      levels: [
        9,
        3,
        3
      ],
      order: 3,
      problemSet: 'loops-if-practice-3',
      setting: {
        fields: 'b|b|b|b|b|b;y|yY|yD|rZ|r|r;y|yD|y|r|rD|r;y|yD|y|r|rD|r;y|yD|y|r|r|rD;r|rD|r|y|y|yD;r|rD|r|y|yD|y;r|rD|r|y|yD|y;r|rD|rZ|yY|y|y;k|kS|k|k|k|k',
        length: 6
      },
      solved: false,
      time: null
    },
    'meteoroids-on-left': {
      id: 'meteoroids-on-left',
      category: 9,
      level: 9,
      levels: [
        9,
        3,
        4
      ],
      order: 4,
      problemSet: 'loops-if-practice-3',
      setting: {
        fields: 'b|b|b|b|b;kW|k|k|k|k;kM|kM|kA|kA|kA;k|k|k|k|k;k|k|kD|kD|k;k|k|k|k|k;k|k|k|k|k;k|k|k|k|k;k|k|k|k|k;k|k|kS|kW|k',
        energy: 2,
        length: 10
      },
      solved: false,
      time: null
    },
    'two-bit-instructions': {
      id: 'two-bit-instructions',
      category: 9,
      level: 9,
      levels: [
        9,
        3,
        5
      ],
      order: 5,
      problemSet: 'loops-if-practice-3',
      setting: {
        fields: 'b|b|b|b|b|b;kA|kW|kA|kA|kM|kA;kA|kD|kA|kA|kM|kA;k|k|yD|k|r|k;k|k|y|k|k|yD;k|k|k|k|k|y;k|rD|k|k|k|k;k|y|k|k|r|k;k|k|k|k|y|k;rD|k|k|k|k|k;y|k|k|k|r|k;kS|k|k|k|kW|k',
        energy: 2,
        length: 10
      },
      solved: false,
      time: null
    }
  },
  toolboxes: {
    fly: {
      id: 'fly',
      blocks: [
        'fly'
      ]
    },
    shoot: {
      id: 'shoot',
      blocks: [
        'fly',
        'shoot'
      ]
    },
    repeat: {
      id: 'repeat',
      blocks: [
        'fly',
        'shoot',
        'repeat'
      ]
    },
    'while': {
      id: 'while',
      blocks: [
        'fly',
        'shoot',
        'while',
        'color'
      ]
    },
    loops: {
      id: 'loops',
      blocks: [
        'fly',
        'shoot',
        'repeat',
        'while',
        'color'
      ]
    },
    'loops-if': {
      id: 'loops-if',
      blocks: [
        'fly',
        'shoot',
        'repeat',
        'while',
        'color',
        'if'
      ]
    },
    'loops-if-position': {
      id: 'loops-if-position',
      blocks: [
        'fly',
        'shoot',
        'repeat',
        'while',
        'color',
        'position',
        'if'
      ]
    },
    'loops-if-else': {
      id: 'loops-if-else',
      blocks: [
        'fly',
        'shoot',
        'repeat',
        'while',
        'color',
        'position',
        'if',
        'if-else'
      ]
    }
  },
  user: {
    credentials: {
      email: '',
      password: ''
    },
    nickname: '',
    studentUrl: '/learn/api/students/1/',
    teacherUrl: null,
    email: '',
    isStaff: false,
    isLazy: true,
    created: false
  },
  student: {
    level: 1,
    credits: 0,
    practiceOverviewUrl: '/learn/api/students/1/practice-overview/',
    startTaskUrl: '/learn/api/students/1/start_task/',
    watchInstructionUrl: '/learn/api/students/1/watch_instruction/',
    reportProgramEditUrl: '/learn/api/students/1/edit_program/',
    reportProgramExecutionUrl: '/learn/api/students/1/run_program/',
    mission: 'commands',
    phase: 'fly-forward'
  },
  // strategyLevels: [
  //   {
  //     name: 'Kill \'em all basic',
  //     urlSlug: 'kill-em-all-basic',
  //     battleType: 'killAll',
  //     battleParams: {
  //       turnsRan: 0,
  //       maxTurns: 40
  //     },
  //     turnsOrder: [
  //       'aiShip',
  //       'playerShip'
  //     ],
  //     shipsAsts: {
  //       aiShip: [
  //         {
  //           head: 'start',
  //           body: [
  //             {
  //               statement: {
  //                 head: 'while',
  //                 test: {
  //                   head: 'constant_boolean',
  //                   value: 'true'
  //                 },
  //                 body: [
  //                   {
  //                     statement: {
  //                       head: 'repeat',
  //                       count: 4,
  //                       body: [
  //                         {
  //                           statement: {
  //                             head: 'shoot'
  //                           },
  //                           location: {
  //                             blockId: 'SmpJ_lIV~(:p!}~d3?YD'
  //                           }
  //                         },
  //                         {
  //                           statement: {
  //                             head: 'turn-right'
  //                           },
  //                           location: {
  //                             blockId: ')/%Fm.2$ZIUfB7k(EZ=u'
  //                           }
  //                         },
  //                         {
  //                           statement: {
  //                             head: 'fly'
  //                           },
  //                           location: {
  //                             blockId: 'U%w,$X;zc^ZitHIpz-~:'
  //                           }
  //                         },
  //                         {
  //                           statement: {
  //                             head: 'turn-left'
  //                           },
  //                           location: {
  //                             blockId: '~1y}gTpN~`[GT,]?E*zh'
  //                           }
  //                         },
  //                         {
  //                           statement: {
  //                             head: 'shoot'
  //                           },
  //                           location: {
  //                             blockId: 'NFXAdsSGS!*{ApGo;Ipw'
  //                           }
  //                         }
  //                       ]
  //                     },
  //                     location: {
  //                       blockId: 'L{0Vs^Zdafn`()bCwqmn'
  //                     }
  //                   },
  //                   {
  //                     statement: {
  //                       head: 'repeat',
  //                       count: 4,
  //                       body: [
  //                         {
  //                           statement: {
  //                             head: 'shoot'
  //                           },
  //                           location: {
  //                             blockId: '3gM5T7dj/DHA+iolH5u{'
  //                           }
  //                         },
  //                         {
  //                           statement: {
  //                             head: 'turn-left'
  //                           },
  //                           location: {
  //                             blockId: '}B3?$UvVHkBUhB#fn/GY'
  //                           }
  //                         },
  //                         {
  //                           statement: {
  //                             head: 'fly'
  //                           },
  //                           location: {
  //                             blockId: '6n#7LSd8aTXA|0,;*j4{'
  //                           }
  //                         },
  //                         {
  //                           statement: {
  //                             head: 'turn-right'
  //                           },
  //                           location: {
  //                             blockId: '/hRg%?hLItUb3xiOCH~/'
  //                           }
  //                         },
  //                         {
  //                           statement: {
  //                             head: 'shoot'
  //                           },
  //                           location: {
  //                             blockId: 'lx61W?zLR.A3iU{DS+aK'
  //                           }
  //                         }
  //                       ]
  //                     },
  //                     location: {
  //                       blockId: '=krnA~31%r}mxGbyS3Iv'
  //                     }
  //                   }
  //                 ]
  //               },
  //               location: {
  //                 blockId: ':C]H#tzHolmL#)*7gGU$'
  //               }
  //             }
  //           ],
  //           location: {
  //             blockId: '-NVXSQkte#JLwvlEUT#n'
  //           }
  //         }
  //       ]
  //     },
  //     world: {
  //       surface: [
  //         [
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k'
  //         ],
  //         [
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k'
  //         ],
  //         [
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k'
  //         ],
  //         [
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k'
  //         ],
  //         [
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k'
  //         ]
  //       ],
  //       ships: [
  //         {
  //           id: 'playerShip',
  //           shipColor: 'green',
  //           position: {
  //             x: 4,
  //             y: 0
  //           },
  //           direction: 'down',
  //           isDestroyed: false,
  //           carriedObjects: []
  //         },
  //         {
  //           id: 'aiShip',
  //           shipColor: 'red',
  //           position: {
  //             x: 0,
  //             y: 4
  //           },
  //           direction: 'up',
  //           isDestroyed: false,
  //           carriedObjects: []
  //         }
  //       ],
  //       objects: [
  //         [
  //           [],
  //           [],
  //           [],
  //           [],
  //           []
  //         ],
  //         [
  //           [
  //             {
  //               type: 'A'
  //             }
  //           ],
  //           [
  //             {
  //               type: 'A'
  //             }
  //           ],
  //           [
  //             {
  //               type: 'A'
  //             }
  //           ],
  //           [
  //             {
  //               type: 'A'
  //             }
  //           ],
  //           [
  //             {
  //               type: 'A'
  //             }
  //           ]
  //         ],
  //         [
  //           [],
  //           [],
  //           [],
  //           [],
  //           []
  //         ],
  //         [
  //           [],
  //           [],
  //           [],
  //           [],
  //           []
  //         ],
  //         [
  //           [],
  //           [],
  //           [],
  //           [],
  //           []
  //         ]
  //       ],
  //       size: {
  //         x: 5,
  //         y: 5
  //       }
  //     },
  //     gameBehaviours: {}
  //   },
  //   {
  //     name: 'Star collect basic',
  //     urlSlug: 'star-collect-basic',
  //     battleType: 'collectOrKill',
  //     battleParams: {
  //       turnsRan: 0,
  //       maxTurns: 40
  //     },
  //     turnsOrder: [
  //       'aiShip',
  //       'playerShip'
  //     ],
  //     shipsAsts: {
  //       aiShip: [
  //         {
  //           head: 'start',
  //           body: [
  //             {
  //               statement: {
  //                 head: 'repeat',
  //                 count: 2,
  //                 body: [
  //                   {
  //                     statement: {
  //                       head: 'fly'
  //                     },
  //                     location: {
  //                       blockId: '~$snHKbnF~nrK+vc^l@%'
  //                     }
  //                   }
  //                 ]
  //               },
  //               location: {
  //                 blockId: 'Dw)Mjis,,YuiUZ60%9~%'
  //               }
  //             },
  //             {
  //               statement: {
  //                 head: 'turn-right'
  //               },
  //               location: {
  //                 blockId: '@/g#*jfcuE,yMtI=JwzB'
  //               }
  //             },
  //             {
  //               statement: {
  //                 head: 'repeat',
  //                 count: 3,
  //                 body: [
  //                   {
  //                     statement: {
  //                       head: 'if',
  //                       test: {
  //                         head: 'logic_binary',
  //                         leftValue: {
  //                           head: 'tile',
  //                           value: 'S',
  //                           position: {
  //                             head: 'position_value_relative',
  //                             x: {
  //                               head: 'constant_number',
  //                               value: '1'
  //                             },
  //                             y: {
  //                               head: 'constant_number',
  //                               value: '0'
  //                             }
  //                           },
  //                           comparator: 'contains'
  //                         },
  //                         rightValue: {
  //                           head: 'logic_binary',
  //                           leftValue: {
  //                             head: 'tile',
  //                             value: 'S',
  //                             position: {
  //                               head: 'position_value_relative',
  //                               x: {
  //                                 head: 'constant_number',
  //                                 value: '3'
  //                               },
  //                               y: {
  //                                 head: 'constant_number',
  //                                 value: '0'
  //                               }
  //                             },
  //                             comparator: 'contains'
  //                           },
  //                           rightValue: {
  //                             head: 'tile',
  //                             value: 'S',
  //                             position: {
  //                               head: 'position_value_relative',
  //                               x: {
  //                                 head: 'constant_number',
  //                                 value: '2'
  //                               },
  //                               y: {
  //                                 head: 'constant_number',
  //                                 value: '0'
  //                               }
  //                             },
  //                             comparator: 'contains'
  //                           },
  //                           comparator: 'or'
  //                         },
  //                         comparator: 'or'
  //                       },
  //                       body: [
  //                         {
  //                           statement: {
  //                             head: 'shoot'
  //                           },
  //                           location: {
  //                             blockId: 'ByQ/RP1gRHt=6|FSdbT('
  //                           }
  //                         }
  //                       ]
  //                     },
  //                     location: {
  //                       blockId: '7F$b/.ouGQiS$dJy8AQ1'
  //                     }
  //                   },
  //                   {
  //                     statement: {
  //                       head: 'fly'
  //                     },
  //                     location: {
  //                       blockId: 'gTByhV)9Mf]TKi|DD3sV'
  //                     }
  //                   },
  //                   {
  //                     statement: {
  //                       head: 'pick_up_diamond'
  //                     },
  //                     location: {
  //                       blockId: ':$N}YaHGU~LXHi7Sq@{I'
  //                     }
  //                   }
  //                 ]
  //               },
  //               location: {
  //                 blockId: 'hk$orR-=o@voe9xA~u]F'
  //               }
  //             },
  //             {
  //               statement: {
  //                 head: 'turn-left'
  //               },
  //               location: {
  //                 blockId: 'ULfbg6G_/9NX5[rLKK7l'
  //               }
  //             },
  //             {
  //               statement: {
  //                 head: 'while',
  //                 test: {
  //                   head: 'constant_boolean',
  //                   value: 'true'
  //                 },
  //                 body: [
  //                   {
  //                     statement: {
  //                       head: 'if',
  //                       test: {
  //                         head: 'logic_binary',
  //                         leftValue: {
  //                           head: 'tile',
  //                           value: 'S',
  //                           position: {
  //                             head: 'position_value_relative',
  //                             x: {
  //                               head: 'constant_number',
  //                               value: '1'
  //                             },
  //                             y: {
  //                               head: 'constant_number',
  //                               value: '0'
  //                             }
  //                           },
  //                           comparator: 'contains'
  //                         },
  //                         rightValue: {
  //                           head: 'logic_binary',
  //                           leftValue: {
  //                             head: 'tile',
  //                             value: 'S',
  //                             position: {
  //                               head: 'position_value_relative',
  //                               x: {
  //                                 head: 'constant_number',
  //                                 value: '3'
  //                               },
  //                               y: {
  //                                 head: 'constant_number',
  //                                 value: '0'
  //                               }
  //                             },
  //                             comparator: 'contains'
  //                           },
  //                           rightValue: {
  //                             head: 'tile',
  //                             value: 'S',
  //                             position: {
  //                               head: 'position_value_relative',
  //                               x: {
  //                                 head: 'constant_number',
  //                                 value: '2'
  //                               },
  //                               y: {
  //                                 head: 'constant_number',
  //                                 value: '0'
  //                               }
  //                             },
  //                             comparator: 'contains'
  //                           },
  //                           comparator: 'or'
  //                         },
  //                         comparator: 'or'
  //                       },
  //                       body: [
  //                         {
  //                           statement: {
  //                             head: 'shoot'
  //                           },
  //                           location: {
  //                             blockId: 'DmkXcY_Rx7v4J3)UHy+$'
  //                           }
  //                         }
  //                       ]
  //                     },
  //                     location: {
  //                       blockId: ']L)h~bB;5pGIcg0DF5M,'
  //                     }
  //                   },
  //                   {
  //                     statement: {
  //                       head: 'turn-left'
  //                     },
  //                     location: {
  //                       blockId: ']x/crN/Ebb$j^f~}Ax.p'
  //                     }
  //                   }
  //                 ]
  //               },
  //               location: {
  //                 blockId: 'Aw*V{C4R~Z`7$Rtzny~t'
  //               }
  //             }
  //           ],
  //           location: {
  //             blockId: 'Pj1(n+-FcAFsaUj?8,;k'
  //           }
  //         }
  //       ]
  //     },
  //     world: {
  //       surface: [
  //         [
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k'
  //         ],
  //         [
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k'
  //         ],
  //         [
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k'
  //         ],
  //         [
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k'
  //         ],
  //         [
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k'
  //         ]
  //       ],
  //       ships: [
  //         {
  //           id: 'aiShip',
  //           shipColor: 'yellow',
  //           position: {
  //             x: 0,
  //             y: 4
  //           },
  //           direction: 'up',
  //           isDestroyed: false,
  //           carriedObjects: []
  //         },
  //         {
  //           id: 'playerShip',
  //           shipColor: 'green',
  //           position: {
  //             x: 4,
  //             y: 0
  //           },
  //           direction: 'down',
  //           isDestroyed: false,
  //           carriedObjects: []
  //         }
  //       ],
  //       objects: [
  //         [
  //           [],
  //           [],
  //           [],
  //           [],
  //           []
  //         ],
  //         [
  //           [],
  //           [],
  //           [
  //             {
  //               type: 'D'
  //             }
  //           ],
  //           [],
  //           []
  //         ],
  //         [
  //           [],
  //           [
  //             {
  //               type: 'D'
  //             }
  //           ],
  //           [
  //             {
  //               type: 'D'
  //             }
  //           ],
  //           [
  //             {
  //               type: 'D'
  //             }
  //           ],
  //           []
  //         ],
  //         [
  //           [],
  //           [],
  //           [
  //             {
  //               type: 'D'
  //             }
  //           ],
  //           [],
  //           []
  //         ],
  //         [
  //           [],
  //           [],
  //           [],
  //           [],
  //           []
  //         ]
  //       ],
  //       size: {
  //         x: 5,
  //         y: 5
  //       }
  //     },
  //     gameBehaviours: {}
  //   },
  //   {
  //     name: 'Simple race',
  //     urlSlug: 'simple-race',
  //     battleType: 'getThereFirst',
  //     battleParams: {
  //       turnsRan: 0,
  //       maxTurns: 100,
  //       finishPositions: [
  //         {
  //           x: 0,
  //           y: 2
  //         },
  //         {
  //           x: 0,
  //           y: 4
  //         }
  //       ]
  //     },
  //     turnsOrder: [
  //       'aiShip',
  //       'playerShip'
  //     ],
  //     shipsAsts: {
  //       aiShip: [
  //         {
  //           head: 'start',
  //           body: [
  //             {
  //               statement: {
  //                 head: 'repeat',
  //                 count: 5,
  //                 body: [
  //                   {
  //                     statement: {
  //                       head: 'fly'
  //                     },
  //                     location: {
  //                       blockId: 'w4hc?]#V*SeS:=??Zx2i'
  //                     }
  //                   }
  //                 ]
  //               },
  //               location: {
  //                 blockId: 'PJ:CtiW$UpCn{O;7U{}9'
  //               }
  //             },
  //             {
  //               statement: {
  //                 head: 'right'
  //               },
  //               location: {
  //                 blockId: '}#flM9fL:T6dyx[)AeW_'
  //               }
  //             }
  //           ],
  //           location: {
  //             blockId: '_`tG{rX01e,k7ZD$GHp#'
  //           }
  //         }
  //       ]
  //     },
  //     world: {
  //       surface: [
  //         [
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k'
  //         ],
  //         [
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k'
  //         ],
  //         [
  //           'g',
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k'
  //         ],
  //         [
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k'
  //         ],
  //         [
  //           'r',
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k'
  //         ],
  //         [
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k'
  //         ],
  //         [
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k'
  //         ]
  //       ],
  //       ships: [
  //         {
  //           id: 'playerShip',
  //           shipColor: 'green',
  //           position: {
  //             x: 6,
  //             y: 1
  //           },
  //           direction: 'left',
  //           isDestroyed: false,
  //           carriedObjects: []
  //         },
  //         {
  //           id: 'aiShip',
  //           shipColor: 'red',
  //           position: {
  //             x: 6,
  //             y: 5
  //           },
  //           direction: 'left',
  //           isDestroyed: false,
  //           carriedObjects: []
  //         }
  //       ],
  //       objects: [
  //         [
  //           [],
  //           [],
  //           [],
  //           [],
  //           [],
  //           [],
  //           []
  //         ],
  //         [
  //           [],
  //           [],
  //           [],
  //           [],
  //           [],
  //           [],
  //           []
  //         ],
  //         [
  //           [],
  //           [],
  //           [],
  //           [],
  //           [],
  //           [],
  //           []
  //         ],
  //         [
  //           [
  //             {
  //               type: 'A'
  //             }
  //           ],
  //           [
  //             {
  //               type: 'A'
  //             }
  //           ],
  //           [
  //             {
  //               type: 'A'
  //             }
  //           ],
  //           [
  //             {
  //               type: 'A'
  //             }
  //           ],
  //           [
  //             {
  //               type: 'A'
  //             }
  //           ],
  //           [
  //             {
  //               type: 'A'
  //             }
  //           ],
  //           [
  //             {
  //               type: 'A'
  //             }
  //           ]
  //         ],
  //         [
  //           [],
  //           [],
  //           [],
  //           [],
  //           [],
  //           [],
  //           []
  //         ],
  //         [
  //           [],
  //           [],
  //           [],
  //           [],
  //           [],
  //           [],
  //           []
  //         ],
  //         [
  //           [],
  //           [],
  //           [],
  //           [],
  //           [],
  //           [],
  //           []
  //         ]
  //       ],
  //       size: {
  //         x: 7,
  //         y: 7
  //       }
  //     },
  //     gameBehaviours: {}
  //   }
  // ],
  // duelStrategyLevels: [
  //   {
  //     name: 'Empty world duel',
  //     urlSlug: 'empty-world-duel',
  //     battleType: 'killAll',
  //     battleParams: {
  //       turnsRan: 0,
  //       maxTurns: 100
  //     },
  //     turnsOrder: [
  //       'first',
  //       'second'
  //     ],
  //     shipsAsts: {},
  //     world: {
  //       surface: [
  //         [
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k'
  //         ],
  //         [
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k'
  //         ],
  //         [
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k'
  //         ],
  //         [
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k'
  //         ],
  //         [
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k'
  //         ],
  //         [
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k'
  //         ],
  //         [
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k',
  //           'k'
  //         ]
  //       ],
  //       ships: [
  //         {
  //           id: 'first',
  //           shipColor: 'green',
  //           position: {
  //             x: 6,
  //             y: 0
  //           },
  //           direction: 'down',
  //           isDestroyed: false,
  //           carriedObjects: []
  //         },
  //         {
  //           id: 'second',
  //           shipColor: 'red',
  //           position: {
  //             x: 0,
  //             y: 6
  //           },
  //           direction: 'up',
  //           isDestroyed: false,
  //           carriedObjects: []
  //         }
  //       ],
  //       objects: [
  //         [
  //           [],
  //           [],
  //           [],
  //           [],
  //           [],
  //           [],
  //           []
  //         ],
  //         [
  //           [],
  //           [],
  //           [],
  //           [],
  //           [],
  //           [],
  //           []
  //         ],
  //         [
  //           [],
  //           [],
  //           [],
  //           [],
  //           [],
  //           [],
  //           []
  //         ],
  //         [
  //           [],
  //           [],
  //           [],
  //           [],
  //           [],
  //           [],
  //           []
  //         ],
  //         [
  //           [],
  //           [],
  //           [],
  //           [],
  //           [],
  //           [],
  //           []
  //         ],
  //         [
  //           [],
  //           [],
  //           [],
  //           [],
  //           [],
  //           [],
  //           []
  //         ],
  //         [
  //           [],
  //           [],
  //           [],
  //           [],
  //           [],
  //           [],
  //           []
  //         ]
  //       ],
  //       size: {
  //         x: 7,
  //         y: 7
  //       }
  //     },
  //     gameBehaviours: {}
  //   }
  // ],
  recommendation: {
    available: true,
    task: 'three-steps-forward',
    phase: 'fly-forward',
    mission: 'commands',
    levels: [
      1,
      1,
      1
    ]
  },
  menu: {
    open: false
  },
  taskEnvironments: {
    'practice-page': {
      task: {
        id: '',
        setting: {
          fields: 'k',
          length: null,
          energy: null
        }
      },
      taskSessionId: null,
      editorType: 'blockly',
      editorSessionId: 0,
      roboAst: {
        head: 'start',
        body: []
      },
      code: '',
      validCode: true,
      interpreting: false,
      pastActions: [],
      currentAction: null,
      gamePanelWidth: 280,
      isTaskCompletionDialogOpen: false,
      highlightedBlock: null,
      speed: 3
    },
    'home-commands': {
      task: {
        categoryId: null,
        id: 'beware-of-asteroid',
        category: 1,
        level: 1,
        levels: [
          1,
          3,
          2
        ],
        order: 2,
        problemSet: 'diamonds',
        setting: {
          length: null,
          energy: null,
          fields: 'bM|b|bD|b|b;k|kM|kA|k|kA;kA|k|kD|kM|k;k|k|kS|k|kM'
        },
        solved: false,
        time: null,
        toolbox: [
          'fly'
        ]
      },
      taskSessionId: null,
      editorType: 'blockly',
      editorSessionId: 1,
      roboAst: {
        head: 'start',
        body: []
      },
      code: '',
      validCode: true,
      interpreting: false,
      pastActions: [],
      currentAction: null,
      gamePanelWidth: 280,
      isTaskCompletionDialogOpen: false,
      highlightedBlock: null,
      speed: 3
    },
    'home-program': {
      task: {
        categoryId: null,
        id: 'three-steps-forward',
        category: 1,
        level: 1,
        levels: [
          1,
          1,
          1
        ],
        order: 1,
        problemSet: 'fly-forward',
        setting: {
          length: null,
          energy: null,
          fields: 'b|b|b|b|b;k|k|k|k|k;k|k|k|k|k;k|k|kS|k|k'
        },
        solved: false,
        time: null,
        toolbox: [
          'fly'
        ]
      },
      taskSessionId: null,
      editorType: 'blockly',
      editorSessionId: 1,
      roboAst: {
        head: 'start',
        body: []
      },
      code: '',
      validCode: true,
      interpreting: false,
      pastActions: [],
      currentAction: null,
      gamePanelWidth: 280,
      isTaskCompletionDialogOpen: false,
      highlightedBlock: null,
      speed: 3
    }
  },
  taskEditor: {
    vimMode: false
  },
  practice: {
    progress: null
  },
  feedback: {
    open: false,
    comment: '',
    email: '',
    fieldErrors: {
      comment: null,
      email: null
    },
    justSent: false
  },
  monitoring: {
    metrics: null
  },
  intl: {
    locale: 'cs',
    messages: {
      Close: 'Zavřít',
      'I understand': 'Rozumím',
      Intro: 'Intro',
      Run: 'Spusť program',
      Speed: 'Rychlost',
      Task: 'Úkol',
      Tasks: 'Přehled úloh',
      'Task Editor': 'Editor úloh',
      Practice: 'Trénink',
      Previous: 'Předchozí',
      Feedback: 'Napište nám',
      Help: 'Nápověda',
      ALG: 'Laboratoř adaptabilního učení',
      'FI-MU': 'Fakulta informatiky MU',
      'For hackers': 'Pro hackery',
      'New instructions': 'Nové nápovědy',
      'All instructions': 'Všechny nápovědy',
      'Mission completed': 'Mise úspěšně dokončena.',
      'New mission': 'Nová mise',
      'easy-task-challenge': 'Pro změnu něco jednoduššího. Zvládneš to vyřešit do minuty?',
      'excellent-task-solved': 'Skvěle, úloha vyřešena!',
      'not tackled': 'neřešeno',
      recommended: 'doporučujeme',
      'intro.learn-programming': 'Nauč se programovat!',
      'intro.explore-universe': 'Prozkoumej tajemný vesmír',
      'intro.collect-diamonds': 'a posbírej všechny diamanty',
      'intro.learn-program-spaceship': 'Nauč se ovládat vesmírnou loď',
      'intro.using-computer-programs': 'pomocí počítačových programů',
      'intro.game-driven-by-ai': 'Hra je poháněna umělou inteligencí,',
      'intro.adapting-to-your-skills': 'díky které se hra přizpůsobuje tvým dovednostem',
      'intro.developed-by-alg': 'Aplikaci vyvíjí tým Adaptabilního učení',
      'intro.at-fi-mu': 'na Fakultě informatiky Masarykovy Univerzity',
      'intro.fly-into-space': 'Vyleť do vesmíru!',
      'task.2diamonds-2meteorids': '2 diamanty, 2 meteoroidy',
      'task.arrow': 'Šipka',
      'task.belgian-flag': 'Belgická vlajka',
      'task.beware-of-asteroid': 'Pozor na asteroid',
      'task.big-left-turn': 'Velká levá zatáčka',
      'task.big-right-turn': 'Velká pravá zatáčka',
      'task.big-slalom': 'Velký slalom',
      'task.blocked-wormhole': 'Zablokovaná červí díra',
      'task.bouncing-from-edge': 'Odrážení od kraje',
      'task.chessboard': 'Šachovnice',
      'task.clean-your-path': 'Ukliď si cestu',
      'task.collect-diamonds': 'Sběr diamantů',
      'task.color-navigation': 'Barevná navigace',
      'task.color-slalom': 'Barevný slalom',
      'task.colorful-flowers': 'Barevné květy',
      'task.cross-2': 'Kříž 2',
      'task.diagonal-diamonds': 'Diamantové diagonály',
      'task.diagonal-lines': 'Diagonální čáry',
      'task.diamond-cross': 'Diamantový kříž',
      'task.diamond-in-house': 'Diamant v domku',
      'task.diamond-lines': 'Řady diamantů',
      'task.diamond-on-right': 'Diamant napravo',
      'task.diamond-path': 'Diamantová cesta',
      'task.diamond-ring': 'Diamantový prsten',
      'task.diamonds-in-meteoroid-cloud': 'Diamanty v mraku meteoroidů',
      'task.diamonds-on-yellow': 'Diamanty na žluté',
      'task.diamonds-with-signals': 'Diamanty se signály',
      'task.direct-flight-ahead': 'Přímý let vpřed',
      'task.direction-change': 'Změna směru',
      'task.dont-forget-shot': 'Nezapomeň střílet',
      'task.double-bend': 'Dvojitá zatáčka',
      'task.double-track': 'Dvojitá dráha',
      'task.edge-to-edge': 'Od kraje ke kraji',
      'task.edge-wormholes': 'Okrajové červí díry',
      'task.find-the-path': 'Najdi cestu',
      'task.five-diamonds': 'Pět diamantů',
      'task.follow-colors': 'Následuj barvy',
      'task.four-vs': 'Čtyři véčka',
      'task.free-column': 'Volný sloupec',
      'task.ladder': 'Žebřík',
      'task.last-shot': 'Poslední výstřel',
      'task.letter-d': 'Písmeno D',
      'task.letter-e': 'Písmeno E',
      'task.letter-h': 'Písmeno H',
      'task.maneuvers-on-left': 'Manévry nalevo',
      'task.meteoroids-and-wormholes': 'Meteoroidy a červí díry',
      'task.meteoroids-on-left': 'Meteoroidy nalevo',
      'task.mirror': 'Zrcadlo',
      'task.n': 'Písmeno N',
      'task.nameless-task': 'Nepojmenovaná úloha',
      'task.narrow-passage': 'Úzký průchod',
      'task.on-yellow-to-left': 'Na žluté doleva',
      'task.one-step-forward': 'Jeden krok vpřed',
      'task.plan-your-shooting': 'Naplánuj si střelbu',
      'task.plus': 'Plus',
      'task.rectangle': 'Obdélník',
      'task.red-shooting': 'Červená střelba',
      'task.shooting': 'Střelba',
      'task.shot': 'Střela',
      'task.six-diamonds': 'Šest diamantů',
      'task.slalom-position-testing': 'Poziční slalom',
      'task.stairs': 'Schody',
      'task.steal-the-nose': 'Ukradni nos',
      'task.stop-on-red': 'Zastav na červenou',
      'task.stripes': 'Pruhy',
      'task.surrounded-diamond': 'Obklíčený diamant',
      'task.three-steps-forward': 'Tři kroky vpřed',
      'task.triangle': 'Trojúhelník',
      'task.triple-slalom': 'Trojitý slalom',
      'task.triple-steps': 'Trojté kroky',
      'task.tunnel': 'Tunel',
      'task.turning-in-square': 'Zatáčení ve čtverci',
      'task.turning-left': 'Zatáčení doleva',
      'task.turning-left-and-right': 'Doleva a doprava',
      'task.turning-right': 'Zatáčení doprava',
      'task.turning-right-and-left': 'Doprava a doleva',
      'task.two-bit-instructions': 'Dvoubitové instrukce',
      'task.two-color-tracks': 'Dvoubarevné dráhy',
      'task.two-diamonds': 'Dva diamanty',
      'task.two-steps-forward': 'Dva kroky vpřed',
      'task.wave': 'Vlna',
      'task.wormhole-cloud': 'Mrak červích děr',
      'task.wormhole-demo': 'Červí díra: ukázka',
      'task.yellow-hint': 'Žlutá nápověda',
      'task.yellow-is-not-red': 'Žlutá není červená',
      'task.yellow-squares': 'Žluté čtverce',
      'task.zig-zag': 'Cik cak',
      'task.zig-zag-plus': 'Cik cak plus',
      'blockly.start': 'start',
      'blockly.fly': 'leť',
      'blockly.turn': 'otoč se',
      'blockly.ahead': 'vpřed',
      'blockly.left': 'vlevo',
      'blockly.right': 'vpravo',
      'blockly.shoot': 'vystřel',
      'blockly.color': 'barva',
      'blockly.position': 'pozice',
      'blockly.while': 'dokud',
      'blockly.repeat': 'opakuj',
      'blockly.if': 'pokud',
      'blockly.else': 'jinak',
      'blockly.green': 'zelená',
      'blockly.blue': 'modrá',
      'blockly.red': 'červená',
      'blockly.yellow': 'žlutá',
      'blockly.black': 'černá',
      'blockly.tile': 'pole na',
      'blockly.contains': 'obsahuje',
      'blockly.notContains': 'neobsahuje',
      'object.ship': 'loď',
      'object.diamond': 'diamant',
      'object.meteoroid': 'meteorit',
      'object.asteroid': 'asteroid',
      'object.wormhole': 'červí díra',
      'ps.story.commands': 'Ovládání vesmírné lodě',
      'ps.story.commands-2': 'Střelba a červí díry',
      'ps.story.repeat': 'Opakuj N-krát',
      'ps.story.while': 'Opakuj dokud',
      'ps.story.loops': 'Cyklická výzva',
      'ps.story.if': 'Barevné rozhodování',
      'ps.story.comparing': 'Poziční rozhodování',
      'ps.story.if-else': 'Úplné rozhodování',
      'ps.story.loops-if': 'Závěrečná výzva',
      'ps.commands': 'Základní příkazy',
      'ps.commands-2': 'Pokročilé příkazy',
      'ps.repeat': 'Cyklus s daným počtem opakování',
      'ps.while': 'Cyklus s podmínkou',
      'ps.loops': 'Opakování cyklů',
      'ps.if': 'Podmíněný příkaz',
      'ps.comparing': 'Porovnávání',
      'ps.if-else': 'Pokud-jinak',
      'ps.loops-if': 'Cykly a podmíněné příkazy',
      'category.moves': 'Základní kroky',
      'category.world': 'Tajemný vesmír',
      'category.repeat': 'Opakuj N-krát',
      'category.while': 'Opakuj dokud',
      'category.loops': 'Zákeřné cykly',
      'category.if': 'Podmíněné příkazy',
      'category.comparing': 'Porovnávání',
      'category.if-else': 'Pokud-jinak',
      'category.final-challenge': 'Závěrečná výzva',
      'feedback.title': 'Napište nám',
      'feedback.question': 'Narazili jste na chybu v aplikaci? Máte nápad na vylepšení?',
      'feedback.email': 'E-mail (prosím vyplňte, ať Vám můžeme dát vědět odpověď)',
      'feedback.submit': 'Odeslat',
      'feedback.thanks': 'Děkujeme za zpětnou vazbu!',
      'fail-reason.crashed-last-row': 'Raketka musí v cílové rovince zastavit',
      'fail-reason.crashed-edge': 'Raketka vyletěla z vesmírné dráhy a rozbila se',
      'fail-reason.crashed-meteoroid': 'Raketka narazila do meteoroidu a rozbila se',
      'fail-reason.crashed-asteoroid': 'Raketka narazila do asteroidu a rozbila se',
      'fail-reason.last-row-not-reached': 'Raketka musí doledět do cílové rovinky',
      'fail-reason.missing-diamonds': 'Raketka musí posbírat všechny diamanty',
      'instruction.env-recommended-task-button': 'Modrá tlačítka s šipkou označují doporučenou úlohu.',
      'instruction.env-menu': 'Kliknutím na toto tlačitko rozbalíš menu.',
      'instruction.env-levelbar': 'Za každou vyřešenou úlohu dostáváš kredity. Až jich máš dostatek, postupuješ do dalšího levelu.',
      'instruction.env-help': 'Kliknutím na otazník se zobrazí všechny nápovědy. Pokud je otazník oranžový, jsou připraveny nové, nepřečtené nápovědy.',
      'instruction.env-feedback': 'Když něco nebude fungovat podle tvých představ, dej nám o tom vědět.',
      'instruction.env-login': 'Pro zapamatování postupu je potřeba se přihlásit. K přihlášení lze využít i účet u Googlu nebo Facebooku.',
      'instruction.task-space-world': 'Tvým úkolem je proletět s raketkou celou vesmírnou dráhou až na modrou čáru.',
      'instruction.task-toolbox': 'Tohle jsou příkazy k ovládání raketky. Příkazy můžeš ve svém programu používat opakovaně.',
      'instruction.task-snapping': 'Tady skládáš svůj program. Bloky mají malé zobáčky, kterými je lze zapojovat do sebe. Raketka bude vykonávat pouze příkazy zapojené pod start.',
      'instruction.task-controls': 'Program spustíš kliknutím na toto tlačítko. Můžeš ho spouštět opakovaně, dokud tvoje řešení nebude správné.',
      'instruction.task-diamond': 'Raketka musí po cestě posbírat všechny diamanty.',
      'instruction.task-asteroid': 'Asteroid. Pokud do něj raketka narazí, tak se rozbije.',
      'instruction.task-meteoroid': 'Meteoroid. Pokud do něj raketka narazí, tak se rozbije.',
      'instruction.task-wormhole': 'Pokud raketka vletí do červí díry, okamžitě se objeví v druhé červí díře.',
      'instruction.task-length-limit': 'Ukazatel délky programu. Raketka má omezenou paměť, program proto nesmí být příliš dlouhý.',
      'instruction.task-diamond-status': 'Počítadlo diamantů zobrazuje, kolik diamantů raketka posbírala a kolik jich musí posbírat celkem.',
      'instruction.task-energy-status': 'Ukazatel energie. Každý výstřel odebere raketce 1 jednotku energie.',
      'instruction.task-block-fly': 'Příkaz pro let o jedno políčko vpřed.',
      'instruction.task-block-shoot': 'Raketka vystřelí a pak se posune o jedno políčko vpřed.Rozstřelit lze malé meteoroidy v libovolné vzdálenosti.',
      'instruction.task-block-repeat': 'Tento blok říká raketce, aby N-krát zopakovala zadanou posloupnost příkazů.',
      'instruction.task-block-while': 'Tento blok říká raketce, aby opakovala zadanou posloupnost příkazů, dokud platí nějaká podmínka.',
      'instruction.task-block-color': 'Testování barvy políčka pod raketkou.',
      'instruction.task-block-position': 'Test na aktuální sloupec, ve kterém se raketka nachází. Sloupce jsou číslovány zleva 1, 2, 3, atd.',
      'instruction.task-block-if': 'Podmíněný příkaz. Raketka vykoná vnořené příkazy, pouze pokud platí určitá podmínka.',
      'instruction.task-block-if-else': 'Úplný podmíněný příkaz. Raketka vykoná jednu posloupnost příkazů, pokud podmínka platí, a jinou posloupnost příkazů, pokud podmínka neplatí.',
      'instruction.editor-setting': 'Editor umožňuje tvorbu vlastních zadání. Pokud vytvoříte nějakou pěknou úlohu, tak nám ji můžete poslat.',
      'instruction.editor-space-world': 'Každé políčko na mřížce má nějakou barvu (k = černá, r = červená, g = zelená) a objekty (A = asteroid, M = meteoroid, D = diamant, W = červí díra).',
      'instruction.overview-levels': 'Úlohy jsou rozdělené do levelů podle jejich obtížnosti. Vyřešené levely jsou vybarvené modře, nevyřešené šedě.',
      'instruction.overview-difficulty': 'Počet puclíků znázorňuje obtížnost úlohy v rámci daného levelu.',
      'instruction.overview-solved-task': 'Vyřešené úlohy jsou obarvené modře.',
      'instruction.overview-recommended-task': 'Doporučená úloha je obarvená oranžově.',
      'user.email': 'Email',
      'user.login': 'Přihlásit se',
      'user.via-facebook': 'Skrze Facebook',
      'user.via-google': 'Skrze Google',
      'user.logout': 'Odhlásit se',
      'user.delete-history': 'Smazat historii',
      'user.nickname': 'Přezdívka',
      'user.password': 'Heslo',
      'user.signup': 'Registrace',
      'user.login-failed': 'Nesprávný email nebo heslo.',
      'user.signup-success': 'Registrace proběhla úspěšně!'
    }
  }
};