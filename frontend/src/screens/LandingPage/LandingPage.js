import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./LandingPage.css";
const LandingPage = () => {
  const userGetter = useSelector((state) => state.getUser);
  const { userInfo } = userGetter;

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              {!userInfo && <h1 className="title">Welcome to Musica-App</h1>}
              {userInfo && <h1 className="title">Welcome back {userInfo.username} to Musica-App</h1>}
              {!userInfo && <h3>Please log in to view all the songs :)</h3>}
              <div className="buttonContainer">
                {userInfo && (
                  <Link to="/songs">
                    <Button size="lg" className="landingButton">
                      Songs
                    </Button>
                  </Link>
                )}
                {!userInfo && (
                  <Link to="/login">
                    <Button size="lg" className="landingButton">
                      Login
                    </Button>
                  </Link>
                )}
                <Link to="/chat">
                  <Button size="lg" className="landingButton">
                    Chat
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
