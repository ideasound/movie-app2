import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';


class App extends Component {


    // Render: componentWillMount() => render() => componentDidMount()

    // Update: componentWillReceiveProps => shouldComponentUpdate() => componentWillUpdate() => render() => componentDidUpdate()

    state = {}

    componentWillMount() {
        console.log('will mount');

    }

    componentDidMount() {

        /*
        setTimeout(() => {
            this.setState({


                //movies: [
                //    ...this.state.movies,
                //    {
                //        title: "Trainspotting",
                //        poster: "https://upload.wikimedia.org/wikipedia/en/7/71/Trainspotting_ver2.jpg"
                //    }
                //]

        /*
            이건 그만하고 ajax 로 불러오자.
                movies: [
                    {
                        title: "Jason Born",
                        poster: "http://image.cine21.com/resize/cine21/poster/2016/0715/10_28_32__57883c402703c[X230,330].JPG"
                    },
                    {
                        title: "Intern",
                        poster: "https://t1.daumcdn.net/cfile/tistory/264ED83C5626FB7B02"
                    },
                    {
                        title: "Trainspotting",
                        poster: "https://upload.wikimedia.org/wikipedia/en/7/71/Trainspotting_ver2.jpg"
                    }

                ]


            });
        }, 5000);


        */

        /*
        fetch('https://yts.am/api/v2/list_movies.jsonp?sort_by=rating')
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(err => console.log("err:" + err));
        */
        this._getMovies();
    }

    // async 를 안쓰면 await이 작동하지 않음
     _getMovies = async () => {
        const movies = await this._callApi()
        this.setState({
            movies
        })
    }

    _callApi = () => {
        return fetch('https://yts.am/api/v2/list_movies.jsonp?sort_by=rating')
            .then(response => response.json())
            .then(json => json.data.movies)
            .catch(err => console.log("err:" + err));
    }

    _renderMovies = () => {
        // const movies = this.state.movies.map( (movie,index) => {
        // index를 쓰는 것은 속도 이슈로 느림
        const movies = this.state.movies.map(movie => {
            console.log(movie);
            return <Movie title={movie.title} poster={movie.large_cover_image} genres={movie.genres} synopsis={movie.synopsis} key={movie.id} />
        })

        return movies
    }

  render() {
      console.log('render')
      const { movies } = this.state;

    return (
      <div className={ movies ? "App" : "App--loading"}>
          {movies ? this._renderMovies() : 'Loading'}
      </div>
    );
  }
}

export default App;
