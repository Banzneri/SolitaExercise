import { FarmDataObject } from './FarmDataObject';

export interface HandleCSVParsingResults {
  (error: Error | null, farmDataObjects?: FarmDataObject[]): void;
}
