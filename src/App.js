import React, {Component} from 'react';
import DogeMode from './doge-mode/doge-mode'
import './App.css';


class App extends Component {
    constructor(){
        super()
        this.state = {active : true}
        setTimeout(function(){
            this.setState({active : false})
        }.bind(this),10000)
    }
    render() {
       return (
           <p>Follow us on <DogeMode messages={["emoji-basketball"]}><a href="https://dribbble.com/wearemeaningful">Dribbble</a></DogeMode>
               , <DogeMode messages={["emoji-chick"]}><a href="https://twitter.com/wearemngfl">Twitter</a></DogeMode> or <DogeMode messages={["emoji-camera"]}><a href="https://www.instagram.com/wearemngfl">Instagram</a></DogeMode>.</p>
       )
    }
}

export default App;
