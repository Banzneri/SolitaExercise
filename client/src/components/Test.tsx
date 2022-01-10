import { FarmData } from '../../../server/src/types/types';

interface TestProps {
  data: FarmData[],
}

const Test: React.FC<TestProps> = ({ data }) => {
  return (
    <div>
      {data.map((e) => e)}
    </div>
  );
};

export default Test;
