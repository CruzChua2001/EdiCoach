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

import $ from 'jquery';
import axios from "axios";

import config from '../../../config';

Amplify.configure(gen.config)

function Chat() {
    const [status, setStatus] = useState(false);
    const { getSession, getData } = useContext(AccountContext);
    const [subscribed, setSubscribed] = useState(false)
    const [sessionData, setSessionData] = useState({})
    
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
    const [allchats, setAllChats] = useState([])
    const [selectedChat, setSelectedChat] = useState("")

    const [cookies, setCookie] = useCookies();

    const [channel, setChannel] = useState("");
    

    //Define the channel name here
    // let channel = '5aa2dbd9-3155-4ad9-b3a9-a9d2077d11b8&d83e5bec-3412-45f3-b0c9-d4ecbdbf7922'

    useEffect(() => {
        getData()
        .then((session) => {
            console.log(session);
            // setStatus(true);
            let sessionUserid = session.filter((item) => item.Name == "sub")[0].Value;
            let sessionName = session.filter((item) => item.Name == "custom:firstname")[0].Value + " " + session.filter((item) => item.Name == "custom:lastname")[0].Value;
            let sessionEmail = session.filter((item) => item.Name == "email")[0].Value;
            let fromChat = {
                "userid": {"S":sessionUserid},
                "firstname": {"S":sessionName}
            };
            setFrom(fromChat)
            console.log(sessionEmail)

            const result = {
                "userid": sessionUserid,
                "Email": sessionEmail
            }
            setSessionData(result);
            checkSubscribed(result);
        })
        .catch((err) => console.log(err))
    }, [])

    const checkSubscribed = (sessionUser) => {
        checkNotification(sessionUser["Email"])
    }

    const notifyClient = () => {
        const action = subscribed;
        const url = "https://en3gq3zwt3.execute-api.ap-southeast-1.amazonaws.com/prod/notification"
        const data = {"Email": sessionData["Email"], "Unsubscribe": action }

        axios.post(url, JSON.stringify(data))
        .then(res => {
            console.log(res)
            if(!action) {
                alert("Please check email to confirm receiving updates")
            }
            
            if(action) {
                setSubscribed(false)
            }
        })
    }

    const checkNotification = (clientEmail) => {
        const url = "https://en3gq3zwt3.execute-api.ap-southeast-1.amazonaws.com/prod/notification"        
        axios.get(url+"?Email="+clientEmail)
        .then(res => {
            if(res.data["verified"] == true) {
                setSubscribed(true)
            }
        })
    }

    //Publish data to subscribed clients
    async function handleSubmit(evt) {
        evt.preventDefault()
        evt.stopPropagation()
        let data = {
            Channel:channel,
            CreatedAt: new Date(),
            To: to.firstname.S,
            From: from.firstname.S,
            Message: send,
            IsRead: "false",
            ToId: to.userid.S,
            FromId: from.userid.S
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
            let toData;

            toData = {
                "userid":{"S":window.localStorage.getItem("chatuserid")},
                "firstname":{"S":window.localStorage.getItem("chatname")}
            };

            document.querySelector(".profileData div:nth-child(2)").innerHTML = toData.firstname.S;

            $(".profilePic div").css("background-image",`url(https://edicoach-image-bucket.s3.ap-southeast-1.amazonaws.com/images/${toData.userid.S}.png)`)
            $(".profilePic div").css("background-size",`cover`)

            setTo(toData);

                if (channel) {
                    console.log(channel)
                    gen.listall(channel)
                    .then(async (res) => {
                        console.log(res)
                        let msg = res.data.listChats.items;
                        setAllChats(msg)
        
                        if (msg.length != 0) {
                            for (let index = 0; index < msg.length; index++) {
                                const element = msg[index];
                                let time = new Date(element.CreatedAt);
                                let chatid = time.getFullYear().toString() + time.getDate().toString() + time.getHours().toString() + time.getMinutes().toString() + time.getSeconds().toString();
                                let displayTime = (time.getHours()%12) + ":" + time.getMinutes() + " " + (time.getHours() > 11 ? "PM" : "AM")
                                
                                if (element.FromId == toData.userid.S) {
                                    document.getElementById("Chats").innerHTML += `
                                        <div>
                                        <div class='fromChat' id="${chatid}">
                                            <div class='chatName'>${to.firstname.S}</div>
                                            <div class='chatMsg'>${element.Message}</div>
                                            <div class='chatInfo'>
                                                <div></div>
                                                <div>${displayTime}</div>
                                            </div>
                                        </div>
                                        </div>
                                        `
                                        if (element.IsRead == "false") {
                                            let data = {
                                                Channel:channel,
                                                CreatedAt: element.CreatedAt,
                                                To: element.To,
                                                From: element.From,
                                                Message: element.Message,
                                                IsRead: "true",
                                                ToId: element.ToId,
                                                FromId: element.FromId
                                            }
                                            await gen.publish(channel, JSON.stringify(data))
                                            gen.update(data)
                                            .then((res) => {
                                                console.log(res);
                                            });
                                        }
                                } else {
                                    document.getElementById("Chats").innerHTML += `
                                        <div>
                                        <div class='toChat' id="${chatid}">
                                            <div class='chatName'>${from.firstname.S}</div>
                                            <div class='chatMsg'>${element.Message}</div>
                                            <div class='chatInfo'>
                                                ${element.IsRead == "false" 
                                                ? `<img class='readImg IsNotRead' src="https://edicoach-image-bucket.s3.ap-southeast-1.amazonaws.com/read.png" width="16" height="16" />`
                                                : `<img class='readImg IsRead' src="https://edicoach-image-bucket.s3.ap-southeast-1.amazonaws.com/read.png" width="16" height="16" />` 
                                                }
                                                <div>${displayTime}</div>
                                            </div>
                                        </div>
                                        </div>
                                        `
                                }
                                
                            }
                            updateScroll(); 
                        }    
                    }); 
        
                }
        } 
        
    }, [channel])

    useEffect(() => {
        if (Object.keys(received).length != 0) {
            let time = new Date(received.CreatedAt);
            let chatid = time.getFullYear().toString() + time.getDate().toString() + time.getHours().toString() + time.getMinutes().toString() + time.getSeconds().toString();
            let displayTime = (time.getHours()%12) + ":" + time.getMinutes() + " " + (time.getHours() > 11 ? "PM" : "AM")
            if (received.IsRead == "true") {
                if (received.FromId != to.userid.S) {
                    console.log(`#${chatid} .readImg`)
                    $(`#${chatid} .readImg`).removeClass("IsNotRead");
                    $(`#${chatid} .readImg`).addClass("IsRead");
                    console.log($(`#${chatid} img`));
                }
                
            } else {
                if (received.FromId == to.userid.S) {
                    document.getElementById("Chats").innerHTML += `
                                <div>
                                <div class='fromChat' id="${chatid}">
                                    <div class='chatName'>${to.firstname.S}</div>
                                    <div class='chatMsg'>${received.Message}</div>
                                    <div class='chatInfo'>
                                        <div></div>
                                        <div>${displayTime}</div>
                                    </div>
                                </div>
                                </div>
                                `
                        let data = {
                            Channel:channel,
                            CreatedAt: received.CreatedAt,
                            To: received.To,
                            From: received.From,
                            Message: received.Message,
                            IsRead: "true",
                            ToId: received.ToId,
                            FromId: received.FromId
                        }
                        const updateRead = async () => {
                            await gen.publish(channel, JSON.stringify(data))
                            gen.update(data)
                            .then((res) => {
                                console.log(res);
                            });
                        }

                        updateRead();
                        
                } else {
                    document.getElementById("Chats").innerHTML += `
                                <div>
                                <div class='toChat' id="${chatid}">
                                    <div class='chatName'>${from.firstname.S}</div>
                                    <div class='chatMsg'>${received.Message}</div>
                                    <div class='chatInfo'>
                                        <img class='readImg IsNotRead' src="https://edicoach-image-bucket.s3.ap-southeast-1.amazonaws.com/read.png" width="16" height="16" />
                                        <div>${displayTime}</div>
                                    </div>
                                </div>
                                </div>
                                `
                }
                updateScroll();
                setAllChats(allchats.concat([received]))
            }
        }
    }, [received])

    const translate = () => {
        // document.getElementById("Chats").innerHTML = "";
        gen.listall(channel)
        .then((res) => {
            
            let msg = res.data.listChats.items.sort((a,b)=>a.CreatedAt-b.CreatedAt);;
            let target = document.getElementById("lang").value;
            translateAPI(msg, target);
        });


    }

    const translateMsg = (evt) => {
        console.log("translate"+selectedChat)
        let filterChat = allchats.filter(chat => ((new Date(chat.CreatedAt)).getFullYear().toString() + (new Date(chat.CreatedAt)).getDate().toString() + (new Date(chat.CreatedAt)).getHours().toString() + (new Date(chat.CreatedAt)).getMinutes().toString() + (new Date(chat.CreatedAt)).getSeconds().toString()) == selectedChat);
        translateAPI(filterChat, evt.currentTarget.id)
    }

    const translateAPI = async (msg, target) => {
        if (msg.length != 0) {
            console.log(msg)
            for (let index = 0; index < msg.length; index++) {
                const element = msg[index];

                let text = element.Message;
                // let target = document.getElementById("lang").value;
                let response = await fetch(config.TRANSLATE_API+"/translate", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({text, target})});

                if (response) {
                    let data = await response.json();
                    let time = new Date(element.CreatedAt);
                    let chatid = time.getFullYear().toString() + time.getDate().toString() + time.getHours().toString() + time.getMinutes().toString() + time.getSeconds().toString();
                    let displayTime = (time.getHours()%12) + ":" + time.getMinutes() + " " + (time.getHours() > 11 ? "PM" : "AM")
                    if (element.FromId == to.userid.S) {
                        $(`#${chatid} .chatMsg`).html(data.TranslatedText);
                        // document.getElementById("Chats").innerHTML += `
                        //     <div>
                        //     <div class='fromChat' id="${chatid}">
                        //         <div class='chatName'>${to.firstname.S}</div>
                        //         <div class='chatMsg'>${data.TranslatedText}</div>
                        //         <div class='chatInfo'>
                        //             <div></div>
                        //             <div>${displayTime}</div>
                        //         </div>
                        //     </div>
                        //     </div>
                        //     `
                    } else {
                        $(`#${chatid} .chatMsg`).html(data.TranslatedText);
                        // document.getElementById("Chats").innerHTML += `
                        //     <div>
                        //     <div class='toChat' id="${chatid}">
                        //         <div class='chatName'>${from.firstname.S}</div>
                        //         <div class='chatMsg'>${data.TranslatedText}</div>
                        //         <div class='chatInfo'>
                        //             ${element.IsRead == "false" 
                        //             ? `<img class='readImg IsNotRead' src="https://edicoach-image-bucket.s3.ap-southeast-1.amazonaws.com/read.png" width="16" height="16" />`
                        //             : `<img class='readImg IsRead' src="https://edicoach-image-bucket.s3.ap-southeast-1.amazonaws.com/read.png" width="16" height="16" />` 
                        //             }
                        //             <div>${displayTime}</div>
                        //         </div>
                                
                        //     </div>
                        //     </div>
                        //     `
                    }
                }
            }
        }  
        
    }

    function updateScroll(){
        var element = document.getElementById("Chats");
        element.scrollTop = element.scrollHeight;
    }

    useEffect(() => {
        document.onclick = hideMenu;
        // document.onscroll = hideMenu;
        $( document ).off('contextmenu', ".fromChat");
        $( document ).off('contextmenu', ".toChat");
        $( document ).on('contextmenu', '.fromChat', function(evt) {
            console.log(evt.currentTarget.id)
            setSelectedChat(evt.currentTarget.id)
            rightClick(evt);
          });
        $( document ).on('contextmenu', '.toChat', function(evt) {
            console.log(evt.currentTarget.id)
            setSelectedChat(evt.currentTarget.id)
            rightClick(evt);
          });
    }, [received])

    function hideMenu() { 
        document.getElementById("contextMenu").style.display = "none"
    } 

    function rightClick(e) { 
        e.preventDefault(); 

        if (document.getElementById("contextMenu").style.display == "block"){ 
            hideMenu(); 
        }else{ 
            var menu = document.getElementById("contextMenu")      
            menu.style.display = 'block'; 
            menu.style.left = e.pageX + "px"; 
            menu.style.top = e.pageY + "px"; 
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
                            <div className='profileData'>
                                <div>Enable Notifications:</div>
                                <div>
                                <label class="switch">
                                    { subscribed ? 
                                    <input type="checkbox" checked onChange={notifyClient} />
                                    :
                                    <input type="checkbox" onChange={notifyClient} />
                                    }
                                    <span class="slider round"></span>
                                </label>
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
                                    <div className='chatMsg'>Hi Test</div>
                                    <div className='chatInfo'>
                                        <div></div>
                                        <div>12:30pm</div>
                                    </div>
                                </div>
                                </div>
                                <div>
                                <div className='toChat'>
                                    <div className='chatName'>Name 2</div>
                                    <div className='chatMsg'>Hi</div>
                                    <div className='chatInfo'>
                                        <img className='readImg IsNotRead' src="https://edicoach-image-bucket.s3.ap-southeast-1.amazonaws.com/read.png" width="16" height="16" />
                                        <div>12:30pm</div>
                                    </div>
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
                <div id="contextMenu" className="context-menu" style={{"display": "none"}}> 
                    <ul className="menu"> 
                        <li id='en' className="translate" onClick={translateMsg}><a href="#"><i className="fa fa-share" aria-hidden="true"></i>Translate English</a></li>
                        <li id='zh' className="translate" onClick={translateMsg}><a href="#"><i className="fa fa-share" aria-hidden="true"></i>Translate Chinese</a></li>
                        <li id='ms' className="translate" onClick={translateMsg}><a href="#"><i className="fa fa-share" aria-hidden="true"></i>Translate Malay</a></li>
                        <li id='ta' className="translate" onClick={translateMsg}><a href="#"><i className="fa fa-share" aria-hidden="true"></i>Translate Tamil</a></li>
                    </ul> 
                </div> 
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