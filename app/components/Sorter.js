import React from 'react';

class Sorter extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelection = this.handleSelection.bind(this);
        this.selectedRating = '';
    }
    handleSelection(order) {
        this.props.onSelection && this.props.onSelection(order);
    }

    render() {
        return (
            <div style={{padding: "10px"}}>
                <div className='filter-head'>Sort By Rating</div>
                <button id="asc" onClick={() => {this.handleSelection('asc')}} style={{padding: '2px', borderRadius: '5px'}}><span style={{ padding: '8px', fontWeight: 'bold', fontSize: '15px'}}>&#8595;</span></button>
                <button id="dsc" onClick={() => {this.handleSelection('dsc')}} style={{marginLeft: '10px', padding: '2px', borderRadius: '5px'}}><span style={{padding: '8px', fontWeight: 'bold', fontSize: '15px'}}>&#8593;</span></button>
            </div>
        )
    }
}

export default Sorter;
