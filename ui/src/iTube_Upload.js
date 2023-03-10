import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Button, Modal, Nav } from "react-bootstrap";
// import Modal from '@material-ui/core/Modal'
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import { LinkContainer } from "react-router-bootstrap";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      tags: "",
      video: null,
      isOpen:false
    };

    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleVid = this.handleVid.bind(this);
    // this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleFileChange = this.handleFileChange.bind(this);
    this.fileInput = React.createRef();
  }

   handleSubmit=async(e)=> {
    e.preventDefault();
    const newPost = {
      title: this.state.title,
      description: this.state.description,
      tags: this.state.tags,
    };
    if (this.state.video) {
      const data = new FormData();

      const filename = Date.now() + this.state.video.name;

      data.append("name", filename);
      data.append("file", this.state.video);

      newPost.video = filename;
      try {
        await axios.post("http://localhost:4000/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("http://localhost:4000/api/videos", newPost);
      this.setState({
        title: "",
        description: "",
        tags: "",
        video: null,
      });
      this.fileInput.current.value = null;
    } catch (err) {}
    this.setState({isOpen:true})
  }
  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });

  handleVid=(event)=>{
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", this.state.title);
    formData.append("description", this.state.description);
    formData.append("tags", this.state.tags);
    formData.append("video", this.state.video);
    console.log(this.state);
    axios.post("http://localhost:4000/api/videos", formData)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  }

  handleInputChange=(event)=> {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  }
  
  handleFileChange=(event)=>{
    const target = event.target;
    //const name = target.name;
    const file = target.files[0];
    console.log("uploaded file is",file)
    this.setState({
      video: file,
    });
  }

  render() {
    return (
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
            <div
              class="offcanvas offcanvas-start text-bg-dark"
              tabindex="-1"
              id="offcanvasDarkNavbar"
              aria-labelledby="offcanvasDarkNavbarLabel"
              style={{"width":"20%"}}>
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
                  <span style={{ "font-size": "25px", "font-weight": "bold" }}>
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
              <div class="offcanvas-body" style={{"padding-left":"50px","padding-right":"50px"}}>
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
        <div class="container">
          <form class="row gy-2 gx-3 align-items-center">
            <div class="col-auto">
              <label>Title</label>
              <input
                class="form-control"
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleInputChange}
              />
            </div>
            <div class="col-auto">
              <label>Description</label>
              <input
                class="form-control"
                type="text"
                name="description"
                value={this.state.description}
                onChange={this.handleInputChange}
              />
            </div>
            <div class="col-auto">
              <label>Tags</label>
              <input
                class="form-control"
                type="text"
                name="tags"
                value={this.state.tags}
                onChange={this.handleInputChange}
              />
            </div>
            <div class="">
              <label>Video</label>
              <input
                class="form-control"
                type="file"
                name="video"
                ref={this.fileInput}
                onChange={this.handleFileChange}
              />
            </div>
            <div class="col-auto">
              <button
                type="button"
                class="btn btn-primary"
              
                onClick={this.handleSubmit}   
              >
                Submit
              </button>
              <Modal show={this.state.isOpen && this.state.video} onHide={this.closeModal}>
  <Modal.Header closeButton>
  </Modal.Header>
  <Modal.Body>Video Submitted Successfully</Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={this.closeModal} style={{backgroundColor:"blue"}}>
      Close
    </Button>
  </Modal.Footer>
</Modal>
              
            </div>
          </form>
        </div>
        <br />
      </div>
    );
  }
}

export default Upload;
