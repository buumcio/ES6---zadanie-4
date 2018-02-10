class Stopwatch extends React.Component {
    constructor() {
        super();
        this.state = {
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0

            },
            running: false,
        };
        
    }

    reset() {
        let resTimes = {
            minutes: this.state.times.miliseconds = 0,
            seconds: this.state.times.seconds = 0,
            miliseconds: this.state.times.miliseconds = 0
        };
        this.setState({
            times: resTimes, running: false
        });
    }
 
	format(times) {
        return `${this.pad0(times.minutes)}:${this.pad0(times.seconds)}:${this.pad0(times.miliseconds)}`;
	}
	pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
	}
	start() {
    if (!this.state.running) {
        this.setState({running: true});
        this.watch = setInterval(() => this.step(), 10);
    }
    }
    step() {
    if (!this.state.running) return;
    this.calculate();
    }
    calculate() {
        let newTimes = {
            miliseconds: this.state.times.miliseconds,
            seconds: this.state.times.seconds,
            minutes: this.state.times.minutes
        };
    newTimes.miliseconds += 1;
    if (newTimes.miliseconds >= 100) {
        newTimes.seconds += 1;
        newTimes.miliseconds = 0;
    }
    if (newTimes.seconds >= 60) {
        newTimes.minutes += 1;
        newTimes.seconds = 0;
    }
    this.setState( {
        times: newTimes
    });
    }
    stop() {
    this.setState({running: false});
    clearInterval(this.watch);
    }

    render() {
        return (
            <nav className="controls">
                <a href="#" onClick={() => this.start()} className="button">Start</a>
                <a href="#" onClick={() => this.stop()} className="button">Stop</a>
                <ul id="results">{this.format(this.state.times)}</ul>
            </nav>
        );
    }
}


ReactDOM.render(<Stopwatch/>, document.getElementById('stopwatch'));