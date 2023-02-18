import { useEffect, useState } from 'react';
import { Col, Container, Input, Row } from 'reactstrap';
import { GiphyFetch } from '@giphy/js-fetch-api';
import './GifSearch.scss';

interface Props {
  onSearch: (searchFunction: any, timestamp: any) => void;
}

const gf = new GiphyFetch(`${process.env.REACT_APP_GIPHY_APP_ID}`);

function GifSearch(props: Props) {
  const { onSearch } = props;

  const [searchTerm, setSearchTerm] = useState('');
  const [previousSearchTerms, setPreviousSearchTerms] = useState([] as string[]);

  useEffect(() => {
    performSearch('trending');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = (e: any) => {
    e.preventDefault();

    performSearch(searchTerm);
  };

  const performSearch = (searchTerm: string) => {
    const searchFunction = () => {
      return (offset: number) => gf.search(searchTerm, { offset, limit: 50 });
    };

    onSearch(searchFunction, new Date().getTime());

    const index = previousSearchTerms.indexOf(searchTerm, 0);

    if (index > -1) {
      previousSearchTerms.splice(index, 1);
    }

    setPreviousSearchTerms([...previousSearchTerms, searchTerm]);
    setSearchTerm('');
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleClick(e);
    }
  };

  const handlePreviousLinkClick = (term: string) => {
    performSearch(term);
  };

  return (
    <Container className="search-container">
      <Row className="search-row">
        <Col className="logo-column" xs="12">
          <img src="giphy-logo.png" alt="logo" className="logo-image" />
          <div className="logo-text">GIPHY GRABBER</div>
        </Col>
      </Row>

      <Row className="search-row">
        <Col className="search-column" xs="12">
          <Input
            type="text"
            name="search"
            id="search"
            maxLength={30}
            placeholder={'Search...'}
            className="search-text"
            value={searchTerm}
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
          <div className="previous-container">
            <div className="previous-label">
              <div>Previous</div>
              <div>Searches:</div>
            </div>
            <div className="previous-text-container">
              {previousSearchTerms.map((term) => {
                return (
                  <div
                    className="previous-text-item"
                    key={term}
                    onClick={() => handlePreviousLinkClick(term)}
                  >
                    {term}
                  </div>
                );
              })}
            </div>
          </div>
        </Col>
      </Row>

      <Row className="search-row">
        <Col xs="12">
          <div className="results-label">Showing Results for:</div>
          <div className="results-text">{previousSearchTerms[previousSearchTerms.length - 1]}</div>
        </Col>
      </Row>
    </Container>
  );
}

export default GifSearch;
