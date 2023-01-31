import React from "react";
import { Container } from 'react-bootstrap'

import HomeTopPage from "./HomeTopPage";

const Home = () => {
    return (
        <>
            <div class="home-top">
                <div className="home-background">
                    <div className="home-background-overlay">
                    </div>
                    
                </div>
                <HomeTopPage />
            </div>
            

            <div className="home-details">
                <div className="home-about-us">
                    <h2>Who we are</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                </div>
            </div>
        </>
    )
}

export default Home