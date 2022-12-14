import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { songDelete } from "../../actions/songAction";
import MainScreen from "../../components/MainScreen/MainScreen";
import { getGenres, getSongById, saveSong } from "../../services/songService";

const SongCreateEdit = () => {
  const [song, setSong] = useState({
    name: "",
    artist: { name: "", link: "" },
    genre: { name: "" },
    link: "",
    image: "",
  });
  const [validated, setValidated] = useState(false);

  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [genres, setGenres] = useState();

  useEffect(() => {
    const initFetch = async () => {
      const genres = await getGenres();
      const genreNames = genres.map((g) => g.name);
      setGenres(genreNames);
      if (id) {
        const song = await getSongById(id);
        setSong(song);
      }
    };
    initFetch();
  }, [id]);

  const onChangeHandlerSong = (ev) => {
    setSong((song) => ({ ...song, [ev.target.name]: ev.target.value }));
  };

  const onChangeHandlerArtist = (ev) => {
    const artist = { ...song.artist, [ev.target.name]: ev.target.value };
    setSong((song) => ({ ...song, artist }));
  };

  const onChangeHandlerGenre = (ev) => {
    const genre = { ...song.genre, [ev.target.name]: ev.target.value };
    setSong((song) => ({ ...song, genre }));
  };

  const goBackHandler = () => {
    navigate("/songs");
  };

  const deleteHandler = () => {
    dispatch(songDelete(song._id));
    navigate("/songs");
  };
  return (
    song && (
      <MainScreen title="Song">
        <Form
          noValidate
          validated={validated}
          onSubmit={(ev) => {
            const form = ev.currentTarget;
            ev.preventDefault();
            if (form.checkValidity() === true) {
              setValidated(false);
              let songToSend;
              ev.preventDefault();
              if (!song?.genre?.name)
                songToSend = { ...song, genre: { name: "Pop" } };
              else songToSend = { ...song };
              saveSong(id, songToSend).then(() => {
                navigate("/songs");
              });
            } else {
              setValidated(true);
            }
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name </Form.Label>
            <Form.Control
              required
              placeholder="Enter name"
              name="name"
              value={song.name}
              onChange={onChangeHandlerSong}
            />
          </Form.Group>
          <Form.Control.Feedback type="invalid">
            Please provide song name.
          </Form.Control.Feedback>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Link</Form.Label>
            <Form.Control
              name="link"
              value={song.link}
              onChange={onChangeHandlerSong}
              placeholder="Link"
            />
            <Form.Text className="text-muted">Song External Link</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Image</Form.Label>
            <Form.Control
              placeholder="Image"
              name="image"
              value={song.image}
              onChange={onChangeHandlerSong}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Genre</Form.Label>
            <Form.Select
              value={song.genre.name}
              name="name"
              aria-label="Genre"
              onChange={onChangeHandlerGenre}
            >
              {song.genre.name && (
                <option key={song.genre.name} value={song.genre.name}>
                  {song.genre.name}
                </option>
              )}
              {genres &&
                genres
                  .filter((g) => g !== song.genre.name)
                  .map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Artist name</Form.Label>
            <Form.Control
              required
              placeholder="Artist name"
              name="name"
              value={song.artist.name}
              onChange={onChangeHandlerArtist}
            />
            <Form.Control.Feedback type="invalid">
              Please provide artist name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Artist Link</Form.Label>
            <Form.Control
              placeholder="Artist Link"
              name="link"
              value={song.artist.link}
              onChange={onChangeHandlerArtist}
            />
          </Form.Group>
          <div style={{ display: "flex" }}>
            <span style={{ alignSelf: "center", flex: "1" }}>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </span>
            <Button
              className="mx-2"
              variant="light"
              size="md"
              onClick={goBackHandler}
            >
              Back
            </Button>
            <Button
              className="mx-2"
              variant="light"
              size="md"
              onClick={deleteHandler}
            >
              Delete
            </Button>
          </div>
        </Form>
      </MainScreen>
    )
  );
};

export default SongCreateEdit;
