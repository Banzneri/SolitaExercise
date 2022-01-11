import React from 'react';
import { FarmData } from '../types/types';

interface TestProps {
  data: FarmData[],
}

const Test: React.FC<TestProps> = ({ data }) => (
  <div>
    {data.map((e) => e)}
  </div>
);

export default Test;
