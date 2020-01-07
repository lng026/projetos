
'use strict';
const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false, nome: "nome" };
    
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return ( <button onClick={() => this.setState({ liked: true })}>
          Like
        </button>
      );
  }
} 

const Header = () => <div id="main-header"><h1>ERP Works</h1></div>;
const domContainer = document.querySelector('#destinoReact');
ReactDOM.render(e(LikeButton), domContainer);