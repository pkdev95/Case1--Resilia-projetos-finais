const LojasApi = () => {
  const url = 'http://localhost:8586'

  return {
    getLoja() {
      return fetch(`${url}/loja`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },
    deleteLoja(lojaId) {
      return fetch(`${url}/loja/${lojaId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },
    createLoja(endereco, telefone, email) {
      return fetch(`${url}/loja`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          endereco: endereco,
          telefone: telefone,
          email: email
        })
      })
    },
    updateLoja(lojaId, endereco, telefone, email) {
      return fetch(`${url}/loja/${lojaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          endereco: endereco,
          telefone: telefone,
          email: email
        })
      })
    }
  }
}

export default LojasApi
