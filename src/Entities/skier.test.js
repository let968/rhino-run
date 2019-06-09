import "babel-polyfill";
import { Skier } from './Skier';
import * as Constants from '../Constants';

const assert = require('assert');

describe('The skier class', () => {
    it('Game should be able to call new() on Skier', () => {
        const skier = new Skier(0,0);
        
        expect(skier).toBeTruthy();
    });
    
    it('When skiing down, turn left should change skier direction to left down', () => {
        const skier = new Skier(0,0);
        skier.turnLeft();
        const actual = skier.direction;
        const expected = Constants.SKIER_DIRECTIONS.LEFT_DOWN;

        assert.equal(actual,expected);
    });

    it('When skiing left down, turn left should change skier direction to left', () => {
        const skier = new Skier(0,0);
        skier.direction = Constants.SKIER_DIRECTIONS.LEFT_DOWN;

        skier.turnLeft();

        const actual = skier.direction;
        const expected = Constants.SKIER_DIRECTIONS.LEFT;

        assert.equal(actual,expected);
    });

    it('When skiing left, turn left should not change skier direction', () => {
        const skier = new Skier(0,0);
        skier.direction = Constants.SKIER_DIRECTIONS.LEFT;

        skier.turnLeft();

        const actual = skier.direction;
        const expected = Constants.SKIER_DIRECTIONS.LEFT;

        assert.equal(actual,expected);
    });

    it('When skier crashed, turn left should change skier direction to left', () => {
        const skier = new Skier(0,0);
        skier.direction = Constants.SKIER_DIRECTIONS.CRASH;

        skier.turnLeft();

        const actual = skier.direction;
        const expected = Constants.SKIER_DIRECTIONS.LEFT;

        assert.equal(actual,expected);
    });

    it('When skiing right, turn left should change skier direction to right down', () => {
        const skier = new Skier(0,0);
        skier.direction = Constants.SKIER_DIRECTIONS.RIGHT;

        skier.turnLeft();

        const actual = skier.direction;
        const expected = Constants.SKIER_DIRECTIONS.RIGHT_DOWN;

        assert.equal(actual,expected);
    });

    it('When skiing right down, turn left should change skier direction to down', () => {
        const skier = new Skier(0,0);
        skier.direction = Constants.SKIER_DIRECTIONS.RIGHT_DOWN;

        skier.turnLeft();

        const actual = skier.direction;
        const expected = Constants.SKIER_DIRECTIONS.DOWN;

        assert.equal(actual,expected);
    });
});