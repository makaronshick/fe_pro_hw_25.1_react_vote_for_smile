import React from "react";
import "./smileVoting.styles.css";

export default class SmileVoting extends React.Component {
  constructor(props) {
    super(props);

    const savedVotes = JSON.parse(localStorage.getItem("emoticonsVotes"));
    const votes = savedVotes ? savedVotes : [
      { id: 1, src: "./emoticons/1.png", votes: 0 },
      { id: 2, src: "./emoticons/2.png", votes: 0 },
      { id: 3, src: "./emoticons/3.png", votes: 0 },
      { id: 4, src: "./emoticons/4.png", votes: 0 },
      { id: 5, src: "./emoticons/5.png", votes: 0 },
    ];

    this.state = {
      emoticons: votes,
      showResults: false,
    };
  } 

  handleVote = (id) => {
    const updatedEmojis = this.state.emoticons.map((emoji) => {
      if (emoji.id === id) {
        return { ...emoji, votes: emoji.votes + 1 };
      }
      return emoji;
    });

    this.setState({ emoticons: updatedEmojis }, () => {
      localStorage.setItem("emoticonsVotes", JSON.stringify(this.state.emoticons));
    });
  };

  showResults = () => {
    this.setState({ showResults: true });
  };

  clearResults = () => {
    localStorage.removeItem("emoticonsVotes");
    this.setState({
      emoticons: this.state.emoticons.map((emoji) => ({ ...emoji, votes: 0 })),
      showResults: false,
    });
  };

  get winners() {
    const maxVotes = Math.max(...this.state.emoticons.map((emoji) => emoji.votes));
    if (maxVotes === 0) {
      return "There is no winner";
    }

    return this.state.emoticons.filter((emoji) => emoji.votes === maxVotes);
  };

  render() {
    return (
      <div>
        <ul>
          {this.state.emoticons.map((emoji) => (
            <li key={emoji.id} className="emoji_item">
              <img src={emoji.src} className="emoji_image" /> {emoji.votes} - Votes
              <button className="custom_btn" onClick={() => this.handleVote(emoji.id)}>Vote</button>
            </li>
          ))}
        </ul>
        <button className="custom_btn" onClick={this.showResults}>Show Results</button>
        <button className="custom_btn" onClick={this.clearResults}>Clear Results</button>

        {this.state.showResults && (typeof this.winners === 'object') && (
          <div>
            <h2>WINNER IS:</h2>
            <ul>
              {this.winners.map((emoji) => (
                <li key={emoji.id} className="emoji_item">
                  <img src={emoji.src} className="emoji_image" /> {emoji.votes} - Votes
                </li>
              ))}
            </ul>
          </div>
        )}

        {this.state.showResults && (typeof this.winners === 'string') && (
          <div>
            <h2>{this.winners}</h2>
          </div>
        )}
      </div>
    );
  }
}
