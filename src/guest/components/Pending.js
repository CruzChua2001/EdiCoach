import React from "react";

const Pending = () => {
    const FormStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
      };

    return (<>
    <div style={FormStyle} >
            <div class="shadow p-5 mb-5 bg-white rounded">
                    <h1>Account Pending...</h1>
                    <p>The Admin Team will be reviewing your account before activating it!</p>
            </div>
        </div>
    </>)
}

export default Pending