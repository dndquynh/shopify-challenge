import React from 'react';
import { Button } from 'reactstrap'
import './movie.css'

export default class Movie extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isNominated: false,
        }
        this.nominate = this.nominate.bind(this);
        this.remove = this.remove.bind(this);
        this.removeNomination = this.removeNomination.bind(this);
    }

    nominate() {
        const movie = <Movie title={this.props.title} year={this.props.year} poster={this.props.poster} onRemove={this.props.onRemove} onRemoveNomination={this.removeNomination} inNominationList={true} key={this.props.title + this.props.year}></Movie>;
        const res = this.props.onNominate(movie);
        if (res === true) this.setState({ isNominated: true });

    }

    remove() {
        this.props.onRemove(this.props.title + this.props.year);
        this.props.onRemoveNomination();
    }

    removeNomination() {
        this.setState({ isNominated: false });
    }

    render() {
        const button = !this.props.inNominationList ?
        (<Button color="dark" size="sm" disabled={this.state.isNominated} onClick={this.nominate}>Nominate</Button>) :
        (<Button color="dark" size="sm" onClick={this.remove}>Remove</Button>);

        return (
            <div className="movie-div">
                <div className='image-wrapper'>
                    <img src={this.props.poster} alt='poster'></img>
                </div>
                <div className='title-wrapper'>
                    <p className='movie-title' title={this.props.title}>{this.props.title}</p>
                    <p className='movie-title' title={this.props.year}>{this.props.year}</p>
                </div>
                <div align="center">
                    {button}
                </div>
            </div>
        );
    }
}