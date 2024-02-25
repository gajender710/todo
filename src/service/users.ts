 const getUsers = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data: { id: number;
        name: string}[] = await response.json();
      return {success:true,data:data,error:null}
     
    } catch (error: any) {
      console.error(error, "error in fetch Users");
      return {success:false,data:null,error:error}
    }
  };



  export const userService = {
    getUsers,
  }