import { Route, Routes } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { AdminRoute, ModRoute, AuthorRoute } from "./ProtectedRoutes";

// pages
import SignUpModerator from "../pages/Authentication/SignUpModerator";
import SignUpAuthor from "../pages/Authentication/SignUpAuthor";
import SignIn from "../pages/Authentication/SignIn";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Events from "../pages/Events/Events";
import AddEvent from "../pages/Events/AddEvent";
import EventList from "../pages/Events/EventList";
import Event from "../pages/Events/Event";
import EditEvent from "../pages/Events/EditEvent";
import SubmissionList from "../pages/Submissions/SubmissionList";
import AuthorSubmissionList from "../pages/Submissions/AuthorSubmissionList";
import ModSubmissionList from "../pages/Submissions/ModSubmissionList";
import AddSubmissions from "../pages/Submissions/AddSubmissions";
import GradeSubmissions from "../pages/Submissions/GradeSubmissions";
import ModeratorsList from "../pages/Moderators/ModeratorsList";
import NewsList from "../pages/News/NewsList";
import NewsAdd from "../pages/News/NewsAdd";
import NewsDetail from "../pages/News/NewsDetail";
import Settings from "../pages/Settings";

import Goals from "../pages/About/Goals";
import Activities from "../pages/About/Activities";
import Staff from "../pages/About/Staff";
import Contacts from "../pages/Contacts";

// Routes configuration
export const routesConfig = [
	{ path: "/", title: "Home", element: <Home /> },
	{ path: "/events", title: "Events", element: <Events /> },
	{ path: "/events/:eventId", title: "Events", element: <Event /> },
	{ path: "/events-dashboard/add-event", title: "Add New Event", element: <AddEvent /> },
	{ path: "/events-dashboard/event-list", title: "Event List", element: <EventList /> },
	{ path: "/events-dashboard/edit-event/:eventId", title: "Edit Event", element: <EditEvent /> },
	{
		path: "/submission-list",
		title: "Submission List",
		element: <SubmissionList />,
		// role: "admin",
	},
	{
		path: "/author-submission-list",
		title: "Author Submission List",
		element: <AuthorSubmissionList />,
		// role: "author",
	},
	{
		path: "/mod-submission-list",
		title: "Mod Submission List",
		element: <ModSubmissionList />,
		// role: "mod",
	},
	{
		path: "/submissions/add-submission",
		title: "Add Submission",
		element: <AddSubmissions />,
		// role: "author",
	},
	{
		path: "/submissions/:subId/grade",
		title: "Grade Submission",
		element: <GradeSubmissions />,
		// role: "admin",
	},
	{
		path: "/events/:eventId/add-submission",
		title: "Add Submission",
		// element: <AddSubmissions />,
	},
	{
		path: "/moderators/moderator-list",
		title: "Moderators List",
		element: <ModeratorsList />,
		// role: "admin",
	},
	{ path: "/news/news-list", title: "News List", element: <NewsList /> },
	{ path: "/news/add-news", title: "Add News", element: <NewsAdd /> },
	{ path: "/news/:id", title: "News", element: <NewsDetail /> },
	{ path: "/profile", title: "Profile", element: <Profile /> },
	{ path: "/settings", title: "Settings", element: <Settings /> },
	{ path: "/auth/signin", title: "Signin", element: <SignIn /> },
	{
		path: "/auth/signup/mod",
		title: "Signup Moderator",
		element: <SignUpModerator />,
	},
	{ path: "/auth/signup/author", title: "Signup Author", element: <SignUpAuthor /> },
	{ path: "/about/goals", title: "Goals", element: <Goals /> },
	{ path: "/about/activities", title: "Activities", element: <Activities/> },
	{ path: "/about/staff", title: "Staff", element: <Staff /> },
	{ path: "/contacts", title: "Contacts", element: <Contacts/> },
];

// Routes component
const AppRoutes = () => (
	<Routes>
		{routesConfig.map(({ path, title, element, role }) => {
			const wrappedElement = (
				<>
					<PageTitle title={title} />
					{element}
				</>
			);

			if (role === "admin") {
				return (
					<Route
						key={path}
						path={path}
						element={<AdminRoute>{wrappedElement}</AdminRoute>}
					/>
				);
			}
			if (role === "mod") {
				return (
					<Route key={path} path={path} element={<ModRoute>{wrappedElement}</ModRoute>} />
				);
			}
			if (role === "author") {
				return (
					<Route
						key={path}
						path={path}
						element={<AuthorRoute>{wrappedElement}</AuthorRoute>}
					/>
				);
			}
			return <Route key={path} path={path} element={wrappedElement} />;
		})}
	</Routes>
);

export default AppRoutes;
