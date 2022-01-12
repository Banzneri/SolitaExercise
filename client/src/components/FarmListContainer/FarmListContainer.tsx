import { Container, SelectChangeEvent } from '@mui/material';
import { FC, useState, useEffect } from 'react';
import { getAllFarms } from '../../services/FarmService';
import FarmList from './FarmList';

interface FarmListContainerProps {
  handleFarmChange(e: SelectChangeEvent<unknown>): void
}

const FarmListContainer: FC<FarmListContainerProps> = ({
  handleFarmChange,
}) => {
  const [farms, setFarms] = useState();

  useEffect(() => {
    const update = async () => {
      const data = await getAllFarms();
      setFarms(data);
    };
    update();
  }, []);

  return (
    <Container>
      {farms && <FarmList farms={farms} handleFarmChange={handleFarmChange} />}
    </Container>
  );
};

export default FarmListContainer;
