import React from "react";
import { Container, Row } from "react-bootstrap";

export default class EmpleadosCrear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Container id="empleados-crear-container">
                <Row>
                    <h1>Crear Empleado</h1>
                </Row>
            </Container>
        );
    }
}

