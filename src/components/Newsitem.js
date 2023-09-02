import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let { title, desc, imgUrl, newsUrl, date, source } = this.props;
    return (
      <div className='my-3 mx-3'>
        <div className="card">
          <span className="position-absolute top-0  translate-middle badge rounded-pill bg-secondary" style={{ left: "95%", zIndex: '1' }}>
            {source}
          </span>
          <img src={imgUrl ? imgUrl : "https://swarajya.gumlet.io/swarajya/2021-12/2deef8fa-67e7-4469-8a50-f0dfac9ebaca/ahddagfiugr.jpg?w=1200&auto=format%2Ccompress&ogImage=true"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}..</h5>
            <p className="card-text">
              {desc}...
            </p>
            <p className="card-text"><small className="text-body-secondary">Published at {new Date(date).toUTCString()}</small></p>
            <a href={newsUrl} target='_blank' rel="noopener noreferrer" className="btn btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Newsitem