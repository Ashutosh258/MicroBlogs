import { Route,Routes } from "react-router-dom";

import SignUpPage from "./pages/auth/signup/signUpPage";
import LoginPage from "./pages/auth/login/loginPage";
import HomePage from "./pages/auth/home/homePage";
import Sidebar from "./components/common/sideBar";
import RightPanel from "./components/common/rightPanel";
import NotificationPage from "./pages/notifications/notificationPage";
import ProfilePage from "./pages/profile/profilePage";

function App() {
	return (
		<div className='flex max-w-6xl mx-auto'>
			{/* common components */}
			<Sidebar/>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/signup' element={<SignUpPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/notifications' element={<NotificationPage />} />
				<Route path='/profile/:username' element={<ProfilePage />} />

			</Routes>
			<RightPanel/>
		</div>
	);
}

export default App;