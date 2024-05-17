import { QueryClient, useMutation } from "@tanstack/react-query";




const useUpdateUserProfile = () =>{
    const queryClient=new QueryClient();

    const {mutateAsync:updateProfile,isPending:isUpdatingProfile}=useMutation({
		mutationFn:async(formData)=>{
			try {
				const res=await fetch("/api/user/update",{
					method:"POST",
					headers:{
						"Content-Type":"application/json"
					},
					body:JSON.stringify(formData),
				})
				const data=await res.json();
  
				if(!res.ok){ 
					throw new Error(data.error || "something went wrong");
				}
				return data; 
			} catch (error) {
				throw new Error(error);
			}
		},
		onSuccess:()=>{
		   toast.success("profile updated successfully")
		   
			Promise.all([
				queryClient.invalidateQueries({queryKey:"authUser"}),
				queryClient.invalidateQueries({queryKey:"userProfile"}),
			])
		},
		onError:(error)=>{
			toast.error(error.message);
		} 
	})
    return {updateProfile,isUpdatingProfile}
}

export default useUpdateUserProfile