import React, {useContext, useReducer} from 'react';
import ReactDOM from 'react-dom';
import TodosContext from './context';
import todosReducer from './reducer';
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

const App = () => {
  const initialState = useContext(TodosContext);
  const [state, dispatch] = useReducer(todosReducer, initialState);
  return (
      <TodosContext.Provider value={{state, dispatch}}>
        <TodoForm/>
        <TodoList/>
      </TodosContext.Provider>
  )
};

ReactDOM.render(
      <App/>
    , document.getElementById('root'));

// import App from './App';
// export const UserContext = React.createContext();
// const userName = 'Georg';

/*ReactDOM.render(
    <UserContext.Provider value={userName}>
      <App/>
    </UserContext.Provider>
    , document.getElementById('root'));*/