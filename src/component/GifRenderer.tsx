import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Grid } from '@giphy/react-components';
import './GifRenderer.scss';
import { Container } from 'reactstrap';

interface Props {
  searchFunction: any;
  searchFunctionTimestamp: number;
}

const columns = isMobile ? 1 : 4;

function GifRenderer(props: Props) {
  const { searchFunction, searchFunctionTimestamp } = props;

  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  return (
    <Container className="renderer-container">
      {searchFunction && (
        <Grid
          key={searchFunctionTimestamp}
          width={isMobile ? width - 25 : 796}
          columns={columns}
          gutter={0}
          borderRadius={0}
          fetchGifs={searchFunction}
        />
      )}
    </Container>
  );
}

export default GifRenderer;
