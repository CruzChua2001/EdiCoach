import React from "react";
import { Container } from 'react-bootstrap'

import HomeTopPage from "./HomeTopPage";

const Home = () => {
    return (
        <>
            <div className="home-home">
                <div className="home-background-overlay"></div>
            </div>

            <HomeTopPage />
            

            <div className="home-details">
                <div className="home-about-us">
                    <h2>Who we are</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                </div>
            </div>

            <div className="home-offer">
                <h2>Who we are</h2>
                <p>Lorem Ipsum</p>
                <div className="row">
                    <div className="col-12 col-md-6 col-lg-4">
                        <div class="offer-img">
                            <img src="" alt="image1" width="300" height="350" className="rounded" />
                        </div>
                        <p className="mb-2">
                            Lorem Ipsum
                        </p>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div class="offer-img">
                            <img src="" alt="image2" width="300" height="350" className="rounded" />
                        </div>
                        <p className="mb-2">
                            Lorem Ipsum
                        </p>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div class="offer-img">
                            <img src="" alt="image3" width="300" height="350" className="rounded" />
                        </div>
                        <p className="mb-2">
                            Lorem Ipsum
                        </p>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div class="offer-img">
                            <img src="" alt="image4" width="300" height="350" className="rounded" />
                        </div>
                        <p className="mb-2">
                            Lorem Ipsum
                        </p>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div class="offer-img">
                            <img src="" alt="image5" width="300" height="350" className="rounded"  />
                        </div>
                        <p className="mb-2">
                            Lorem Ipsum
                        </p>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div class="offer-img">
                            <img src="" alt="image6" width="300" height="350" className="rounded" />
                        </div>
                        <p className="mb-2">
                            Lorem Ipsum
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home