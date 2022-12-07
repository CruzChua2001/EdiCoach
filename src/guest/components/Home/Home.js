import React from "react";
import { Container } from 'react-bootstrap'
import backgroundImage from '../../../assets/13104.jpg'

import HomeTopPage from "./HomeTopPage";

const Home = () => {
    return (
        <>
            <div className="home-background" style={{ backgroundImage: `url("https://img.freepik.com/free-vector/soft-yellow-watercolor-texture-background_1055-10236.jpg?w=2000")` }}>
                <div className="home-background-overlay">
                </div>
            </div>

            <Container>
                <HomeTopPage />
            </Container>
        </>
    )
}

export default Home