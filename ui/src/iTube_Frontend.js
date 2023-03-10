import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Nav } from "react-bootstrap";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import { LinkContainer } from "react-router-bootstrap";

const PF = "http://localhost:4000/videos/";
class ITube extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      search: "",
      filteredVideos: [],
    };

  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/api/videos")
      .then((res) => {
        console.log("returned data",res.data)
        this.setState({ videos: res.data });
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
      });
  }

   handleSubmit=(event)=> {
    event.preventDefault();
    const { videos, search } = this.state;
    const filteredVideos = videos.filter(
      (video) =>
        video.title.toLowerCase().includes(search.toLowerCase()) ||
        video.description.toLowerCase().includes(search.toLowerCase()) ||
        video.tags.toLowerCase().includes(search.toLowerCase())
    );
    this.setState({ filteredVideos });
  }

  handleSearchChange=(event)=> {
    this.setState({ search: event.target.value });
  }

  render() {
    const { filteredVideos, search, videos } = this.state;
    const allVideosLayout = (
      <ul style={{ "padding-right": "32px" }}>
        <div>
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {videos.map((vid) => {
              return (
                <div class="col">
                  <div class="card">
                    <iframe allowfullscreen src={PF + vid.video} />
                    <div class="card-body">
                      <h5 class="card-title">{vid.title}</h5>
                      <p class="card-text">{vid.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ul>
    );

    // render layout for filtered videos
    const filteredVideosLayout = (
      <ul style={{ "padding-right": "32px" }}>
        {filteredVideos.map((vid) => {
          return (
            <div>
              <div class="card mb-3">
                <div class="row g-0">
                  <div class="col-md-6">
                    <iframe src={PF + vid.video} />
                  </div>
                  <div class="col-md-6">
                    <div class="card-body">
                      <h3 class="card-title">{vid.title}</h3>
                      <p class="card-text">{vid.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </ul>
    );
    return (
      <div style={{ height: "100vh", overflowY: "scroll" }}>
        <div>
          <nav class="navbar navbar-dark bg-dark fixed-top">
            <div class="container-fluid d-flex align-items-center">
              <button
                class="navbar-toggler me-3"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasDarkNavbar"
                aria-controls="offcanvasDarkNavbar"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <a class="navbar-brand me-auto" href="/">
                <span
                  style={{
                    color: "orangered",
                    "font-weight": "bold",
                    "font-size": "30px",
                  }}
                >
                  i
                </span>
                <span style={{ "font-size": "25px", "font-weight": "bold" }}>
                  Tube
                </span>
              </a>
              &emsp;
              <form
                class="d-flex flex-grow-1 justify-content-center"
                onSubmit={this.handleSubmit}
              >
                <input
                  class="form-control me-2"
                  value={search}
                  onChange={this.handleSearchChange}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button class="btn btn-secondary" type="submit">
                  <AiIcons.AiOutlineSearch />
                </button>
              </form>
              <div
                class="offcanvas offcanvas-start text-bg-dark"
                tabindex="-1"
                id="offcanvasDarkNavbar"
                aria-labelledby="offcanvasDarkNavbarLabel"
                style={{ width: "20%" }}
              >
                <div class="offcanvas-header">
                  <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">
                    <span
                      style={{
                        color: "orangered",
                        "font-weight": "bold",
                        "font-size": "30px",
                      }}
                    >
                      i
                    </span>
                    <span
                      style={{ "font-size": "25px", "font-weight": "bold" }}
                    >
                      Tube
                    </span>
                  </h5>
                  <button
                    type="button"
                    class="btn-close btn-close-white"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div
                  class="offcanvas-body"
                  style={{ "padding-left": "50px", "padding-right": "50px" }}
                >
                  <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li class="nav-item">
                      <LinkContainer to="/">
                        <Nav.Link>
                          <AiIcons.AiOutlineHome />
                          &ensp;Home
                        </Nav.Link>
                      </LinkContainer>
                    </li>
                    <li class="nav-item">
                      <LinkContainer to="/upload">
                        <Nav.Link>
                          <MdIcons.MdCloudUpload />
                          &ensp;Upload
                        </Nav.Link>
                      </LinkContainer>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
          <br />
          <br />
          <br />
          <br />
          <br />
          {filteredVideos.length > 0 ? filteredVideosLayout : allVideosLayout}
        </div>
      </div>
    );
  }
}

export default ITube;
