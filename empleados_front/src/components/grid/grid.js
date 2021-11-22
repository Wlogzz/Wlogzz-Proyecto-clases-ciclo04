import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import { Row, Col } from 'react-bootstrap';
import { request } from '../helper/helpers';

const { SearchBar } = Search;
export default class DataGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        rows:[]
    };
  }
  getData(){
    request
    .get('this.props.url')
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.error(err);
    });
  }
  render() {
    const options = {
      custom: true,
      totalSize: this.state.rows.length,
    };
    return (
      <ToolkitProvider keyField="tp" data={this.state.rows} columns={this.props.columns} search>
        {(props) => (
          <>
            <PaginationProvider pagination={paginationFactory(options)}>
              {({ paginationProps, paginationTableProps }) => (
                <>
                  <Row>
                    <Col>
                      <SizePerPageDropdownStandalone {...paginationProps} />
                    </Col>
                    <Col>
                      <SearchBar {...props.searchProps} />
                    </Col>
                  </Row>

                  <BootstrapTable
                    keyField="bt"
                    data={this.state.rows}
                    columns={this.props.columns}
                    {...paginationTableProps}
                    {...props.baseProps}
                  />
                  <PaginationListStandalone {...paginationProps} />
                </>
              )}
            </PaginationProvider>
          </>
        )}
      </ToolkitProvider>
    );
  }
}
