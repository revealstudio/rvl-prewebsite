import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import DogeMode from './doge-mode/doge-mode'

ReactDOM.render(
  <App />,
  document.getElementById('links')
);

ReactDOM.render(
    <DogeMode messages={["emoji-love_letter"]}><a href="mailto:hello@revealstudio.co">Contact us</a></DogeMode>,
    document.getElementById('first-contact')
);

ReactDOM.render(
    <DogeMode messages={["emoji-love_letter"]}><a href="mailto:hello@revealstudio.co">hello@revealstudio.co</a></DogeMode>,
    document.getElementById('footer-contact')
);


(
    function(){
        document.addEventListener('DOMContentLoaded', function(){
            var video = document.getElementById("video");
            var ratio = 0.1;
            window.addEventListener('scroll',function(evt){
                video.style.transform = "translateY("+ Math.round(window.scrollY * ratio) +"px)";
            })
        }, false);
    }
)();
