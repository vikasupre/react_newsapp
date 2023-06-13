import React, { Component } from "react";
import defaultImage from "./no-image-icon-23483.png";

export default class NewsItems extends Component {
  render() {
    let { title, description, imageUrl, url, author, date, source } =
      this.props;
    return (
      <div>
        <div className="card" >
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: '50%' }}>
            {source}
          </span>
          <img
            src={imageUrl ? imageUrl : defaultImage}
            className="card-img-top img-fluid"
            alt="..."
            style={{ objectFit: "center" }}
          />
          <div className="card-body">
            <h5 className="card-title"> {title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {author?author:'unknown'} on {new Date(date).toUTCString()}
              </small>
            </p>
            <a
              href={url}
              target="_blank"
              className="btn btn-sm btn-primary"
              rel="noopener noreferrer"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}
