import { useState } from 'react';
import './GifGrabber.scss';
import GifSearch from './GifSearch';
import GifRenderer from './GifRenderer';

function GifGrabber() {
  const [searchFunction, setSearchFunction] = useState(null);
  const [searchFunctionTimestamp, setSearchFunctionTimestamp] = useState(0);

  const onSearch = (searchFunction: any, searchFunctionTimestamp: any) => {
    setSearchFunction(searchFunction);
    setSearchFunctionTimestamp(searchFunctionTimestamp);
  };

  return (
    <>
      <GifSearch onSearch={onSearch} />
      <GifRenderer searchFunction={searchFunction} searchFunctionTimestamp={searchFunctionTimestamp} />
    </>
  );
}

export default GifGrabber;
