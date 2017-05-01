import React, {Component} from 'react'
import './doge-message.css'

class DogeMode extends Component {

    constructor() {
        super();
        this.isDelayFinished = true;
        this.active = true;
        this.colors = DogeMode.getDefaultColors();
        this.messages = DogeMode.getDefaultMessages();
        this.delayBetweenMessages = DogeMode.getDefaultDelayBetweenMessages();
        this.state = {
            messages : []
        }
    }

    componentWillMount() {
        if(this.props.colors){
            this.colors = this.props.colors;
        }
        if(this.props.messages){
            this.messages = this.props.messages;
        }
        if(this.props.delayBetweenMessages){
            this.delayBetweenMessages = this.props.delayBetweenMessages;
        }
        if(typeof this.props.active === 'boolean'){
            this.active = this.props.active;
        }
    }

    componentWillReceiveProps(nextProps) {
        //Active
        if(typeof nextProps.active === 'boolean'){
            this.active = nextProps.active
        } else {
            this.active = true;
        }
        //Colors
        if(nextProps.colors){
            this.colors = nextProps.colors;
        } else {
            this.colors = DogeMode.getDefaultColors();
        }
        //Messages
        if(nextProps.messages){
            this.messages = nextProps.messages;
        } else {
            this.messages = DogeMode.getDefaultMessages();
        }
        //Delay
        if(nextProps.delayBetweenMessages){
            this.delayBetweenMessages = nextProps.delayBetweenMessages;
        } else {
            this.delayBetweenMessages = DogeMode.getDefaultDelayBetweenMessages();
        }
    }

    static getDefaultColors() {
        return [
            'red',
            'blue',
            'cyan',
            'lime',
            'gold',
            'deepPink'
        ];
    }

    static getDefaultMessages() {
        return [
            "so shiny",
            "very wow",
            "much events",
            "so hover"
        ];
    }

    static getDefaultDelayBetweenMessages() {
        return 180;
    }

    canSendMessage() {
        return this.isDelayFinished && this.active
    }

    addMessage(x, y, content){
        if(!this.canSendMessage()){
            return;
        }
        this.isDelayFinished = false;
        this.setState(
            {
                messages : this.state.messages.concat(
                    {
                        x : x,
                        y : y,
                        content : content,
                        id : new Date().getTime()
                    }
                )
            }
        );
        setTimeout(function(){
            this.isDelayFinished = true;
        }.bind(this), this.delayBetweenMessages)
    }

    onDeleteMessage(id) {
        this.setState(
            {
                messages : this.state.messages.filter(function(m){return m.id !== id})
            }
        )
    }

    selectColor() {
        return this.colors[Math.floor(Math.random() * this.colors.length)]
    }

    selectMessage() {
        return this.messages[Math.floor(Math.random() * this.messages.length)]
    }

    onEvent(evt) {
        this.addMessage(evt.pageX - this.refs.elementRef.getBoundingClientRect().left, evt.pageY, this.selectMessage(), 1000);
    }


    mobileCheck() {
        return !!(navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i));
    }

    render() {
        if(this.mobileCheck()){
            return (
                <span>{this.props.children}</span>
            )
        } else {
            return (
                <span ref="elementRef" onMouseMove={this.onEvent.bind(this)}>
                {this.props.children}
                    {this.state.messages.map(m =>
                        <DogeMessage key={m.id}
                                     onDelete={this.onDeleteMessage.bind(this)}
                                     message={m}
                                     offsetY={m.y}
                                     offsetX={m.x}
                                     color={this.selectColor()}
                        />
                    )}
            </span>
            )
        }
    }
}


class DogeMessage extends Component {
    constructor(){
        super();
        this.style = {};
    }

    componentWillMount() {
        if(this.props.onDelete && typeof this.props.onDelete === 'function'){
            setTimeout(function(){
                this.removeMessage();
            }.bind(this),1000)
        }
        if(!this.props.offsetY || !this.props.offsetX){
            this.removeMessage();
            return;
        }
        this.style['top'] = "-30px";
        this.style['left'] = this.props.offsetX + "px";
        this.style['color'] = this.props.color;
    }

    removeMessage() {
        this.props.onDelete(this.props.message.id);
    }

    render() {
        if(this.props.onDelete && typeof this.props.onDelete === 'function'){
            let content = this.props.message.content;
            if(content.slice(0,6) === 'emoji-'){
                switch (content.slice(6)) {
                    case "basketball":
                        content = <img className="emoji" src="/assets/img/emoji/dribbble.png" role="presentation"/>;
                        break;
                    case "chick":
                        content = <img className="emoji" src="/assets/img/emoji/twitter.png" role="presentation"/>;
                        break;
                    case "camera":
                        content = <img className="emoji" src="/assets/img/emoji/instagram.png" role="presentation"/>;
                        break;
                    case "love_letter":
                        content = <img className="emoji" src="/assets/img/emoji/mail.png" role="presentation"/>;
                        break;
                    default:
                }
            }
            return (
                <div className="doge-message" style={this.style}>
                    {content}
                </div>
            )
        } else {
            return null;
        }
    }
}

export default DogeMode
