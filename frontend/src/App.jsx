import { Navigate, Route,Routes } from "react-router-dom";

import SignUpPage from "./pages/auth/signup/signUpPage";
import LoginPage from "./pages/auth/login/loginPage";
import HomePage from "./pages/auth/home/homePage";
import Sidebar from "./components/common/sideBar";
import RightPanel from "./components/common/rightPanel";
import NotificationPage from "./pages/notifications/notificationPage";
import ProfilePage from "./pages/profile/profilePage";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/common/loadingSpinner";

function App() {
	const{ data:authUser,isLoading, error, isError}=useQuery({
	queryKey:["authUser"],
	queryFn:async()=>{
		try {
			const res=await fetch("/api/auth/me");
			const data=await res.json();
			if(data.error) return null;
			if(!res.ok){
				throw new error(data.error || "something went wrong");
			}
			return data;
		} catch (error) {
			throw new Error(error);
		}
	},
		retry:false,
	});

	if(isLoading){
		return (
			<div className="h-screen flex justify-center items-center">
				<LoadingSpinner size="lg"/> 

			</div>
		)
	}

	return (
		<div className='flex max-w-6xl mx-auto'>
			{/* common components */}
			{authUser &&<Sidebar/>}
			<Routes>
				<Route path='/' element={authUser? <HomePage /> :<Navigate to="/login"/>} />
				<Route path='/signup' element={!authUser? <SignUpPage />: <Navigate to="/"/>} />
				<Route path='/login' element={!authUser? <LoginPage /> : <Navigate to="/"/>} />
				<Route path='/notifications' element={authUser? <NotificationPage />:<Navigate to="/login"/>} />
				<Route path='/profile/:username' element={authUser?<ProfilePage />:<Navigate to="/login"/>} />

			</Routes>
			{authUser &&<RightPanel/>}
			<Toaster/>
		</div>
	);
}

export default App;