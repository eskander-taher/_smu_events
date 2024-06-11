import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// import UserOne from "../../images/user/"
import useAuth from "../../hooks/useAuth";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { CiLogout, CiSettings } from "react-icons/ci";

const DropdownUser = () => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const { user, logoutUser } = useAuth();

	const trigger = useRef(null);
	const dropdown = useRef(null);

	// close on click outside
	useEffect(() => {
		const clickHandler = ({ target }) => {
			if (!dropdown.current) return;
			if (
				!dropdownOpen ||
				dropdown.current.contains(target) ||
				trigger.current.contains(target)
			)
				return;
			setDropdownOpen(false);
		};
		document.addEventListener("click", clickHandler);
		return () => document.removeEventListener("click", clickHandler);
	});

	// close if the esc key is pressed
	useEffect(() => {
		const keyHandler = ({ keyCode }) => {
			if (!dropdownOpen || keyCode !== 27) return;
			setDropdownOpen(false);
		};
		document.addEventListener("keydown", keyHandler);
		return () => document.removeEventListener("keydown", keyHandler);
	});

	return (
		<div className="relative">
			<Link
				ref={trigger}
				onClick={() => setDropdownOpen(!dropdownOpen)}
				className="flex items-center gap-4"
				to="#"
			>
				<span className="hidden text-right lg:block">
					<span className="block text-sm font-medium text-black dark:text-white">
						{user?.fullName}
					</span>
				</span>

				<span className="h-12 w-12 rounded-full block text-right lg:hidden">
					<CgProfile className="h-12 w-12" />
				</span>
				<IoIosArrowDown className="hidden fill-current sm:block" />
			</Link>

			{/* <!-- Dropdown Start --> */}
			<div
				ref={dropdown}
				onFocus={() => setDropdownOpen(true)}
				onBlur={() => setDropdownOpen(false)}
				className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
					dropdownOpen === true ? "block" : "hidden"
				}`}
			>
				<ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
					<li>
						<Link
							to="/profile"
							className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
						>
							<IoPersonOutline />
							Профиль
						</Link>
					</li>

					<li>
						<Link
							to="/settings"
							className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
						>
							<CiSettings />
							Настройки
						</Link>
					</li>
				</ul>
				<button
					onClick={logoutUser}
					className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
				>
					<CiLogout />
					Выйти
				</button>
			</div>
			{/* <!-- Dropdown End --> */}
		</div>
	);
};

export default DropdownUser;
