export default function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_TODO':
      const toggledTodos = state.todos.map(t =>
          t.id === action.payload.id ? action.payload : t);
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
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case 'SET_CURRENT_TODO':
      return {
        ...state,
        currentTodo: action.payload
      };
    case 'UPDATE_TODO':

      const updatedTodo = action.payload;
      const index = state.todos.findIndex(todo => todo.id === updatedTodo.id);
      const updatedTodos = [...state.todos.slice(0,index),
        updatedTodo,
        ...state.todos.slice(index + 1)];
      return  {
        ...state,
        currentTodo: {},
        todos: updatedTodos
      };
    case 'GET_TODOS':
      return {
        ...state,
        todos: action.payload
      };
    default:
      return state;
  }
}