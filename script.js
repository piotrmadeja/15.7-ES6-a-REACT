class Stopwatch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      running: false,
      times: {      
          minutes: 0,
          seconds: 0,
          miliseconds: 0
      },
    }
  }

  format() {
    let{minutes, seconds, miliseconds} = this.state.times;
    return `${pad0(minutes)}:${pad0(seconds)}:${pad0(Math.floor(miliseconds))}`;
  }

  start() {
    if (!this.state.running) {
      this.setState({
        running: true,
        watch: setInterval(() => this.step(), 10)
      })
    }
  }  

  stop() {
    this.setState({
      running: false
    });
    clearInterval(this.state.watch);
  }

  reset() {
    this.setState({
      running: false,
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
    });
  }

  step() {
    if (!this.state.running) return;
    this.calculate();
  }

  calculate() {
    let{minutes, seconds, miliseconds} = this.state.times;
    miliseconds += 1;
    if (miliseconds >= 100) {
      seconds += 1;
      miliseconds = 0;
    }
    if (seconds >= 60) {
      minutes += 1;
      seconds = 0;
    }
    this.setState({
      times: {
        minutes,
        seconds,
        miliseconds
      }  
    });
  }

  render() {
    return ( 
      <div>
        <nav className="buttons">
          <a href="#" className="button-start" onClick={this.start.bind(this)}></a>
          <a href="#" className="button-stop" onClick={this.stop.bind(this)}></a>
          <a href="#" className="button-reset" onClick={this.reset.bind(this)}></a>
        </nav>
        <div className="screen">{this.format()}</div>
      </div>
    )
  }

}

function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}
 

ReactDOM.render(<Stopwatch />, document.getElementById('app'));