import React from "react";
import { BoxArrowUpRight } from "react-bootstrap-icons";

const ProfileReviewSession = () => {
    return (
        <div className="mt-5">
            REVIEW SESSION---------------
            <br />
            <div className="mt-2">
                <a href="/coach/reviewsession" className="text-decoration-none">
                    <div className="border rounded shadow mt-2 ps-4 p-3">
                        3 Dec session

                        <BoxArrowUpRight className="float-end mt-1" />
                    </div>
                </a>

                <div className="border rounded shadow mt-2 ps-4 p-3">
                    29 Nov session

                    <BoxArrowUpRight className="float-end mt-1" />
                </div>

                <div className="border rounded shadow mt-2 ps-4 p-3">
                    20 Nov session

                    <BoxArrowUpRight className="float-end mt-1" />
                </div>
            </div>
        </div>
    )
}

export default ProfileReviewSession