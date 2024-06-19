import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaRegNewspaper } from "react-icons/fa";
import { BsArrowLeft, BsCalendar3Event } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { SlDocs } from "react-icons/sl";
import { LuUserCheck } from "react-icons/lu";
import { IoPersonOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import SMU_LOGO from "../../images/assets/logo_dark_mode.png";

import useAuth from "../../hooks/useAuth";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const SidebarLinkGroup = ({ children, activeCondition }) => {
	const [open, setOpen] = useState(activeCondition);

	const handleClick = () => {
		setOpen(!open);
	};

	return <>{children(handleClick, open)}</>;
};

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
	const location = useLocation();
	const { pathname } = location;

	const trigger = useRef(null);
	const sidebar = useRef(null);

	const { user } = useAuth();

	const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
	const [sidebarExpanded, setSidebarExpanded] = useState(
		storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
	);

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
							<li>
								<NavLink
									to="/"
									className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
										pathname === "/" && "bg-graydark dark:bg-meta-4"
									}`}
								>
									<IoPersonOutline />
									Главная
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/events"
									className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
										pathname === "/events" && "bg-graydark dark:bg-meta-4"
									}`}
								>
									<BsCalendar3Event />
									Мероприятия
								</NavLink>
							</li>
							<SidebarLinkGroup
								activeCondition={
									pathname === "/about" || pathname.includes("/about")
								}
							>
								{(handleClick, open) => (
									<>
										<div
											className="relative flex items-center gap-2.5 px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out cursor-pointer hover:bg-graydark dark:hover:bg-meta-4"
											onClick={() =>
												sidebarExpanded
													? handleClick()
													: setSidebarExpanded(true)
											}
										>
											<AiOutlineExclamationCircle />
											О СМУ
											<IoIosArrowDown
												className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
													open && "rotate-180"
												}`}
											/>
										</div>
										<div
											className={`translate transform overflow-hidden ${
												!open && "hidden"
											}`}
										>
											<ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
												<li>
													<NavLink
														to="/about/goals"
														className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
															pathname.includes("/about/goals") &&
															"bg-graydark dark:bg-meta-4"
														}`}
													>
														Цели и задачи
													</NavLink>
												</li>
												<li>
													<NavLink
														to="/about/activities"
														className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
															pathname.includes(
																"/about/activities"
															) && "bg-graydark dark:bg-meta-4"
														}`}
													>
														Основные направления деятельности
													</NavLink>
												</li>
												<li>
													<NavLink
														to="/about/staff"
														className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
															pathname.includes("/about/staff") &&
															"bg-graydark dark:bg-meta-4"
														}`}
													>
														Состав совета
													</NavLink>
												</li>
											</ul>
										</div>
									</>
								)}
							</SidebarLinkGroup>
							<li>
								<NavLink
									to="/contacts"
									className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
										pathname.includes("/contacts") &&
										"bg-graydark dark:bg-meta-4"
									}`}
								>
									<CiSettings />
									Контакты
								</NavLink>
							</li>
						</ul>
					</div>
					{user && (
						<div>
							<h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
								Панель приборов: {user.role}
							</h3>

							<ul className="mb-6 flex flex-col gap-1.5">
								<li>
									<NavLink
										to="/profile"
										className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
											pathname.includes("profile") &&
											"bg-graydark dark:bg-meta-4"
										}`}
									>
										<IoPersonOutline />
										Профиль
									</NavLink>
								</li>

								{user.role === "админ" && (
									<SidebarLinkGroup
										activeCondition={
											pathname === "/events-dashboard" ||
											pathname.includes("/events-dashboard")
										}
									>
										{(handleClick, open) => (
											<>
												<div
													className="relative flex items-center gap-2.5 px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out cursor-pointer hover:bg-graydark dark:hover:bg-meta-4"
													onClick={() =>
														sidebarExpanded
															? handleClick()
															: setSidebarExpanded(true)
													}
												>
													<BsCalendar3Event />
													Мероприятия
													<IoIosArrowDown
														className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
															open && "rotate-180"
														}`}
													/>
												</div>
												<div
													className={`translate transform overflow-hidden ${
														!open && "hidden"
													}`}
												>
													<ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
														<li>
															<NavLink
																to="/events-dashboard/event-list"
																className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
																	pathname.includes(
																		"/events-dashboard/event-list"
																	) &&
																	"bg-graydark dark:bg-meta-4"
																}`}
															>
																Список мероприятия
															</NavLink>
														</li>
														<li>
															<NavLink
																to="/events-dashboard/add-event"
																className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
																	pathname.includes(
																		"/events-dashboard/add-event"
																	) &&
																	"bg-graydark dark:bg-meta-4"
																}`}
															>
																Добавить мероприятия
															</NavLink>
														</li>
													</ul>
												</div>
											</>
										)}
									</SidebarLinkGroup>
								)}

								{user.role === "админ" && (
									<li>
										<NavLink
											to="/submission-list"
											className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
												pathname.includes("submission-list") &&
												"bg-graydark dark:bg-meta-4"
											}`}
										>
											<SlDocs />
											Статьи
										</NavLink>
									</li>
								)}

								{user.role === "автор" && (
									<li>
										<NavLink
											to="/author-submission-list"
											className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
												pathname.includes("author-submission-list") &&
												"bg-graydark dark:bg-meta-4"
											}`}
										>
											<SlDocs />
											Статьи
										</NavLink>
									</li>
								)}

								{user.role === "модератор" && (
									<li>
										<NavLink
											to="/mod-submission-list"
											className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
												pathname.includes("mod-submission-list") &&
												"bg-graydark dark:bg-meta-4"
											}`}
										>
											<SlDocs />
											Статьи
										</NavLink>
									</li>
								)}

								{user.role === "админ" && (
									<SidebarLinkGroup
										activeCondition={
											pathname === "/users" ||
											pathname.includes("/users")
										}
									>
										{(handleClick, open) => (
											<>
												<div
													className="relative flex items-center gap-2.5 px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out cursor-pointer hover:bg-graydark dark:hover:bg-meta-4"
													onClick={() =>
														sidebarExpanded
															? handleClick()
															: setSidebarExpanded(true)
													}
												>
													<LuUserCheck />
													Пользователи
													<IoIosArrowDown
														className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
															open && "rotate-180"
														}`}
													/>
												</div>
												<div
													className={`translate transform overflow-hidden ${
														!open && "hidden"
													}`}
												>
													<ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
														<li>
															<NavLink
																to="/users/moderator-list"
																className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
																	pathname.includes(
																		"/users/moderator-list"
																	) &&
																	"bg-graydark dark:bg-meta-4"
																}`}
															>
																Список модераторов
															</NavLink>
														</li>
														<li>
															<NavLink
																to="/users/author-list"
																className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
																	pathname.includes(
																		"/users/author-list"
																	) &&
																	"bg-graydark dark:bg-meta-4"
																}`}
															>
																Список авторов
															</NavLink>
														</li>
													</ul>
												</div>
											</>
										)}
									</SidebarLinkGroup>
								)}

								{user.role === "админ" && (
									<SidebarLinkGroup
										activeCondition={
											pathname === "/news" || pathname.includes("/news")
										}
									>
										{(handleClick, open) => (
											<>
												<div
													className="relative flex items-center gap-2.5 px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out cursor-pointer hover:bg-graydark dark:hover:bg-meta-4"
													onClick={() =>
														sidebarExpanded
															? handleClick()
															: setSidebarExpanded(true)
													}
												>
													<FaRegNewspaper />
													Новости
													<IoIosArrowDown
														className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
															open && "rotate-180"
														}`}
													/>
												</div>
												<div
													className={`translate transform overflow-hidden ${
														!open && "hidden"
													}`}
												>
													<ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
														<li>
															<NavLink
																to="/news/news-list"
																className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
																	pathname.includes(
																		"/news/news-list"
																	) &&
																	"bg-graydark dark:bg-meta-4"
																}`}
															>
																Список новостей
															</NavLink>
														</li>
														<li>
															<NavLink
																to="/news/add-news"
																className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
																	pathname.includes(
																		"/news/add-news"
																	) &&
																	"bg-graydark dark:bg-meta-4"
																}`}
															>
																Добавить новость
															</NavLink>
														</li>
													</ul>
												</div>
											</>
										)}
									</SidebarLinkGroup>
								)}

								<li>
									<NavLink
										to="/settings"
										className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
											pathname.includes("settings") &&
											"bg-graydark dark:bg-meta-4"
										}`}
									>
										<CiSettings />
										Настройки
									</NavLink>
								</li>
							</ul>
						</div>
					)}
				</nav>
			</div>
		</aside>
	);
};

export default Sidebar;
