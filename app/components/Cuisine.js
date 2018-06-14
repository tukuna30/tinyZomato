import React from 'react';
import CaseStudyCSAPIS from '../api/caseStudyCSApis';

class Cuisine extends React.Component {
    constructor(props) {
        super(props);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.state = {cusines: []};
    }
    handleOptionChange(event) {
        let value = event.target.value;
        this.selectedRating = value;
        this.props.onChange && this.props.onChange(value);
    }
    componentDidMount() {
        CaseStudyCSAPIS.getCuisines().then((cusines) => {
            this.setState({cusines});
        });
    }

    render() {
        return (
            <div style={{padding: "10px"}}>
            </div>
        )
    }
}

export default Cuisine;
