import { Modal, Button, Form } from 'react-bootstrap'

function UpdateModal(props) {
  return(
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={props.isModalOpen}>
        <Form onSubmit={(event) => {
          props.updateLoja(event)
        }}>
        <Modal.Header closeButton onClick={props.handleClose}>
          <Modal.Title>Atualizar Loja</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId="endereco">
            <Form.Label>
              Endereco
            </Form.Label>
            <Form.Control defaultValue={props.loja.endereco} type="varchar" />
          </Form.Group>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>Close</Button>
          <Button variant="primary" type="submit">Salvar</Button>
        </Modal.Footer>
        </Form>
      </Modal >
    </div>
  )
}

export default UpdateModal
