import { Table, Container, Button } from 'react-bootstrap'
import LojasApi from './api/LojasApi'
import { useEffect, useState } from 'react'
import CreateModal from './components/CreateModal'
import UpdateModal from './components/UpdateModal'

function App() {
  const [lojas, setLojas] = useState()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [selectedLoja, setSelectedLoja] = useState()

  const handleCloseCreateModal = () => setIsCreateModalOpen(false);
  const handleShowCreateModal = () => setIsCreateModalOpen(true);

  const handleCloseUpdateModal = () => setIsUpdateModalOpen(false);
  const handleShowUpdateModal = () => setIsUpdateModalOpen(true);

  useEffect(() => {
    async function getData() {
      await LojasApi().getLoja().then(data => {
        return data.json()
      })
      .then(data => {
        setLojas(data)
      })
    }

    getData()
  }, [])

  async function createLoja(event) {
    try {
      event.preventDefault()

      const req = event.currentTarget.elements

      await LojasApi().createLoja(
        req.endereco.value,
        req.telefone.value,
        req.email.value
      ).then(data => {
        return data.json()
      }).then(res => {
        setLojas([...lojas, {
          id: res.lojaId,
          endereco: req.endereco.value,
          telefone: req.telefone.value
        }])

        setIsCreateModalOpen(false)
      })
    } catch(err) {
      throw err
    }
  }

  async function deleteLoja(lojaId) {
    try {
      await LojasApi().deleteLoja(lojaId)

      const formattedLojas = lojas.filter(cont => {
        if(cont.id !== lojaId){
          return cont
        }
      })

      setLojas(formattedLojas)
    } catch(err) {
      throw err
    }
  }

  async function updateLoja(event) {
    try {
      event.preventDefault()

      const req = event.currentTarget.elements

      await LojasApi().updateLoja(
        selectedLoja.id, req.endereco.value, req.telefone.value, req.email.value
      )

      const formattedLojas = lojas.map(cont => {
        if(cont.id === selectedLoja.id) {
          return {
            id: selectedLoja.id,
            endereco: req.endereco.value,
            telefone: req.telefone.value,
            email: req.email.value
          }
        }

        return cont
      })

      setLojas(formattedLojas)

      setIsUpdateModalOpen(false)
    } catch(err) {
      throw err
    }
  }

  return (
    <>
    <Container
    className="
    d-flex
    flex-column
    align-items-start
    justify-content-center
    h-100
    w-100
    "
    >
      <Button
        className="mb-2"
        onClick={handleShowCreateModal}
        variant='primary'>
        Inserir endereço
      </Button>
       <Table striped bordered hover>
        <thead>
          <tr>
            <th>Endereço</th>
            <th>telefone</th>
            <th>email</th>
            <th>Ações</th>

          </tr>
        </thead>

        <tbody>
          {lojas && lojas.map(cont => (
            <tr key={cont.id}>
              <td>{cont.endereco}</td>
              <td>{cont.telefone}</td>
              <td>{cont.email}</td>
              <td>
                <Button onClick={() => deleteLoja(cont.id)} variant='danger'>
                  Excluir
                </Button>
                <Button
                  onClick={() => {
                    handleShowUpdateModal()
                    setSelectedLoja(cont)
                  }}
                  variant='warning'
                  className='m-1'
                  >
                  Atualizar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    <CreateModal isModalOpen={isCreateModalOpen} handleClose={handleCloseCreateModal} createLoja={createLoja} />
    {selectedLoja && (
      <UpdateModal isModalOpen={isUpdateModalOpen} handleClose={handleCloseUpdateModal} updateLoja={updateLoja} loja={selectedLoja} />
    )}
    </>
  )
}

export default App
