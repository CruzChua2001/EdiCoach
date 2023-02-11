import React from "react";
import { BoxArrowUpRight } from "react-bootstrap-icons";

const ProfileCaseNote = () => {
    return (
        <>

            CASE NOTE----------------------
            <br />
            <div className="mt-2">
                <div className="border rounded shadow mt-2 ps-4 p-3">
                    3 Dec session

                    <BoxArrowUpRight className="float-end mt-1" />
                </div>

                <div className="border rounded shadow mt-2 ps-4 p-3">
                    1 Dec session

                    <BoxArrowUpRight className="float-end mt-1" />
                </div>

                <div className="border rounded shadow mt-2 ps-4 p-3">
                    29 Nov session

                    <BoxArrowUpRight className="float-end mt-1" />
                </div>

                <div className="border rounded shadow mt-2 ps-4 p-3">
                    20 Nov session

                    <BoxArrowUpRight className="float-end mt-1" />
                </div>
            </div>
        </>
    )
}

export default ProfileCaseNote