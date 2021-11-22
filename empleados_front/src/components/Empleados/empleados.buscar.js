import React from 'react';
import { request } from '../helper/helpers';
import { Container, Row, Col } from 'react-bootstrap';

import './empleados.css';
import DataGrid from '../grid/grid';


const columns = [
  {
    dataField: '_id',
    text: 'Id',
  },
  {
    dataField: 'nombre',
    text: 'Nombre',
  },
  {
    dataField: 'apellido_p',
    text: 'Apellido_p',
  },
  {
    dataField: 'apellido_m',
    text: 'Apellido_m',
  },
  {
    dataField: 'telefono',
    text: 'Telefono',
  },
  {
    dataField: 'mail',
    text: 'Mail',
  },
  {
    dataField: 'direccion',
    text: 'Direccion',
  },
];

export default class EmpleadosBuscar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    
  }

  render() {
    return (
      <Container id="empleados-buscar-container">
        <Row>
          <h1>Buscar Empleados</h1>
        </Row>

        <Row>
          <DataGrid url="/empleados" columns={columns}/>
        </Row>
      </Container>
    );
  }
}
