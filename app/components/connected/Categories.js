import React from 'react';
import CaseStudyCSAPIS from '../../api/caseStudyCSApis';
import {setCategory} from '../../actions/appActions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.selectCategory = this.selectCategory.bind(this);
        this.state = { categories: [] };
    }
    selectCategory(category) {
        this.props.actions.setCategory(category);
    }
    componentDidMount() {
        CaseStudyCSAPIS.getCategories('https://developers.zomato.com/api/v2.1/categories').then((response) => {
            this.setState({ categories: response.categories });
        });
    }

    render() {
        const categories = this.state.categories.map((category) => {
            return (
                <li key={category.categories.id}>
                    <button onClick={() => {this.selectCategory(category.categories)}}>{category.categories.name}</button>
                </li>
            );
        });
        return (
            <div style={{ padding: "10px" }}>
                <ul style={{padding: '0px'}}>
                    <div className='filter-head'>By Categories</div>
                    {categories}
                </ul>
            </div>
        )
    }

}
function mapStateToProps(state, ownProps) {
    return {
        selectedCategory: state.selectedCategory
    };
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({setCategory}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
