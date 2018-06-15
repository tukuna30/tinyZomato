import React from 'react';

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.selectedRating = '';
    }
    handleOptionChange(event) {
        let value = event.target.value;
        this.selectedRating = value;
        this.props.onChange && this.props.onChange(value);
    }

    render() {
        return (
            <div style={{padding: "10px"}}>
                <div className='filter-head'>Filter by rating</div>
                <div className="radio">
                    <label>
                        <input type="radio" value="4.5"
                            checked={this.selectedRating === "4.5"}
                            onChange={this.handleOptionChange} />
                        4.5 or more
                </label>
                </div>
                <div className="radio">
                    <label>
                        <input type="radio" value="4"
                            checked={this.selectedRating === "4"}
                            onChange={this.handleOptionChange} />
                        4 or more
                </label>
                </div>
                <div className="radio">
                    <label>
                        <input type="radio" value="3"
                            checked={this.selectedRating === "3"}
                            onChange={this.handleOptionChange} />
                        3 or more
                </label>
                </div>
            </div>
        )
    }
}

export default Filter;
