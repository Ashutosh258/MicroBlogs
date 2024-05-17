import {useMutation,useQueryClient} from '@tanstack/react-query';
import toast from 'react-hot-toast';


const UseFollow = () => {

  const queryClient = useQueryClient();

  const {mutate:follow,isPending} =useMutation({
    mutationFn:async(userId) =>{
      try {
        const res=await fetch(`/api/user/follow/${userId}`,{
          method:'POST',
        })
        const data =await res.json();
        if(!res.ok){
          throw new Error(data.error || "something went wrong");
           
        }
        return
      } catch (error) {
        throw new Error(error.message);
      }
      
    },
    onSuccess:()=>{
      Promise.all([
        queryClient.invalidateQueries({queryKey:["suggestedUsers"]}),
        queryClient.invalidateQueries({queryKey:["authUser"]})
      ])
    },
    onError:()=>{
      toast.error(error.message)
    }

  })

  return{follow,isPending};
}

export default UseFollow;