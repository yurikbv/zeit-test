import React, {useContext} from 'react';
import axios from 'axios';
import TodosContext from "../context";

const TodoList = () => {

  const {state, dispatch} = useContext(TodosContext);
  const title = state.todos.length > 0 ? `${state.todos.length} Todos` : "Nothing To Do";

  return (
      <div className="container mx-auto max-w-md text-center font-mono">
        <h1 className="text-bold">{title}</h1>
        <ul className="list-reset text-white p-0">
          {state.todos.map(todo => (
              <li key={todo.id}
                  className="bg-orange-600 border-black border-dashed border-2 my-2 py-4 flex items-center">
                <span
                    className={`cursor-pointer flex-1 ml-12 ${todo.complete && 'line-through text-gray-900'}`}
                    onDoubleClick={async () => {
                      const response = await axios.patch(`https://react-hooks-todos-bgzgc5m5p.now.sh/todos/${todo.id}`, {
                        complete: !todo.complete
                      });
                      dispatch({type: 'TOGGLE_TODO', payload: response.data});
                    }}
                >{todo.text}</span>
                <button
                    onClick={() => dispatch({type: 'SET_CURRENT_TODO', payload: todo})}
                >
                  <img src="https://icon.now.sh/edit/0050c5" alt="Edit Icon" className="h6"/>
                </button>
                <button
                    onClick={async () => {
                      await axios.delete(`https://react-hooks-todos-bgzgc5m5p.now.sh/todos/${todo.id}`);
                      dispatch({type: 'REMOVE_TODO', payload: todo});
                    }}
                >
                  <img src="https://icon.now.sh/delete/8b0000" alt="Delete Icon" className="h6"/>
                </button>
              </li>
          ))}
        </ul>
      </div>
  );
};

export default TodoList;