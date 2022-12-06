import React from "react";
import { ProgressBar } from "react-bootstrap";

export const MyProgressBar = ({questionNumber , numberOfQuestions}) => {
    return(
        <div>
          <ProgressBar animated now={questionNumber} max={numberOfQuestions}/>
        </div>
    )
}
