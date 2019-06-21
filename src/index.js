import React, {useContext, useReducer, useState, useEffect} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import TodosContext from './context';
import todosReducer from './reducer';
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

const useAPI = endpoint => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  },[data]);

  const getData = async () => {
    const response = await axios.get(endpoint);
    setData(response.data);
  };

  return data;
};

const App = () => {
  const initialState = useContext(TodosContext);
  const [state, dispatch] = useReducer(todosReducer, initialState);
  const saveTodos = useAPI('https://react-hooks-todos-bgzgc5m5p.now.sh/todos');

  useEffect(() => {
    dispatch({type: 'GET_TODOS', payload: saveTodos})
  },[saveTodos]);

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