import Post from "./post";
import PostSkeleton from "../skeltons/postSkelton";  	
import {useQuery} from '@tanstack/react-query'
import { useEffect } from "react";

const Posts = ({feedType,username,userId}) => {

	const getPostEndPoint =() =>{
		switch (feedType){
			case "foryou":
				return "/api/post/foryou";
			case "following":
				return "api/post/following";
			case "liked":
				return `api/post/likes/${userId}`;
			case "posts":
				return `api/post/user/${username}`;
			default:
				return "api/post/foryou";
		}

	}; 

	const POST_ENDPOINT =getPostEndPoint();
	
	const {data:posts,isLoading,refetch,isRefetching} = useQuery({
		queryKey:["posts"],
		queryFn:async()=>{
			try {
				const res=await fetch(POST_ENDPOINT);
				const data=await res.json();

				if(!res.ok){
					throw new Error(data.error || "something went wrong");
				}
				return data; 
			} catch (error) {
				throw new Error(error);
			}
		}
	});

	useEffect(()=>{
		refetch();
	},[feedType,refetch,username])

	return (
		<>
			{(isLoading || isRefetching)&& (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{!isLoading && posts?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
			{!isLoading && posts && (
				<div>
					{posts.map((post) => (
						<Post key={post._id} post={post} />
					))}
				</div>
			)}
		</>
	);
};
export default Posts;