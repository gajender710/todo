import { Todo } from "@/models/todo-model";

 const getTodos = async (userId:number) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos?userId=${userId}`
      );
      const data: Todo[] = await response.json();
      return {success:true,data:data,error:null}
     
    } catch (error: any) {
      console.error(error, "error in fetch Todo");
      return {success:false,data:null,error:error}
    }
  };



  export const todoService = {
    getTodos,
  }