const apiUrl = 'http://localhost:8000/api'

function handleResponse(request) {
  return request
    .then((res) => res.json().then(json => ({res, json}))
    .then(({ res, json }) => {
      if(!res.ok) return Promise.reject(json);
      return {result: json};
    }))
}

function createSimpleRestRequest(url){
  return {
    one: (id) => handleResponse(fetch(`${url}/${id}/`)),

    all: () => handleResponse(fetch(url)),

    create: (data) => handleResponse(
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    ),

    change: (id, data) => handleResponse(
      fetch(`${url}/${id}/`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    ),

    delete: (id) => handleResponse(fetch(`${url}/${id}/`, { method: 'DELETE' }))
  }
}

export const requestCustomer = createSimpleRestRequest(`${apiUrl}/customers`);

export const requestProduct = createSimpleRestRequest(`${apiUrl}/products`);

export const requestInvoice = createSimpleRestRequest(`${apiUrl}/invoices`);

export const requestInvoiceProductRelationship = {
  one: (invoiceId, id) => handleResponse(fetch(`${apiUrl}/invoices/${invoiceId}/items/${id}`)),

  all: (invoiceId) => handleResponse(fetch(`${apiUrl}/invoices/${invoiceId}/items`)),

  create: (invoiceId, data) => handleResponse(
    fetch(`${apiUrl}/invoices/${invoiceId}/items/`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  ),

  change: (invoiceId, id, data) => handleResponse(
    fetch(`${apiUrl}/invoices/${invoiceId}/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  ),

  delete: (invoiceId, id) => handleResponse(fetch(`${apiUrl}/invoices/${invoiceId}/items/${id}`, { method: 'DELETE' }))
}