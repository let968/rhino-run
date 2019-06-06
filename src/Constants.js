export const GAME_WIDTH = window.innerWidth;
export const GAME_HEIGHT = window.innerHeight;

export const SKIER_SPRITE = 'skierSprite';
export const SKIER_CRASH = 'skierCrash';
export const SKIER_LEFT = 'skierLeft';
export const SKIER_LEFTDOWN = 'skierLeftDown';
export const SKIER_DOWN = 'skierDown';
export const SKIER_JUMP = 'skierJump';
export const SKIER_RIGHTDOWN = 'skierRightDown';
export const SKIER_RIGHT = 'skierRight';
export const TREE = 'tree';
export const TREE_CLUSTER = 'treeCluster';
export const ROCK1 = 'rock1';
export const ROCK2 = 'rock2';
export const RHINO_DEFAULT = 'rhino_default';
export const RHINO_STRIDE_LEFT = 'rhino_run_left';
export const RHINO_STRIDE_RIGHT = 'rhino_run_left_2';
export const RHINO_LIFT = 'rhino_lift';
export const RHINO_LIFT_MOUTH_OPEN = 'rhino_lift_mouth_open';
export const RHINO_EAT_1 = 'rhino_lift_eat_1';
export const RHINO_EAT_2 = 'rhino_lift_eat_2';
export const RHINO_EAT_3 = 'rhino_lift_eat_3';
export const RHINO_EAT_4 = 'rhino_lift_eat_4';
export const SKIER_STARTING_SPEED = 5;
export const SKIER_DIAGONAL_SPEED_REDUCER = 1.4142;

export const ASSETS = {
    [SKIER_SPRITE]: '/img/skier_jump_5.png',
    [SKIER_CRASH]: '/img/skier_crash.png',
    [SKIER_LEFT]: '/img/skier_left.png',
    [SKIER_LEFTDOWN]: '/img/skier_left_down.png',
    [SKIER_DOWN]: '/img/skier_down.png',
    [SKIER_JUMP]: '/img/skier_jump_3.png',
    [SKIER_RIGHTDOWN]: '/img/skier_right_down.png',
    [SKIER_RIGHT]: '/img/skier_right.png',
    [TREE] : '/img/tree_1.png',
    [TREE_CLUSTER] : '/img/tree_cluster.png',
    [ROCK1] : '/img/rock_1.png',
    [ROCK2] : '/img/rock_2.png',
    [RHINO_DEFAULT] : '/img/rhino_default.png',
    [RHINO_STRIDE_LEFT] : '/img/rhino_run_left.png',
    [RHINO_STRIDE_RIGHT] : '/img/rhino_run_left_2.png',
    [RHINO_LIFT] : '/img/rhino_lift.png',
    [RHINO_LIFT_MOUTH_OPEN] : '/img/rhino_lift_mouth_open.png',
    [RHINO_EAT_1] : '/img/rhino_lift_eat_1.png',
    [RHINO_EAT_2] : '/img/rhino_lift_eat_2.png',
    [RHINO_EAT_3] : '/img/rhino_lift_eat_3.png',
    [RHINO_EAT_4] : '/img/rhino_lift_eat_4.png'
};

export const SKIER_DIRECTIONS = {
    JUMP: -1,
    CRASH : 0,
    LEFT : 1,
    LEFT_DOWN : 2,
    DOWN : 3,
    RIGHT_DOWN : 4,
    RIGHT : 5
};

export const RHINO_DIRECTIONS = {
    LEFT_DOWN: 2,
    RIGHT_DOWN: 4,
    DOWN: 3
};

export const SKIER_DIRECTION_ASSET = {
    [SKIER_DIRECTIONS.CRASH] : SKIER_CRASH,
    [SKIER_DIRECTIONS.LEFT] : SKIER_LEFT,
    [SKIER_DIRECTIONS.LEFT_DOWN] : SKIER_LEFTDOWN,
    [SKIER_DIRECTIONS.DOWN] : SKIER_DOWN,
    [SKIER_DIRECTIONS.RIGHT_DOWN] : SKIER_RIGHTDOWN,
    [SKIER_DIRECTIONS.RIGHT] : SKIER_RIGHT,
    [SKIER_DIRECTIONS.JUMP] : SKIER_JUMP
};

export const RHINO_END_GAME = [
    RHINO_LIFT,
    RHINO_LIFT_MOUTH_OPEN,
    RHINO_EAT_1,
    RHINO_EAT_2,
    RHINO_EAT_3,
    RHINO_EAT_4,
    RHINO_DEFAULT
];

export const KEYS = {
    LEFT : 37,
    RIGHT : 39,
    UP : 38,
    DOWN : 40,
    SPACE : 32,
    R: 82,
    T: 84
};