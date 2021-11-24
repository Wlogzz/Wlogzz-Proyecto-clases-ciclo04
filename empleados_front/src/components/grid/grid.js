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
import Loading from '../Loading/Loading';
import Button from '@restart/ui/esm/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const { SearchBar } = Search;
export default class DataGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      rows: []
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    this.setState({ loading: true });
    request
      .get(this.props.url)
      .then((response) => {
        this.setState({
          rows: response.data,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.error(err);
      });
  }
  getEditButton() {
    return {
      text: 'editar',
      formatter: function priceFormatter(cell, row) {
        console.log(row);
        return <Button>
        </Button>;
      },
    };
  }
  render() {
    const options = {
      custom: true,
      totalSize: this.state.rows.length,
    };
    return (
      <>
        <Loading show={this.state.loading} />
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
      </>
    );
  }
}
