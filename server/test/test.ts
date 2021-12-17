import assert from 'assert';
import mocha from 'mocha';
import { validFarmDataObject } from '../lib/utils';
import { FarmDataObject } from '../types/FarmDataObject';

const { describe, it } = mocha;

describe('ValidateFarmData', () => {
  const mockData: FarmDataObject = {
    location: 'Noora\'s farm',
    datetime: new Date('2019-01-02T11:19:44.018Z'),
    sensorType: 'temperature',
    value: -52,
  };

  const mockData1: FarmDataObject = {
    location: 'Noora\'s farm',
    datetime: new Date('2019-01-02T11:19:44.018Z'),
    sensorType: 'temperature',
    value: -49,
  };

  const mockData2: FarmDataObject = {
    location: 'Noora\'s farm',
    datetime: new Date('2019-01-02T11:19:44.018Z'),
    sensorType: 'temperature',
    value: 101,
  };

  it('should return false when temperature is below -50', () => {
    assert.equal(validFarmDataObject(mockData), false);
  });

  it('should return false when temperature is above 100', () => {
    assert.equal(validFarmDataObject(mockData2), false);
  });

  it('should return true when temperature is within limits', () => {
    assert.equal(validFarmDataObject(mockData1), true);
  });
});
