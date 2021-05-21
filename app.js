const container = document.getElementById("container");
const modal = document.getElementById("modal");
const modalEdit = document.getElementById("modal-edit");
const close = document.getElementById("close");
const closeEdit = document.getElementById("close-edit");
const deleteModal = document.getElementById("deleteModal");
const closeDelete = document.getElementById("closeDelete");
const commentaries = document.getElementById("commentaries");
const table = document.getElementById("table");
const eliminar = document.getElementById("eliminar");

const inputName = document.getElementById('input-name');
const inputApellido = document.getElementById('input-apellido');
const inputEmail = document.getElementById('input-email');
const inputEdad = document.getElementById('input-edad');
const estaPagado = document.getElementById('esta-pagado');
const btnGuardar = document.getElementById('btn-guardar');
const btnGuardarEdit = document.getElementById('btn-guardar-edit');

const formElementsEditOperation = document
  .querySelector("#modal__body-edit")
  .querySelectorAll("input[data-edit], select[data-edit]");


let arreglo = [];
let idEdit = null;
let idEliminar = null;

const showModal = () =>{
  modal.classList.add("is-visible");
}
const showModalEdit = () =>{
  modalEdit.classList.add("is-visible");
}
const closeModal = () =>{
 modal.classList.remove("is-visible");
}
const closeModalEdit = () =>{
 modalEdit.classList.remove("is-visible");
}

const showModalDelete = () =>{
  deleteModal.classList.add("is-visible");
}
const closeModalDelete = () =>{
  deleteModal.classList.remove("is-visible");
}

eliminar.addEventListener('click', () => {
  deleteUser();
})

close.addEventListener("click",closeModal);
closeEdit.addEventListener("click",closeModalEdit);
closeDelete.addEventListener("click",closeModalDelete);

window.addEventListener("click",(event) => {
  if (event.target == modal) {
    closeModal();
  }
  if (event.target == modal) {
    closeModal();
  }
});

const openModal= ()=>  {
  showModal();
};

const openModalDelete= (id)=>  {
  showModalDelete();
  idEliminar = id
};
const openModalEdit= (id)=>  {
  getIdEdit(id)
  showModalEdit();
};

myBtn.addEventListener("click",openModal);


const printData = arr => {
  let caja = '';
  arr.forEach(element => {
    const {nombre, apellido, edad, email, estado, saldo, id} = element
    caja += `
    <tr>
      <td>${nombre}</td>
      <td>${apellido}</td>
      <td>${email}</td>
      <td>${edad}</td>
      <td>${estado}</td>
      <td>${saldo}</td>
      <td>
        <span class="action" onclick="openModalEdit(${id})">
          <i class="fas fa-edit"></i>
        </span>
        <span class="action" onclick="openModalDelete(${id})">
          <i class="fas fa-trash"></i>
        </span>
      </td>
    </tr>
    `
  });
  table.innerHTML = caja;
}

const getIdEdit = id => {
  const usuario = arreglo.find(user => user.id == id);
  formElementsEditOperation[0].value = usuario.nombre;
  formElementsEditOperation[1].value = usuario.apellido;
  formElementsEditOperation[2].value = usuario.email;
  formElementsEditOperation[3].value = usuario.edad;
  formElementsEditOperation[4].value = usuario.estado;
  idEdit = id
}

const deleteUser = () => {
  const url = `https://60a6e6efb970910017eb285c.mockapi.io/users/${idEliminar}`
  fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
  .then(resp => resp.json())
  .then(data => {
    getusers();
    closeModalDelete();
  })
  .catch(err => console.error(err))
}

const putUser = obj => {
  const url = `https://60a6e6efb970910017eb285c.mockapi.io/users/${idEdit}`
  fetch(url, {
    method: 'PUT',
    body: JSON.stringify(obj),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
  .then(resp => resp.json())
  .then(data => {
    getusers();
    closeModalEdit();
  })
  .catch(err => console.error(err))
}

const getusers = () => {
  const url = `https://60a6e6efb970910017eb285c.mockapi.io/users`
  fetch(url)
    .then(resp => resp.json())
    .then(data => {
      printData(data)
      arreglo = data
    })
    .catch(err => console.error(err))
}

getusers();

const postUser = obj => {
  const url = 'https://60a6e6efb970910017eb285c.mockapi.io/users'
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
  .then(resp => resp.json())
  .then(data => getusers())
  .catch(err => console.error(err))
}

btnGuardarEdit.addEventListener('click', () => {
  const newUser = {
    nombre: formElementsEditOperation[0].value,
    apellido: formElementsEditOperation[1].value,
    email: formElementsEditOperation[2].value,
    edad: formElementsEditOperation[3].value,
    estado: formElementsEditOperation[4].value,
    saldo: 6000,
  }
  putUser(newUser)
  closeModalEdit()
})


btnGuardar.addEventListener('click', () => {
  const newUser = {
    nombre: inputName.value,
    apellido: inputApellido.value,
    email: inputEmail.value,
    edad: inputEdad.value,
    estado: estaPagado.value,
    saldo: 6000,
  }
  postUser(newUser);
  closeModal();
})
