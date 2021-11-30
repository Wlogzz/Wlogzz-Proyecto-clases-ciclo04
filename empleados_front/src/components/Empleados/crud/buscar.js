import React from 'react';
import { request } from '../../helper/helpers';
import { Container, Row } from 'react-bootstrap';

import DataGrid from '../../grid/grid';
import ConfirmationProps from '../../prompts/confirmation';
import Loading from '../../Loading/Loading';
import MessagePrompt from '../../prompts/message';


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
      loading: false,
      idEmpleado: null,
      confirmation: {
        title: 'Eliminar el empleado',
        text: 'Desea eliminar el empleado?',
        show: false,
      },
      message: {
        text: '',
        show: false,
      },
    };
    this.onClickEditButton = this.onClickEditButton.bind(this);
    this.onClickDeleteButton = this.onClickDeleteButton.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }
  componentDidMount() {

  }
  onClickEditButton(row) {
    this.props.setIdEmpleado(row._id);
    this.props.changeTab('editar');
  }
  onClickDeleteButton(row) {
    this.setState({
      idEmpleado: row._id,
      confirmation: {
        ...this.state.confirmation,
        show: true,
      },
    });
  }
  onCancel() {
    this.setState({
      confirmation: {
        ...this.state.confirmation,
        show: false,
      },
    });
  }
  onConfirm() {
    this.setState({
      confirmation: {
        ...this.state.confirmation,
        show: false,
      },
    },
      this.eliminarEmpleado()
    );
  }
  eliminarEmpleado() {
    this.setState({ loading: true });
    request
      .delete(`/empleados/${this.state.idEmpleado}`)
      .then((response) => {
        this.setState({
          loading: false,
          message: {
            text: response.data.msg,
            show: true,
          },
        });
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  }
  render() {
    return (
      <Container id="empleados-buscar-container">
        <ConfirmationProps
          show={this.state.confirmation.show}
          title={this.state.confirmation.title}
          text={this.state.confirmation.text}
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
        />
        <MessagePrompt
          text={this.state.message.text}
          show={this.state.message.show}
          duration={2500}
          onExited={this.onExitedMessage}
        />

        <Loading show={this.state.loading}
        />
        <Row>
          <h1>Buscar Empleados</h1>
        </Row>

        <Row>
          <DataGrid url="/empleados" columns={columns}
            showEditButton={true}
            showDeleteButton={true}
            onClickEditButton={this.onClickEditButton}
            onClickDeleteButton={this.onClickDeleteButton}
          />
        </Row>
      </Container>
    );
  }
}
