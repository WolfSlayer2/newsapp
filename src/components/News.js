import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 9,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    capitlizeText(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title = `${this.capitlizeText(this.props.category)} - NewsNest`
    }
    async newsUpdate() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=618a1f0348634d02bc350074e657b3fa&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let response = await fetch(url);
        let data = await response.json();
        this.setState({ articles: data.articles, totalResults: data.totalResults, loading: false })
    }
    async componentDidMount() {
        this.newsUpdate();
    }

    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 })
        this.newsUpdate();
    }
    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 })
        this.newsUpdate();
    }

    render() {
        return (
            <div className='container my-3'>
                <h2 className='text-center'>Top {this.capitlizeText(this.props.category)} Headlines</h2>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((ele) => {
                        return <div className="col-md-4" key={ele.url}>
                            <Newsitem title={ele.title ? ele.title.slice(0, 45) : ""} desc={ele.description ? ele.description.slice(0, 88) : ""} imgUrl={ele.urlToImage} newsUrl={ele.url} date={ele.publishedAt} source={ele.source.name} />
                        </div>
                    })}
                </div>
                <div className="container my-3 d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Prev</button>
                    <button disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News

