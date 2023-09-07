import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"

function News(props) {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitlizeText = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    const newsUpdate = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading({ loading: true })
        let response = await fetch(url);
        props.setProgress(30);
        let data = await response.json();
        props.setProgress(70);
        setArticles(data.articles)
        setTotalResults(data.totalResults)
        setLoading(false)
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${capitlizeText(props.category)} - NewsNest`
        newsUpdate()
        // eslint-disable-next-line
    }, [])

    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        let response = await fetch(url);
        let data = await response.json();
        setArticles(articles.concat(data.articles))
        setTotalResults(data.totalResults)
        setLoading(false)
    }

    return (
        <>
            <h1 className='text-center' style={{ margin: '35px 0px', marginTop: '85px' }}>Top {capitlizeText(props.category)} Headlines</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((ele) => {
                            return <div className="col-md-4" key={ele.url}>
                                <Newsitem title={ele.title ? ele.title.slice(0, 45) : ""} desc={ele.description ? ele.description.slice(0, 88) : ""} imgUrl={ele.urlToImage} newsUrl={ele.url} date={ele.publishedAt} source={ele.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News

