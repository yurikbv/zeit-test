import uuidv4 from 'uuid/v4';

export default function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_TODO':
      const toggledTodos = state.todos.map(t =>
          t.id === action.payload.id ? {...action.payload, complete: !action.payload.complete} : t);
      return {
        ...state,
        todos: toggledTodos
      };
    case 'REMOVE_TODO':
      const filteredTodos = state.todos.filter(t => t.id !== action.payload.id);
      const isRemovedTodo = state.currentTodo.id === action.payload.id ? {} : state.currentTodo;
      return {
        ...state,
        todos: filteredTodos,
        currentTodo: isRemovedTodo
      };
    case 'ADD_TODO':
      if (!action.payload) {
        return state;
      }
      if (state.todos.findIndex(todo => todo.text === action.payload) > -1) {
        return state;
      }
      const newTodo = {
        id: uuidv4(),
        text: action.payload,
        complete: false
      };
      return {
        ...state,
        todos: [...state.todos, newTodo]
      };
    case 'SET_CURRENT_TODO':
      return {
        ...state,
        currentTodo: action.payload
      };
    case 'UPDATE_TODO':
      if (!action.payload) {
        return state;
      }
      if (state.todos.findIndex(todo => todo.text === action.payload) > -1) {
        return state;
      }
      const updatedTodo = {...state.currentTodo, text: action.payload};
      const index = state.todos.findIndex(todo => todo.id === updatedTodo.id);
      const updatedTodos = [...state.todos.slice(0,index),
        updatedTodo,
        ...state.todos.slice(index + 1)];
      return  {
        ...state,
        currentTodo: {},
        todos: updatedTodos
      };
    default:
      return state;
  }
}