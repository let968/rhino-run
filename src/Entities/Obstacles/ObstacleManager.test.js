import "babel-polyfill";
import { ObstacleManager,NEW_OBSTACLE_CHANCE,DIFFICULTY } from './ObstacleManager';

const assert = require('assert');


describe('Difficulty increase', () => {
    it('Difficulty should decrease NEW_OBSTACLE_CHANCE variable', () => {
        const obstacleManager = new ObstacleManager();
        const expectedValues = [8,7,6,5,4,3,3,3];

        for(let i = 0;i < 8; i++){
            obstacleManager.scaleDifficulty(i * 10000);
            const actual = NEW_OBSTACLE_CHANCE;
            const expected = expectedValues[i];

            assert.equal(actual,expected,'Difficulty did not scale properly');
        }
    });
});