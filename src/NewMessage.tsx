// @flow
import * as React from 'react';
import './app.css'
import styled from "styled-components";
import { AiOutlineSend } from "react-icons/ai";
import {Message} from "./types/Message";
import useChat from "./useChat";
import {useParams} from "react-router-dom";
import {MessageItem} from "./MessageItem";

export function NewMessage(): JSX.Element {
    const [name, setName] = React.useState("");
    const [message, setMessage] = React.useState("");
    const { roomId } = useParams();
    const { sendMessage, status, messages } = useChat(roomId);

    const handleSendMessage = () => {
        if(message.length > 0 && name.length > 0){
            let time = new Date();

            const newMessage: Message = {
                message: message,
                sender: name,
                date: time.toDateString(),
                roomId: roomId ? roomId : "global"
            }

            sendMessage(newMessage)

            setMessage("");
        }
    }

    return (
        <div>
            <div className="container">
                <div className="new-message">
                    <Input placeholder="Name" type="text" onChange={e => setName(e.target.value)} value={name}/>
                    <MessageInput placeholder="Message" type="text" onChange={e => setMessage(e.target.value)}
                                  value={message}/>
                    <Button onClick={() => handleSendMessage()}><AiOutlineSend/></Button>
                </div>

                <div className="container m-2">
                    <div className="py-1">Messages { status }</div>
                    {messages && messages.map(msg =>  <MessageItem key={msg.id} message={msg.message} date = {msg.date} sender={msg.sender} />) }
                </div>
            </div>
        </div>
    );
}

const Input = styled.input`
  padding: 8px 8px;
  border: 2px solid #4b4b4b;
  outline: none;
  width: 160px;
  margin: 0 3px;
  
  :focus{
    border: 2px solid greenyellow;
  }
`;

const Button = styled.button`
  margin: 0 3px;
  width: 100px;
  border: 0;
  background: #4b4b4b;
  color: white;
  
  :hover{
    background: greenyellow;
    color: #4b4b4b;
  }
`;

const MessageInput = styled(Input)`
  width: 100%;
  
  :focus{
    border: 2px solid greenyellow;
  }
`;