import {createSlice} from '@reduxjs/toolkit';
import { ToastContainer, toast } from 'react-toastify';
const getInitialtodo=()=>{
    const localTodolist=localStorage.getItem('todolist');
    if(localTodolist){
        return JSON.parse(localTodolist)
    }
    localStorage.setItem('todolist',JSON.stringify([]));
    return [];
}
const initialValue={
    todolist:getInitialtodo(),
    filter_button:false
}
export const todoSlice=createSlice({
    name:'todo',
    initialState:initialValue,
    reducers:{
        addtodo: (state, action) => {
            const newTodo = action.payload;
            const todoList = localStorage.getItem('todolist');
            if (todoList) {
                const todoArr = JSON.parse(todoList);
                // Check if the title already exists in the todoArr
                const titleExists = todoArr.some(todo => todo.title === newTodo.title);
                if (!titleExists) {
                    todoArr.push(newTodo);
                    localStorage.setItem('todolist', JSON.stringify(todoArr));
                    state.todolist.push(newTodo);
                    console.log(todoArr);
                    toast.success("Task Added")
                } else {
                    toast.warn('Todo with the same title already exists!');
                }
            } else {
                localStorage.setItem('todolist', JSON.stringify([newTodo]));
                state.todolist.push(newTodo);
            }
        },
        deletetodo:(state,action)=>{
            const todolist=localStorage.getItem('todolist')
            if(todolist){
                const todoArr=JSON.parse(todolist);
                todoArr.forEach((todo,ind)=>{
                    if(todo.id===action.payload){
                        todoArr.splice(ind,1)

                    }
                });
                localStorage.setItem('todolist',JSON.stringify(todoArr))
                state.todolist=todoArr

            }
        },
        updatetodo:(state,action)=>{
            const todolist=localStorage.getItem('todolist')
            if(todolist){
                const todoArr=JSON.parse(todolist)

                todoArr.forEach((todo,ind)=>{
                    if(todo.id===action.payload.id){
                        todo.title=action.payload.title2
                        todo.status=action.payload.status2
                        todo.time=action.payload.time
                    }

                })
                localStorage.setItem('todolist',JSON.stringify(todoArr))
                state.todolist=todoArr
                toast.success(" Todo Updated ")
            }

        },
        update_filter:(state,action)=>{
            state.filter_button=action.payload
        }
        
    },
})
export const {addtodo,deletetodo,updatetodo,update_filter}=todoSlice.actions;
export const todoslice= todoSlice.reducer;
export const counterSlice=createSlice({
    name:'counter',
    initialState:{count:0},
    reducers:{
        increment:(state,action)=>{
            state.count+=1
        },
        decrement:(state,action)=>{
            state.count-=1
        }

    }
})
export const {increment,decrement}=counterSlice.actions;
export const counterslice= counterSlice.reducer;
// export const userSlice=createSlice({
//     name:'userDetails',
//     initialState:{name:'',password:''},
//     reducers:{
//         setName:(state,action)=>{
//             state.name=action.payload
//         },
//         setId:(state,action)=>{
//             state.password=action.payload
//         }

//     }
// })