import React, { useEffect, useState, useContext } from 'react'
import Amplify from '@aws-amplify/core'
import * as gen from '../../graphql/generated'
import { useCookies } from 'react-cookie';

import { Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { AccountContext } from "../../Account";


import config from '../../../config';

Amplify.configure(gen.config)

function Chat() {
    const [status, setStatus] = useState(false);
    const { getSession, getData } = useContext(AccountContext);

    
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

    const [channel, setChannel] = useState("");
    

    //Define the channel name here
    // let channel = '5aa2dbd9-3155-4ad9-b3a9-a9d2077d11b8&d83e5bec-3412-45f3-b0c9-d4ecbdbf7922'

    useEffect(() => {
        getData()
        .then((session) => {
            console.log(session);
            // setStatus(true);
            let fromChat = {
                "userid": {"S":session.filter((item) => item.Name == "sub")[0].Value},
                "firstname": {"S":session.filter((item) => item.Name == "custom:firstname")[0].Value + " " + session.filter((item) => item.Name == "custom:lastname")[0].Value}
            };
            setFrom(fromChat)
            console.log(fromChat)
        })
        .catch((err) => console.log(err))
    }, [])


    //Publish data to subscribed clients
    async function handleSubmit(evt) {
        evt.preventDefault()
        evt.stopPropagation()
        let data = {
            Channel:channel, 
            CreatedAt: new Date(), 
            To: to.firstname.S, 
            From: from.firstname.S, 
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
        let type = window.localStorage.getItem("chattype");
        let channelid;
        if (Object.keys(from) != 0) {
            if (type == "Coach") {
                channelid = from.userid.S + "&" + window.localStorage.getItem("chatuserid");
            } else {
                channelid = window.localStorage.getItem("chatuserid") + "&" + from.userid.S;
            }
            setChannel(channelid);
            console.log(channelid);
            //Subscribe via WebSockets
            const subscription = gen.subscribe(channelid, ({ data }) => {
                setReceived(JSON.parse(data));
            })
            return () => subscription.unsubscribe()
        }
        
    }, [from])

    useEffect(() => {
        

        if (window.localStorage.getItem("chatuserid")) {
            // let sessionId = cookies['sessionId'];
            let toData;

            // if (sessionId == "d83e5bec-3412-45f3-b0c9-d4ecbdbf7922") {
            //     toData = {
            //         "UserId":{"S":"5aa2dbd9-3155-4ad9-b3a9-a9d2077d11b8"},
            //         "FirstName":{"S":"Edison"}
            //     };
            // } else {
            //     toData = {
            //         "UserId":{"S":"d83e5bec-3412-45f3-b0c9-d4ecbdbf7922"},
            //         "FirstName":{"S":"Cruz"}
            //     };
            // }

            toData = {
                "userid":{"S":window.localStorage.getItem("chatuserid")},
                "firstname":{"S":window.localStorage.getItem("chatname")}
            };

            document.querySelector(".profileData div:nth-child(2)").innerHTML = toData.firstname.S;

            setTo(toData);

            // fetch(config.SESSION_API+"/get/"+sessionId, {
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

                if (channel) {
                    console.log(channel)
                    gen.listall(channel)
                    .then((res) => {
                        console.log(res)
                        let msg = res.data.listChats.items;
        
                        if (msg.length != 0) {
                            for (let index = 0; index < msg.length; index++) {
                                const element = msg[index];
                                if (element.From == toData.firstname.S) {
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
            if (received.From == to.firstname.S) {
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

    const translate = () => {
        document.getElementById("Chats").innerHTML = "";
        gen.listall(channel)
        .then((res) => {
            
            let msg = res.data.listChats.items.sort((a,b)=>a.CreatedAt-b.CreatedAt);;

            translateAPI(msg);
        });


    }

    const translateAPI = async (msg) => {
        if (msg.length != 0) {
            for (let index = 0; index < msg.length; index++) {
                const element = msg[index];

                let text = element.Message;
                let target = document.getElementById("lang").value;
                let response = await fetch(config.TRANSLATE_API+"/translate", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({text, target})});
                // .then((msg) => {
                //     msg.json()
                //     .then(data => {
                        
                //     })
                // }).catch(err => console.log(err))

                if (response) {
                    let data = await response.json();
                    if (element.From == to.firstname.S) {
                        document.getElementById("Chats").innerHTML += `
                            <div>
                            <div className='fromChat' 
                            style="margin-bottom: 10px; float: left;">
                                <div className='chatName'
                                style="font-size: 0.8em;">${element.From}</div>
                                <div className='chatMsg' 
                                style="background-color: #007FFF;color: white;min-height: 30px;max-width: 100px;padding: 8px;border-radius: 5px;">${data.TranslatedText}</div>
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
                                style="background-color: #32cd32;color: white;min-height: 30px;max-width: 100px;padding: 8px;border-radius: 5px;">${data.TranslatedText}</div>
                            </div>
                            </div>
                            `
                    }
                }
            }
        }  
        
    }

    //Display pushed data on browser
    return (
        <>
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
                            <div className='profileData' >
                                <div>Chat Language:</div>
                                <div>
                                    <select name="lang" id="lang" onChange={translate}>
                                    <option value="en">English</option>
                                    <option value="zh">Chinese</option>
                                    <option value="ms">Malay</option>
                                    <option value="ta">Tamil</option>
                                    </select>
                                </div>
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
        </>
    )
}

export default Chat