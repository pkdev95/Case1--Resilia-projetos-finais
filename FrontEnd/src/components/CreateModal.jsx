import { Modal, Button, Form } from 'react-bootstrap'

function CreateModal(props) {
  return(
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={props.isModalOpen}>
        <Form onSubmit={(event) => {
          props.createTime(event)
        }}>
        <Modal.Header closeButton onClick={props.handleClose}>
          <Modal.Title>Inserir Endereço</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId="endereco">
            <Form.Label>
              endereco
            </Form.Label>
            <Form.Control type="varchar" />
          </Form.Group>

          <Form.Group controlId="telefone">
            <Form.Label>
              telefone
            </Form.Label>
            <Form.Control type="integer" />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>
              email
            </Form.Label>
            <Form.Control type="varchar" />
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

export default CreateModal