import React, { Component } from 'react';
import { Progress } from 'reactstrap';

class ProgressBarComp extends Component {
    constructor(props){
        super(props);
        this.state = {
            progress_value: 1,
            time_el : this.props.time
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            if(this.state.progress_value <= 98){
                var val = this.state.progress_value + 1.1372345;
                var value = Math.round(val*100);
                this.setState({progress_value: value/100});
            }
        }, this.state.time_el);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    

    render() { 
        return ( 
            <>
                <div className="text-center">Processing Video... {this.state.progress_value}%</div>
                <Progress animated value={this.state.progress_value} />
            </>
        );
    }
}
 
export default ProgressBarComp;