import React from "react";
import { Button } from 'react-bootstrap'
import { BookmarkFill } from 'react-bootstrap-icons'
import styled from "styled-components";

const YellowBorder = styled.hr`
    border: 10px solid orange;
    margin-block: 5%;
`

const OneonOnecoaching = () => {
    return (
        <> 
            <div className="coaching-home">
                <div className="coaching-overlay"></div>
            </div>

            <div className="coaching-top">
                <div className="row container">
                    <div className="col-sm-12 col-md-4">
                        <h1>
                            Take control
                            <br />
                            of your life
                        </h1>

                        <p>We'll coach you through it</p>

                        <Button size={"lg"} onClick={() => window.location.href = "/guest/login"}>
                            Book Your Coach
                            <BookmarkFill className="ms-2 mb-1" />
                        </Button>
                    </div>
                    <div className="mb-3 col-sm-12 col-md-8">
                        <img src="https://edicoach-image-bucket.s3.ap-southeast-1.amazonaws.com/Coaching-de-equipos.png" width="400" className="float-end me-5" />
                    </div>
                </div>
                
            </div>

            <div className="coach-journey">
                <h5>WE'LL SUPPORT YOUR JOURNEY AS YOU:</h5>
                <div className="row mt-3 mx-5">
                    <div class="border rounded col-md-6 col-lg-3 mx-0 px-0">
                        <div style={{backgroundColor: "#3D83C3"}} className="rounded-top py-4">
                            <img src="https://edicoach-image-bucket.s3.ap-southeast-1.amazonaws.com/Pushing-boundaries.png" width="150px" height="150" />
                        </div>
                        <br/>
                        <b>Master</b>
                        <p>Overcome your unique challenges</p>
                    </div>
                    <div class="border rounded col-md-6 col-lg-3 mx-0 px-0">
                        <div style={{backgroundColor: "#319D83"}} className="rounded-top py-4">
                            <img src="https://edicoach-image-bucket.s3.ap-southeast-1.amazonaws.com/449-4492290_latest-news-understand-icon.png" width="150px" height="150" />
                        </div>
                        <br/>
                        <b>Understand</b>
                        <p>Dedicate time to understand your emotions</p>
                    </div>
                    <div class="border rounded col-md-6 col-lg-3 mx-0 px-0">
                        <div style={{backgroundColor: "#FE7283"}} className="rounded-top py-4">
                            <img src="https://edicoach-image-bucket.s3.ap-southeast-1.amazonaws.com/4149680.png" width="150px" height="150" />
                        </div>
                        <br/>
                        <b>Process</b>
                        <p>Follow our plan to improve quality of life</p>
                    </div>
                    <div class="border rounded col-md-6 col-lg-3 mx-0 px-0">
                        <div style={{backgroundColor: "#B8CC7E"}} className="rounded-top py-4">
                            <img src="https://edicoach-image-bucket.s3.ap-southeast-1.amazonaws.com/40420-5-grow-hd-image-free-png.png" width="150px" height="150" />
                        </div>
                        <br/>
                        <b>Grow</b>
                        <p>Build better habits and improve at your own pace</p>
                    </div>
                </div>
            </div>
            
            <YellowBorder />
        </>
    )
}

export default OneonOnecoaching