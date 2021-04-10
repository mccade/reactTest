import React from 'react';
import './App.css';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
      albumsList: [],
      photosList: [],
      UserID: null,
      AlbumID: null,
      PhotoID: null,
      backButton: false,
      pageHeader: "Users"
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then((data) => {
        this.setState({
          usersList: data
        });
      })

    fetch('https://jsonplaceholder.typicode.com/albums')
      .then(response => response.json())
      .then((data) => {
        this.setState({
          albumsList: data
        });
      })

    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(response => response.json())
      .then((data) => {
        this.setState({
          photosList: data
        });
      })
  }

  handleClickUser(uID) {
    this.setState({
      UserID: uID,
      AlbumID: null,
      PhotoID: null,
      backButton: true,
      pageHeader: "Albums"
    });
  }

  handleClickAlbum(aID) {
    this.setState({
      AlbumID: aID,
      PhotoID: null,
      pageHeader: "Thumbnails"
    });
  }

  handleClickPhoto(pID) {
    this.setState({
      PhotoID: pID,
      pageHeader: "Photo"
    });
  }

  backButton() {
    if (this.state.PhotoID != null) {
      this.setState({
        PhotoID: null,
        pageHeader: "Thumbnails"
      });
      return;
    }
    if (this.state.AlbumID != null) {
      this.setState({
        AlbumID: null,
        pageHeader: "Albums"
      });
      return;
    }
    if (this.state.UserID != null) {
      this.setState({
        UserID: null,
        backButton: false,
        pageHeader: "Users"
      });
      return;
    }
  }

  render() {
    var header = this.state.pageHeader;
    var button;
    if(this.state.backButton){
      button = <button onClick={() => this.backButton()}>Back</button>;
    }
    else{
      button = null;
    }
    return [
      <div className="header">{header}</div>,
      <div className="users">
        {
          this.state.usersList.map((user) => {
            if (this.state.UserID === null) {
              return <button onClick={() => this.handleClickUser(user.id)}>{user.name}</button>
            }
          })
        }
        {
          this.state.albumsList.map((album) => {
            if (album.userId === this.state.UserID && this.state.AlbumID === null) {
              return <button onClick={() => this.handleClickAlbum(album.id)}>{album.title}</button>
            }
          })
        }
        {
          this.state.photosList.map((photo) => {
            if (photo.albumId === this.state.AlbumID && this.state.PhotoID === null) {
              return <img src={photo.thumbnailUrl} onClick={() => this.handleClickPhoto(photo.id)}></img>
            }
          })
        }
        {
          this.state.photosList.map((photo) => {
            if (photo.id === this.state.PhotoID) {
              return <img className="bigPic" src={photo.url} onClick={() => this.handleClickPhoto(photo.id)}></img>
            }
          })
        }
      </div>,
      <div className="back">
        {button}
      </div>

    ]
  }
}

export default class App extends React.Component {
  render() {
    return (
      <Users></Users>
    );
  }
}