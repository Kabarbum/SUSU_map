import React from "react";
import {Route, Routes} from "react-router-dom";
import {MainPage} from "pages/MainPage";
import {AuthPage} from "pages/AuthPage";

const routes = [
	{path: "", exact: true, element: <MainPage/>},
	{path: "/admin", exact: true, element: <AuthPage/>},
];

const AppRouter = () => {
	return (
		<Routes>
			{routes.map((route) => (
				<Route
					path={route.path}
					element={route.element}
					exact={route.exact}
					key={route.path}
				/>
			))}
			<Route path="*" element={<MainPage/>}/>
		</Routes>
	);
};

export default AppRouter;
