import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../qualityCenterActions';

export class QualityCenterQueryViewer extends Component {

  componentDidMount() {
    console.log('QualityCenterQueryViewer.componentDidMount, this.props: ', this.props);
    this.loadData();
  }

  render() {
    if (this.isLoading()) {
      return <div>QC Query Viewer - LOADING</div>
    }

    let coalescedQueries = this.coalesceQueryData(
      this.props.qualityCenter.queries,
      this.props.qualityCenter.queryComponents);

    const queryComponents = coalescedQueries.map((query) =>
      <li key={query.id}>Query Name: {query.name}
        <ul>
          {query.components.map((component) =>
            <li key={query.id + component.fieldName}>{component.fieldName} = {component.expression}</li>)}
        </ul>
      </li>);

    return <div>
      <ul>{queryComponents}</ul>
    </div>

  }

  /**
   * Maps data from normalized json-api to an easy-to-use array of objects with the following format:
   * { id: queryId, name: queryName, components: array of query component objects }
   * Query components have the following format: {fieldName: field name of component, expression: the query expression
   * for the field name}
   * TODO: move to reducer???
   */
  coalesceQueryData(queries, queryComponents) {
    let coalescedQueries = Object.keys(queries).map(key => {
      let rawQuery = queries[key];
      let query = {id: rawQuery.id, name: rawQuery.attributes.name};
      query.components = rawQuery.relationships.components.data.map(componentId => {
        let component = queryComponents[componentId.id];
        return {fieldName: component.attributes.fieldName, expression: component.attributes.expression};
      });
      return query;
    });

    return coalescedQueries;
  }

  isLoading() {
    return !this.props.qualityCenter.isLoaded;
  }

  loadData() {
    this.props.getQcQueries();
  }
}

function mapStateToProps(state) {
  return {
     qualityCenter: state.qualityCenter
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getQcQueries: actions.loadQcQueries
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QualityCenterQueryViewer);