import assert from 'assert';
import mocha from 'mocha';
import { validFarmDataObject } from '../lib/utils';
import { FarmData } from '../types/FarmData';

const { describe, it } = mocha;

describe('ValidateFarmData', () => {
  describe('validateTemperature', () => {
    const falseTemperature1: FarmData = {
      farmId: 1,
      datetime: new Date('2019-01-02T11:19:44.018Z'),
      sensorType: 'temperature',
      value: -52,
    };

    const falseTemperature2: FarmData = {
      farmId: 1,
      datetime: new Date('2019-01-02T11:19:44.018Z'),
      sensorType: 'temperature',
      value: -49,
    };

    const trueTemperature: FarmData = {
      farmId: 1,
      datetime: new Date('2019-01-02T11:19:44.018Z'),
      sensorType: 'temperature',
      value: 101,
    };

    it('should return false when temperature is below -50', () => {
      assert.equal(validFarmDataObject(falseTemperature1), false);
    });

    it('should return false when temperature is above 100', () => {
      assert.equal(validFarmDataObject(trueTemperature), false);
    });

    it('should return true when temperature is within limits', () => {
      assert.equal(validFarmDataObject(falseTemperature2), true);
    });
  });

  describe('validateRainfall', () => {
    const falseRainfall1: FarmData = {
      farmId: 1,
      datetime: new Date('2019-01-02T11:19:44.018Z'),
      sensorType: 'rainfall',
      value: -1,
    };

    const falseRainfall2: FarmData = {
      farmId: 1,
      datetime: new Date('2019-01-02T11:19:44.018Z'),
      sensorType: 'rainfall',
      value: 501,
    };

    const trueRainfall: FarmData = {
      farmId: 1,
      datetime: new Date('2019-01-02T11:19:44.018Z'),
      sensorType: 'rainfall',
      value: 400,
    };

    it('should return false when rainfall is below 0', () => {
      assert.equal(validFarmDataObject(falseRainfall1), false);
    });

    it('should return false when rainfall is above 500', () => {
      assert.equal(validFarmDataObject(falseRainfall2), false);
    });

    it('should return true when rainfall is within limits', () => {
      assert.equal(validFarmDataObject(trueRainfall), true);
    });
  });

  describe('validatePh', () => {
    const falsePh1: FarmData = {
      farmId: 1,
      datetime: new Date('2019-01-02T11:19:44.018Z'),
      sensorType: 'ph',
      value: -1,
    };

    const falsePh2: FarmData = {
      farmId: 1,
      datetime: new Date('2019-01-02T11:19:44.018Z'),
      sensorType: 'ph',
      value: 15,
    };

    const truePh: FarmData = {
      farmId: 1,
      datetime: new Date('2019-01-02T11:19:44.018Z'),
      sensorType: 'ph',
      value: 7,
    };

    const unknownFarmName: FarmData = {
      farmId: 99,
      datetime: new Date('2019-01-02T11:19:44.018Z'),
      sensorType: 'ph',
      value: 7,
    };

    it('should return false when ph is below 0', () => {
      assert.equal(validFarmDataObject(falsePh1), false);
    });

    it('should return false when ph is above 14', () => {
      assert.equal(validFarmDataObject(falsePh2), false);
    });

    it('should return true when ph is within limits', () => {
      assert.equal(validFarmDataObject(truePh), true);
    });

    it('should return false if farm name doesn\'t exist', () => {
      assert.equal(validFarmDataObject(unknownFarmName), false);
    });
  });

  describe('validateSensorType', () => {
    const wrongInput: FarmData = {
      farmId: 1,
      datetime: new Date('2019-01-02T11:19:44.018Z'),
      sensorType: 'phh',
      value: 7,
    };

    it('should return false if sensortype is wrong', () => {
      assert.equal(validFarmDataObject(wrongInput), false);
    });
  });
});
