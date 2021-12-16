import fs from 'fs';
import parse from 'csv-parser';

function CSVToArray(filePath, handleResult) {
  const records = [];

  const parser = parse({
    delimiter: ',',
    trime: true,
  });

  fs.createReadStream(filePath)
    .pipe(parser)
    .on('readable', () => {
      let record;
      // eslint-disable-next-line no-cond-assign
      while ((record = parser.read()) !== null) {
        records.push(record);
      }
    })
    .on('end', () => {
      handleResult(null, records);
    })
    .on('error', (err) => {
      handleResult(err);
    });
}

export default CSVToArray;
