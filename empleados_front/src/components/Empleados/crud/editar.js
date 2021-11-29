import React from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import { request } from "../../helper/helpers";
import Loading from "../../Loading/Loading";
import MessagePrompt from "../../prompts/message";
import ConfirmationProps from "../../prompts/confirmation";

export default class EmpleadosEditar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idEmpleado: this.props.getIdEmpleado(),
            rediret: false,
            message: {
                text: '',
                show: false,
            },
            confirmation: {
                show: false,
                title: '',
                text: '',
            },
            loading: false,
            empleado: {
                nombre: '',
                apellido_p: '',
                apellido_m: '',
                telefono: '',
                mail: '',
                direccion: '',
            },
        };
        this.onExitedMessage = this.onExitedMessage.bind(this);
    }
    componentDidMount() {
        this.getEmpleado();
    }
    getEmpleado() {
        this.setState({ loading: true });
        request
            .get(`/empleados/${this.state.idEmpleado}`)
            .then((response) => {
                this.setState({
                    empleado: response.data,
                    loading: false,
                });
            })
            .catch((err) => {
                console.error(err);
                this.setState({ loading: false });
            });
    }
    setValue(index, value) {
        this.setState({
            empleado: {
                ...this.state.empleado,
                [index]: value,
            },
        });
    }
    guardarEmpleados() {
        this.setState({ loading: true });
        request
            .put(`/empleados/${this.state.idEmpleado}`, this.state.empleado)
            .then((response) => {
                if (response.data.exito) {
                    this.setState({
                        rediret: response.data.exito,
                        message: {
                            text: response.data.msg,
                            show: true,
                        },
                    });
                }
                this.setState({ loading: false });
            })
            .catch((err) => {
                console.error(err);
                this.setState({ loading: true });
            })
    }
    onExitedMessage() {
        if (this.state.rediret) this.props.changeTab('buscar');
    }
    onCancel() {

    }
    onConfirm() {

    }
    render() {
        return (
            <Container id="empleados-crear-container">
                <MessagePrompt text={this.state.message.text}
                    show={this.state.message.show}
                    duration={2500}
                    onExited={this.onExitedMessage}
                />
                <ConfirmationProps
                    show={true}
                    title=''
                    text=''
                    onCancel={() => console.log('Cancelar')}
                    onConfirm={() => console.log('Aceptar')}
                />
                <Loading show={this.state.loading} />
                <Row>
                    <h1>Editar Empleado</h1>
                </Row>
                <Row>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                value={this.state.empleado.nombre}
                                onChange={(e) => this.setValue('nombre', e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Apellido Paterno</Form.Label>
                            <Form.Control
                                value={this.state.empleado.apellido_p}
                                onChange={(e) => this.setValue('apellido_p', e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Apellido Materno</Form.Label>
                            <Form.Control
                                value={this.state.empleado.apellido_m}
                                onChange={(e) => this.setValue('apellido_m', e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                value={this.state.empleado.telefono}
                                onChange={(e) => this.setValue('telefono', e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Mail</Form.Label>
                            <Form.Control
                                value={this.state.empleado.mail}
                                onChange={(e) => this.setValue('mail', e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control
                                value={this.state.empleado.direccion}
                                onChange={(e) => this.setValue('direccion', e.target.value)} />
                        </Form.Group>

                        <Button id="btn-enviar" variant="primary" onClick={() => console.log(this.guardarEmpleados())}>
                            Guardar Empleado
                        </Button>
                    </Form>
                </Row>
            </Container>
        );
    }
}

