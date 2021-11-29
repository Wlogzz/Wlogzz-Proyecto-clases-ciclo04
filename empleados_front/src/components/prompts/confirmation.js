import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class ConfirmationProps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            title: '',
            text: '',
        }
    }
    render() {
        return (
            <Modal show={this.state.show}
                centered
            >
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>{this.state.text}</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary">Cancelar</Button>
                        <Button variant="primary">Confirmar</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>

        );
    }
}


