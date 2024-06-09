import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { FaRegNewspaper } from "react-icons/fa";
import { BsArrowLeft, BsCalendar3Event } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { SlDocs } from "react-icons/sl";
import { LuUserCheck } from "react-icons/lu";
import { IoPersonOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import SMU_LOGO from "../../images/assets/logo_dark_mode.png";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
	const location = useLocation();
	const { pathname } = location;

	const trigger = useRef(null);
	const sidebar = useRef(null);

	const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
	const [sidebarExpanded, setSidebarExpanded] = useState(
		storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
	);

	// Закрыть при клике снаружи
	useEffect(() => {
		const clickHandler = ({ target }) => {
			if (!sidebar.current || !trigger.current) return;
			if (
				!sidebarOpen ||
				sidebar.current.contains(target) ||
				trigger.current.contains(target)
			)
				return;
			setSidebarOpen(false);
		};
		document.addEventListener("click", clickHandler);
		return () => document.removeEventListener("click", clickHandler);
	}, [sidebarOpen]);

	// Закрыть при нажатии клавиши esc
	useEffect(() => {
		const keyHandler = ({ keyCode }) => {
			if (!sidebarOpen || keyCode !== 27) return;
			setSidebarOpen(false);
		};
		document.addEventListener("keydown", keyHandler);
		return () => document.removeEventListener("keydown", keyHandler);
	}, [sidebarOpen]);

	useEffect(() => {
		localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
		if (sidebarExpanded) {
			document.querySelector("body")?.classList.add("sidebar-expanded");
		} else {
			document.querySelector("body")?.classList.remove("sidebar-expanded");
		}
	}, [sidebarExpanded]);

	const renderLink = (to, icon, text, condition, key) => (
		<li key={key}>
			<NavLink
				to={to}
				className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
					condition && "bg-graydark dark:bg-meta-4"
				}`}
			>
				{icon}
				{text}
			</NavLink>
		</li>
	);

	const renderSidebarLinkGroup = (path, icon, text, links) => (
		<SidebarLinkGroup key={path} activeCondition={pathname === path || pathname.includes(path)}>
			{(handleClick, open) => (
				<>
					<NavLink
						to="#"
						className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
							(pathname === path || pathname.includes(path)) &&
							"bg-graydark dark:bg-meta-4"
						}`}
						onClick={(e) => {
							e.preventDefault();
							sidebarExpanded ? handleClick() : setSidebarExpanded(true);
						}}
					>
						{icon}
						{text}
						<IoIosArrowDown
							className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
								open && "rotate-180"
							}`}
						/>
					</NavLink>
					<div className={`translate transform overflow-hidden ${!open && "hidden"}`}>
						<ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">{links}</ul>
					</div>
				</>
			)}
		</SidebarLinkGroup>
	);

	return (
		<aside
			ref={sidebar}
			className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
				sidebarOpen ? "translate-x-0" : "-translate-x-full"
			}`}
		>
			<div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
				<NavLink to="/">
					<img src={SMU_LOGO} alt="Logo" />
				</NavLink>
				<button
					ref={trigger}
					onClick={() => setSidebarOpen(!sidebarOpen)}
					aria-controls="sidebar"
					aria-expanded={sidebarOpen}
					className="block lg:hidden"
				>
					<BsArrowLeft />
				</button>
			</div>

			<div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
				<nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
					<div>
						<h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">МЕНЮ</h3>
						<ul className="mb-6 flex flex-col gap-1.5">
							{renderLink(
								"/",
								<IoPersonOutline />,
								"Главная",
								pathname === "/",
								"home"
							)}
							{renderLink(
								"/events",
								<BsCalendar3Event />,
								"Мероприятия",
								pathname === "/events",
								"events"
							)}
							{renderSidebarLinkGroup("/about", <IoPersonOutline />, "О СМУ", [
								renderLink(
									"/about/goals",
									null,
									"Цели и задачи",
									pathname.includes("/about/goals"),
									"goals-and-objectives"
								),
								renderLink(
									"/about/activities",
									null,
									"Основные направления деятельности",
									pathname.includes("/about/activities"),
									"activities"
								),
								renderLink(
									"/about/staff",
									null,
									"Состав совета",
									pathname.includes("/about/staff"),
									"staff"
								),
							])}
							{renderLink(
								"/contacts",
								<CiSettings />,
								"Контакты",
								pathname.includes("Contacts"),
								"Contacts"
							)}
						</ul>
					</div>
					<div>
						<h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">ПРОФИЛЬ</h3>
						<ul className="mb-6 flex flex-col gap-1.5">
							{renderSidebarLinkGroup(
								"/events-dashboard",
								<BsCalendar3Event />,
								"Мероприятия",
								[
									renderLink(
										"/events-dashboard/event-list",
										null,
										"Список Мероприятия",
										pathname.includes("/events-dashboard/event-list"),
										"event-list"
									),
									renderLink(
										"/events-dashboard/add-event",
										null,
										"Добавить мероприятия",
										pathname.includes("/events-dashboard/add-event"),
										"add-event"
									),
								]
							)}

							{renderLink(
								"/submission-list",
								<SlDocs />,
								"Предложения",
								pathname.includes("submission-list"),
								"submission-list"
							)}

							{renderLink(
								"/author-submission-list",
								<SlDocs />,
								"Предложения автора",
								pathname.includes("author-submission-list"),
								"author-submission-list"
							)}

							{renderLink(
								"/mod-submission-list",
								<SlDocs />,
								"Предложения модератора",
								pathname.includes("mod-submission-list"),
								"mod-submission-list"
							)}

							{renderSidebarLinkGroup("/moderators", <LuUserCheck />, "Модераторы", [
								renderLink(
									"/moderators/moderator-list",
									null,
									"Список модераторов",
									pathname.includes("/moderators/moderator-list"),
									"moderator-list"
								),
							])}

							{renderSidebarLinkGroup("/news", <FaRegNewspaper />, "Новости", [
								renderLink(
									"/news/news-list",
									null,
									"Список новостей",
									pathname.includes("/news/news-list"),
									"news-list"
								),
								renderLink(
									"/news/add-news",
									null,
									"Добавить новость",
									pathname.includes("/news/add-news"),
									"add-news"
								),
							])}
							{renderLink(
								"/settings",
								<CiSettings />,
								"Настройки",
								pathname.includes("settings"),
								"settings"
							)}
						</ul>
					</div>
				</nav>
			</div>
		</aside>
	);
};

export default Sidebar;
