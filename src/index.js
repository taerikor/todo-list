import { createStore } from 'redux';

const form = document.getElementById('js-form')
const input = document.getElementById('js-input')
const ul = document.querySelector('ul')


const TODO_CREATE = 'TODO_CREATE'
const TODO_DELETE = 'TODO_DELETE'

const reducer = (state=[] , action) => {
  switch (action.type){
    case TODO_CREATE :
      return [...state, { text: action.text, id: Date.now() }];
    case TODO_DELETE :
      return state.filter(toDo => toDo.id !== action.id);
    default:
      return state;
  }
}  
const store = createStore(reducer);

const addToDo = (text) => {
  return{
  type:TODO_CREATE,
  text
  }
}
const deleteToDo = (id) => {
  return {
    type:TODO_DELETE,
    id
  }
}

const dispatchAddTodo = (text) => {
  store.dispatch(addToDo(text))
}
const dispatchDeleteTodo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id))

}


const paintTodos = () => {
  const toDos = store.getState();
  ul.innerHTML='';
  toDos.forEach(toDo =>{
    const li = document.createElement('li');
    const button = document.createElement('button')
    button.addEventListener('click',dispatchDeleteTodo);
    li.id = toDo.id
    li.innerText = toDo.text;
    button.innerText = 'X'
    ul.appendChild(li);
    li.appendChild(button);

  })
}

store.subscribe(paintTodos);

const handleSubmit = (e) => {
  e.preventDefault();
  const todo = input.value;
  input.value = '';
  dispatchAddTodo(todo);

}

form.addEventListener('submit',handleSubmit);