import React, { useEffect, useState } from 'react'
import Amplify from '@aws-amplify/core'
import * as gen from '../../graphql/generated'
import { useCookies } from 'react-cookie';

import { Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';


import config from '../../../config';

Amplify.configure(gen.config)

function Chat() {
    const fromChat = {
        marginBottom: "10px",
        float: "left"
    };

    const fromChatMsg = {
        backgroundolor: "blue",
        color: "white",
        minHeight: "30px",
        maxWidth: "100px",
        padding: "8px",
        borderRadius: "5px" 
    };

    const [send, setSend] = useState('')
    const [received, setReceived] = useState({})
    const [message, setMessage] = useState({})
    const [to, setTo] = useState({})
    const [from, setFrom] = useState({})

    const [cookies, setCookie] = useCookies();
    

    //Define the channel name here
    let channel = '5aa2dbd9-3155-4ad9-b3a9-a9d2077d11b8&d83e5bec-3412-45f3-b0c9-d4ecbdbf7922'

    //Publish data to subscribed clients
    async function handleSubmit(evt) {
        evt.preventDefault()
        evt.stopPropagation()
        let data = {
            Channel:channel, 
            CreatedAt: new Date(), 
            To: to.FirstName.S, 
            From: from.FirstName.S, 
            Message: send
        }
        await gen.publish(channel, JSON.stringify(data))
        gen.create(data)
        .then((res) => {
            setMessage(res.data.createCHATS)
            console.log(res);
        });
        console.log(send)
        document.getElementById("type").value = "";
        setSend("Type Here")
    }

    // useEffect(() => {
        
    //     if (cookies['sessionId'] != undefined) {
    //         let sessionId = cookies['sessionId'];
    //         fetch("https://1b46sbaptd.execute-api.us-east-1.amazonaws.com/dev/get/"+sessionId, {
    //             method: 'GET',
    //             headers: { 'Content-Type': 'application/json' }})
    //             .then((msg) => {
    //                 msg.json()
    //                 .then(data => {
    //                     console.log(data)
    //                     if (data.status != "success") {
    //                         window.location.href = "/admin/login";
    //                     }
    //                 })
    //             }).catch(err => console.log(err))
    //     } else {
    //         window.location.href = "/admin/login";
    //     }
    // }, [])

    useEffect(() => {
        //Subscribe via WebSockets
        const subscription = gen.subscribe(channel, ({ data }) => {
            setReceived(JSON.parse(data));
        })
        return () => subscription.unsubscribe()
    }, [])

    useEffect(() => {
        

        if (cookies['sessionId'] != undefined) {
            let sessionId = cookies['sessionId'];
            let toData;

            if (sessionId == "d83e5bec-3412-45f3-b0c9-d4ecbdbf7922") {
                toData = {
                    "UserId":{"S":"5aa2dbd9-3155-4ad9-b3a9-a9d2077d11b8"},
                    "FirstName":{"S":"Edison"}
                };
            } else {
                toData = {
                    "UserId":{"S":"d83e5bec-3412-45f3-b0c9-d4ecbdbf7922"},
                    "FirstName":{"S":"Cruz"}
                };
            }

            document.querySelector(".profileData div:nth-child(2)").innerHTML = toData.FirstName.S;

            setTo(toData);

            fetch(config.SESSION_API+"/get/"+sessionId, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }})
                .then((msg) => {
                    msg.json()
                    .then(data => {
                        console.log(data)


                        if (data.status != "success") {
                            console.log("error");
                        } else {
                            setFrom(data.message)
                        }
                    })
                }).catch(err => console.log(err))

                if (channel) {
                    gen.listall(channel)
                    .then((res) => {
                        let msg = res.data.listCHATS.items;
        
                        if (msg.length != 0) {
                            for (let index = 0; index < msg.length; index++) {
                                const element = msg[index];
                                if (element.From == toData.FirstName.S) {
                                    document.getElementById("Chats").innerHTML += `
                                        <div>
                                        <div className='fromChat' 
                                        style="margin-bottom: 10px; float: left;">
                                            <div className='chatName'
                                            style="font-size: 0.8em;">${element.From}</div>
                                            <div className='chatMsg' 
                                            style="background-color: #007FFF;color: white;min-height: 30px;max-width: 100px;padding: 8px;border-radius: 5px;">${element.Message}</div>
                                        </div>
                                        </div>
                                        `
                                } else {
                                    document.getElementById("Chats").innerHTML += `
                                        <div>
                                        <div className='toChat'
                                        style="margin-bottom: 10px; float: right;">
                                            <div className='chatName'
                                            style="font-size: 0.8em;">${element.From}</div>
                                            <div className='chatMsg'
                                            style="background-color: #32cd32;color: white;min-height: 30px;max-width: 100px;padding: 8px;border-radius: 5px;">${element.Message}</div>
                                        </div>
                                        </div>
                                        `
                                }
                                
                            }
                        }    
                    }); 
        
                }
        } 

        

            // fetch(config.USER_API+"/get/"+userid, {
    //     method: 'GET',
    //     headers: { 'Content-Type': 'application/json' }})
    //     .then((msg) => {
    //         msg.json()
    //         .then(data => {
    //             console.log(data)


    //             if (data.status != "success") {
    //                 console.log("error");
    //             } else {
    //                 setFrom(data.message)
    //             }
    //         })
    //     }).catch(err => console.log(err))
        
    }, [channel])

    useEffect(() => {
        if (Object.keys(received).length != 0) {
            if (received.From == to.FirstName.S) {
                document.getElementById("Chats").innerHTML += `
                            <div>
                            <div className='fromChat'
                            style="margin-bottom: 10px; float: left;">
                                <div className='chatName'
                                style="font-size: 0.8em;">${received.From}</div>
                                <div className='chatMsg'
                                style="background-color: #007FFF;color: white;min-height: 30px;max-width: 100px;padding: 8px;border-radius: 5px;">${received.Message}</div>
                            </div>
                            </div>
                            `
            } else {
                document.getElementById("Chats").innerHTML += `
                            <div>
                            <div className='fromChat'
                            style="margin-bottom: 10px; float: right;">
                                <div className='chatName'
                                style="font-size: 0.8em;">${received.From}</div>
                                <div className='chatMsg'
                                style="background-color: #32cd32;color: white;min-height: 30px;max-width: 100px;padding: 8px;border-radius: 5px;">${received.Message}</div>
                            </div>
                            </div>
                            `
            }
        }
    }, [received])

    //Display pushed data on browser
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <div className='chatProfile'>
                            <div className='profileTitle'>
                                CHAT INFORMATION
                            </div>
                            <div className='profilePic'>
                                <div></div>
                            </div>
                            <div className='profileData'>
                                <div>Name:</div>
                                    <div>-</div>
                            </div>
                            <div className='profileData'>
                                <div>Phone:</div>
                                <div>-</div>
                            </div>
                        </div>
                    </Col>
                    <Col xs='8'>
                        <div className='chatContainer'>
                            <div className='chatHeader'>

                            </div>
                            <div className='chatContent' id="Chats">
                                {/* <div>
                                <div className='fromChat'>
                                    <div className='chatName'>Name 1</div>
                                    <div className='chatMsg'>Hi</div>
                                </div>
                                </div>
                                <div>
                                <div className='toChat'>
                                    <div className='chatName'>Name 2</div>
                                    <div className='chatMsg'>Hi</div>
                                </div>
                                </div> */}
                                
                            </div>
                            <div className='chatForm'>
                                <div>
                                    <Form.Control id='type' type="text" onChange={(e) => setSend(e.target.value)} placeholder="Type Here" />
                                    <Button variant="primary" onClick={handleSubmit} >
                                        Send
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            {/* <header className="App-header">
                <p>Send/Push JSON to channel "{channel}"...</p>
                <form onSubmit={handleSubmit}>
                    <textarea rows="5" cols="60" name="description" onChange={(e) => setSend(e.target.value)}>
                        Enter valid JSON here... (use quotes for keys and values)
                    </textarea>
                    <br />
                    <input type="submit" value="Submit" />
                </form>
                <p>Subscribed/Listening to channel "{channel}"...</p>
                <pre>{JSON.stringify(JSON.parse(received), null, 2)}</pre>
            </header> */}
        </div>
    )
}

export default Chat