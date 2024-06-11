import { Route, Routes } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { AdminRoute, ModRoute, AuthorRoute } from "./ProtectedRoutes";

// pages
import SignUpModerator from "../pages/Authentication/SignUpModerator";
import SignUpAuthor from "../pages/Authentication/SignUpAuthor";
import Login from "../pages/Authentication/Login";
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
	{ path: "/", title: "Главная", element: <Home /> },
	{ path: "/events", title: "Мероприятия", element: <Events /> },
	{ path: "/events/:eventId", title: "Мероприятие", element: <Event /> },
	{
		path: "/events-dashboard/add-event",
		title: "Добавить новое мероприятие",
		element: <AddEvent />,
	},
	{
		path: "/events-dashboard/edit-event/:id",
		title: "Редактировать мероприятие",
		element: <EditEvent />,
	},
	{ path: "/events-dashboard/event-list", title: "Список Мероприятий", element: <EventList /> },
	{
		path: "/events-dashboard/edit-event/:eventId",
		title: "Редактировать мероприятие",
		element: <EditEvent />,
	},
	{
		path: "/submission-list",
		title: "Список подачи",
		element: <SubmissionList />,
		// role: "admin",
	},
	{
		path: "/author-submission-list",
		title: "Список подачи автора",
		element: <AuthorSubmissionList />,
		// role: "author",
	},
	{
		path: "/mod-submission-list",
		title: "Список подачи модератора",
		element: <ModSubmissionList />,
		// role: "mod",
	},
	{
		path: "/events/:id/add-submission",
		title: "Загрузить статью",
		element: <AddSubmissions />,
		// role: "author",
	},
	{
		path: "/submissions/:subId/grade",
		title: "Оценить статью",
		element: <GradeSubmissions />,
		// role: "admin",
	},
	{
		path: "/moderators/moderator-list",
		title: "Список модераторов",
		element: <ModeratorsList />,
		// role: "admin",
	},
	{ path: "/news/news-list", title: "Список новостей", element: <NewsList /> },
	{ path: "/news/add-news", title: "Добавить новость", element: <NewsAdd /> },
	{ path: "/news/:id", title: "Новость", element: <NewsDetail /> },
	{ path: "/profile", title: "Профиль", element: <Profile /> },
	{ path: "/settings", title: "Настройки", element: <Settings /> },
	{ path: "/auth/login", title: "Вход", element: <Login /> },
	{
		path: "/auth/signup/mod",
		title: "Регистрация модератора",
		element: <SignUpModerator />,
	},
	{ path: "/auth/signup/author", title: "Регистрация автора", element: <SignUpAuthor /> },
	{ path: "/about/goals", title: "Цели", element: <Goals /> },
	{ path: "/about/activities", title: "Деятельность", element: <Activities /> },
	{ path: "/about/staff", title: "Команда", element: <Staff /> },
	{ path: "/contacts", title: "Контакты", element: <Contacts /> },
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
