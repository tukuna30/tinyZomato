import React from 'react';

class Sorter extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelection = this.handleSelection.bind(this);
        this.selectedRating = '';
    }
    handleSelection(event) {
        this.props.onSelection && this.props.onSelection(event.target.parentElement.id);
    }

    render() {
        return (
            <div style={{padding: "10px"}}>
                <div>Sort By</div>
                <button id="asc" onClick={this.handleSelection} style={{padding: '2px', borderRadius: '5px'}}><span style={{writingMode: 'tb', textOrientation: 'upright', width: '10px'}}>3 4 5</span></button>
                <button id="dsc" onClick={this.handleSelection} style={{marginLeft: '10px', padding: '2px', borderRadius: '5px'}}><span style={{writingMode: 'tb', textOrientation: 'upright', width: '10px',}}>5 4 3</span></button>
            </div>
        )
    }
}

export default Sorter;
