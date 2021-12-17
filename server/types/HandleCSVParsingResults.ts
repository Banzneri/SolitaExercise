import { FarmDataObject } from './FarmDataObject';

export interface HandleCSVParsingResults {
  (error: Error | null, farmDataObjects?: Array<FarmDataObject>): void;
}
