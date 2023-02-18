import { useState } from 'react';
import { Col, Container, Input, Row } from 'reactstrap';
import { GiphyFetch } from '@giphy/js-fetch-api';
import './GifSearch.scss';

interface Props {
  onSearch: (searchFunction: any, timestamp: any) => void;
}

function GifSearch(props: Props) {
  const {onSearch} = props;

  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = (e: any) => {
    e.preventDefault();

    const gf = new GiphyFetch(`${process.env.REACT_APP_GIPHY_APP_ID}`);

    const searchFunction = () => {
      return (offset: number) => gf.search(searchTerm, { offset, limit: 10 });
    }

    onSearch(searchFunction, new Date().getTime());
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleClick(e);
    }
  };

  return (
    <Container className="search-container">
      <Row className="search-row">
        <Col className="logo-column" xs="12">
          <img src="giphy-logo.png" alt="logo" className="logo-image" />
          <div className="logo-text">
            GIPHY GRABBER
          </div>
        </Col>
      </Row>

      <Row className="search-row">
        <Col className="search-column" xs="12">
          <Input
            type="text"
            name="search"
            id="search"
            maxLength={30}
            placeholder={"Search..."}
            className="search-text"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button className="search-button" onClick={handleClick}>
            <img src="submit.png" alt="submit" className="search-image" />
          </button>
        </Col>
      </Row>

      <Row className="search-row">
        <Col xs="12">
          <div className="previous-text">
            Previous<br/>
            Searches:
          </div>
        </Col>
      </Row>

      <Row className="search-row">
        <Col xs="12">
          <div className="results-label">
            Showing Results for:
          </div>
          <div className="results-text">
            {searchTerm}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default GifSearch;
