import io from 'socket.io-client';
import { React } from 'react';


export class MyComponent extends React.component {
    componentDidMount() {
      this.socket = io('http://localhost:8080');
      this.socket.on('connection', () => {
        console.log('Connected to server');
      });
    }
    handleClick = () => {
        this.socket.emit('event', { message: 'Hello, server!' });
      }
  
    render() {
      // Render your component
      return (
        <button onClick={this.handleClick}>Send message</button>
      );
      
    }
  }