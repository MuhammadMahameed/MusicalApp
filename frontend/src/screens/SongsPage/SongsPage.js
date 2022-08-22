import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/Handlers/ErrorMessage";
import Loading from "../../components/Handlers/Loading";
import MainScreen from "../../components/MainScreen/MainScreen";
import { getAllSong } from "../../actions/songAction";
import { useNavigate } from "react-router-dom";
import { isHeAdmin } from "../../services/userService";
import './SongsPage.css';
const SongsPage = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const allSongs = useSelector((state) => state.getAllSongs);
  const [isAdmin, setIsAdmin] = useState(false);
  const { loading, error, songsInfo } = allSongs;
  const navigate = useNavigate();
  useEffect(() => {
    isHeAdmin().then((isAdmin) => {
      setIsAdmin(isAdmin);
    });
    if (!songsInfo) {
      dispatch(getAllSong());
    }
  }, [dispatch, songsInfo, isAdmin]);

  return (
    <MainScreen title="Songs">
      {error && navigate('/login')}
      {loading && <Loading />}
      <Container>
        {isAdmin && (
          <Row className="mb-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate(`/song/edit`)}
            >
              Add New Song
            </Button>
          </Row>
        )}
      <Form.Control
        className="searchBox"
        type="text"
        id="searchId"
        placeholder="Search For Song"
        onChange={(event) => setSearchText(event.target.value.toLowerCase())}
      />
      <Row>
        {
        songsInfo?.filter(songInfo => songInfo.name.toLowerCase().includes(searchText)).
        map((song, idx) => {
          return (
            <Col xs="3" key={idx}>
              <Card
                className="mb-3"
                style={{ cursor: isAdmin && "pointer" }}
                key={song._id}
                onClick={() => isAdmin && navigate(`/song/edit/${song._id}`)}
              >
                <Card.Img
                  variant="top"
                  src={
                    song.image ||
                    "https://i2.wp.com/www.wmhbradio.org/wp-content/uploads/2016/07/music-placeholder.png?resize=300%2C300&ssl=1"
                  }
                />
                <Card.Body>
                  <Card.Title>{song.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {song.artist.name}
                  </Card.Subtitle>
                  <Card.Text>Genre: {song.genre.name}</Card.Text>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => window.open(song.link)}
                  >
                    Song Link
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => window.open(song.artist.link)}
                  >
                    Artist Link
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      </Container>
    </MainScreen>
  );
};

export default SongsPage;
