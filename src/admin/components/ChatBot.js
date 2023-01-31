import React, {useEffect} from "react";
import "../css/NavBar.css";

// import { Amplify } from "aws-amplify";
// import { AmplifyChatbot } from "@aws-amplify/ui-react";
// import {AWSLexV2Provider} from '@aws-amplify/interactions';
// import awsconfig from "./config/aws-exports";
// import LexChat from "react-lex-plus";
// import AWS from 'aws-sdk';

// Amplify.addPluggable(new AWSLexV2Provider());

// Amplify.configure(awsconfig.data);

// AWS.config.update({
//     region: "ap-southeast-1",
//     credentials: new AWS.CognitoIdentityCredentials({
//       IdentityPoolId: "ap-southeast-1:9096adf3-02d3-4940-a576-fbf328bd8a7e"
//     })
//   });

const ChatBot = () => {

  useEffect(() => {
    const script = document.createElement("script");

    script.id = "testid"

    document.getElementById("test").appendChild(script)
    document.getElementById("testid").innerHTML = `
    var loaderOpts = {
      baseUrl: 'https://d177emb5qgv5eb.cloudfront.net/',
      shouldLoadMinDeps: true
    };
    loaderOpts = {
      configUrl: 'https://d177emb5qgv5eb.cloudfront.net/lex-web-ui-loader-config.json',
      iframeSrcPath: 'https://d177emb5qgv5eb.cloudfront.net/index.html/?lexWebUiEmbed=true'
    }
    var loader = new ChatBotUiLoader.IframeLoader(loaderOpts);
    var chatbotUiConfig = {
            /* Example of setting session attributes on parent page
            lex: {
              sessionAttributes: {
                userAgent: navigator.userAgent,
                QNAClientFilter: ''
              }
            }
            */
          };
    loader.load(chatbotUiConfig)
      .catch(function (error) { console.error(error); });
    `;
  }, [])

  return (
    <div>
      <div id="test">

      </div>
      {/* <AmplifyChatbot
        botName="EdiCoach"
        botTitle="EdiCoach ChatBot"
        welcomeMessage="Hello, how can I help you?"
      /> */}
      {/* <LexChat
        botName="EdiCoach"
        IdentityPoolId="ap-southeast-1:9096adf3-02d3-4940-a576-fbf328bd8a7e"
        placeholder="Type"
        backgroundColor="#FFFFFF"
        height="430px"
        region="ap-southeast-1"
        headerText="Chat with our awesome bot"
        headerStyle={{ backgroundColor: "#ABD5D9", fontSize: "30px" }}
        greeting={
            "Hello, how can I help? You can say things like 'help' to get more info"
        }
        />; */}
    </div>
  );
};

export default ChatBot;
