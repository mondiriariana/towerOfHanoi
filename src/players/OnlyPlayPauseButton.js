import React from 'react';
import ReactHowler from 'react-howler';
import Button from '../components/Button';

class OnlyPlayPauseButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      loop: true, 
    };

    this.handleTogglePlay = this.handleTogglePlay.bind(this);
  }

  handleTogglePlay() {
    this.setState((prevState) => ({
      playing: !prevState.playing,
    }));
  }

  render() {
    return (
      <div>
        <ReactHowler
          src={['theme.wav']}
          playing={this.state.playing}
          loop={this.state.loop}
        />
    <Button onClick={this.handleTogglePlay}>
  {this.state.playing ? 'Pause 🔇' : 'Immersion 🔊'}
</Button>

      </div>
    );
  }
}

export default OnlyPlayPauseButton;
