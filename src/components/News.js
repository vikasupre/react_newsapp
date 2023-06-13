import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    category: "general",
    pageSize: 9,
  };
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };
  constructor(props) {
    super(props);
    this.state = { articles: [], page: 1, loading: false, totalresults: 0 };
    document.title = `Newsapp - ${this.props.category}`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    this.setState({ loading: true });
    let response = await fetch(url);
    this.props.setProgress(50);
    let parseddata = await response.json();
    this.props.setProgress(100);
    this.setState({
      articles: parseddata.articles,
      totalresults: parseddata.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    this.updateNews();
  }

  // handleNextClick = async () => {
  //   console.log(this.state.page);
  //   await this.setState({ page: this.state.page + 1 });
  //   await this.updateNews();
  //   console.log(this.state.page);
  // };
  // handlePrevClick = async () => {
  //   console.log(this.state.page);
  //   await this.setState({ page: this.state.page - 1 });
  //   await this.updateNews();
  //   console.log(this.state.page);
  // };

  fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country
      }&category=${this.props.category
      }&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize
      }&page=${this.state.page + 1}`;
    // this.setState({ loading: true });
    let response = await fetch(url);
    let parseddata = await response.json();
    this.setState({
      articles: this.state.articles.concat(parseddata.articles),
      totalresults: parseddata.totalResults,
      page: this.state.page + 1,
      loading: false,
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center " style={{ marginTop: '5rem' }}>Breaking News</h1>
        {this.state.loading ? <Loading /> : null}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalresults}
          loader={<Loading />}
        >
          <div className="container">
            <div className="row my-3">
              {this.state.articles.map((elements) => {
                return (
                  <div className="col-md-4 col-sm-6 my-2 " key={elements.url}>
                    <NewsItems
                      title={elements.title}
                      description={elements.description}
                      url={elements.url}
                      imageUrl={elements.urlToImage}
                      author={elements.author}
                      date={elements.publishedAt}
                      source={elements.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            className="btn btn-dark"
            disabled={this.state.page <= 1}
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            className="btn btn-dark"
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalresults / 15)
            }
            onClick={this.handleNextClick}
          >
            &rarr; Next
          </button>
        </div> */}
      </>
    );
  }
}
