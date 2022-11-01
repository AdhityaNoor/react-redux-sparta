// const init = {
//     items: [{id: 0,title: '',description: ''}],
// };

const init = {
    items: []
};

//actions
const ADD_ITEM = 'todo-list/todos/ADD_ITEM';

const DELETE_ITEM = 'todo-list/todos/DELETE_ITEM';

// const UPDATE_ITEM = 'todo-list/todos/UPDATE_ITEM';

export const addItem = toDoItem => ({type: ADD_ITEM, payload: toDoItem});

export const deleteItem = toDoItem => ({type: DELETE_ITEM, payload: toDoItem});

const todoReducer = (state=init, action) => {
    switch (action.type) {
        case ADD_ITEM:
            return {
                items: [...state.items, action.payload]
            };
        case DELETE_ITEM:
            return {
                items: [...state.items.filter(item => item.id !== action.payload)]
            };
        default:
            return state;
    }
}

export default todoReducer;