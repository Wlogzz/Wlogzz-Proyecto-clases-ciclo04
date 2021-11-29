import React from 'react';
import { request } from '../../helper/helpers';
import { Container, Row, Col } from 'react-bootstrap';

// import './empleados.css';
import DataGrid from '../../grid/grid';


const columns = [
  {
    dataField: '_id',
    text: 'Id',
    hidden: true,
  },
  {
    dataField: 'nombre',
    text: 'Nombre',
  },
  {
    dataField: 'apellido_p',
    text: 'Apellido Paterno',
  },
  {
    dataField: 'apellido_m',
    text: 'Apellido Materno',
  },
  {
    dataField: 'telefono',
    text: 'Teléfono',
  },
  {
    dataField: 'mail',
    text: 'Mail',
  },
  {
    dataField: 'direccion',
    text: 'Dirección',
  },
];

export default class EmpleadosBuscar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onClickEditButton = this.onClickEditButton.bind(this);
  }
  componentDidMount() {

  }
  onClickEditButton(row) {
    this.props.setIdEmpleado(row._id);
    this.props.changeTab('editar');
  }
  render() {
    return (
      <Container id="empleados-buscar-container">
        <Row>
          <h1>Buscar Empleados</h1>
        </Row>

        <Row>
          <DataGrid url="/empleados" columns={columns} showEditButton={true}
            onClickEditButton={this.onClickEditButton}
          />
        </Row>
      </Container>
    );
  }
}
