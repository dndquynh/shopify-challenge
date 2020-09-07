import React from 'react';
import { Alert, Navbar, NavbarBrand, Container, Button, Form, FormGroup, Input, Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './App.css';
import Movie from './movie'
import axios from 'axios';
import HttpStatus from 'http-status-codes';

class TheShoppies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      results: [],
      nominations: []
    };

    this.onSearch = this.onSearch.bind(this);
    this.onSearchQueryChange =this.onSearchQueryChange.bind(this);
    this.onNominate = this.onNominate.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  onSearchQueryChange(e) {
    this.setState({ searchQuery: e.target.value });
  }

  onSearch(event) {
    event.preventDefault();
    axios.get(`http://www.omdbapi.com/?s=${this.state.searchQuery}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`)
      .then (res => {
          if (res.status === HttpStatus.OK) {
              const movies = res.data.Search;
              this.setState({ results: movies.map((movie, i) => <Movie title={movie.Title} year={movie.Year} poster={movie.Poster} onNominate={this.onNominate} onRemove={this.onRemove} inNominationList={false} key={i}></Movie>) });
          }
      })
      .catch (error => {
          console.log(error);
      })
  }

  onEnterPress(event) {
    if (event.keyCode === 13) this.onSearch();
  }

  onNominate(movieComponent) {
    if (this.state.nominations.length >= 5) return false;
    if (this.state.nominations.length >= 4) {
      let alert = document.getElementById("finish-alert");
      alert.style.display = "block";
    };
    this.setState(prevState => ({
      nominations: [...prevState.nominations, movieComponent]
    }));
    return true;
  }

  onRemove(identifier) {
    let alert = document.getElementById("finish-alert");
    alert.style.display = "none";
    this.setState(prevState => ({
      nominations: prevState.nominations.filter(item => item.props.title+item.props.year !== identifier)
    }));
  }

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
            <NavbarBrand className="gold-color">
              The Shoppies
            </NavbarBrand>
        </Navbar>
        <Alert id="finish-alert">
          <h4>Congratulation!</h4>
          You have successfully nominated 5 movies!
        </Alert>
        <br></br>

        <Container>
          <Form inline onSubmit={this.onSearch}>
            <FormGroup className="ml-5 w-75">
              <Input id="search-query" className="w-100" placeholder="Movie title" onChange={this.onSearchQueryChange} value={this.state.searchQuery}></Input>
            </FormGroup>
            <Button onClick={this.onSearch} className="gold-color">
              <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
            </Button>
          </Form>
        </Container>

        <br></br>

        <Container>
          <Row>
            <Col id="search-result" className="col-8">
              <h4>Results</h4>
              {this.state.results}
            </Col>
            <Col id="nomination">
              <h4>Nomination list</h4>
              {this.state.nominations}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function App(props) {
  return (
    <TheShoppies></TheShoppies>
  );
}

export default App;
