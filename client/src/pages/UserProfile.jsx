import DefaultLayout from "../layout/DefaultLayout";
import CoverOne from "../images/cover/cover-01.png";
import userSix from "../images/user/user-06.png";
import { CiCamera } from "react-icons/ci";
import Title from "../components/Title";
import { useParams } from "react-router-dom";
import useGetUser from "../api/auth/useGetUser";

const UserProfile = () => {
	const { id } = useParams();
	const { data, isSuccess } = useGetUser(id);

	let user = isSuccess ? data.data.data : {};

	return (
		<DefaultLayout>
			<Title>Профиль</Title>

			<div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
				<div className="relative z-20 h-35 md:h-65">
					<img
						src={CoverOne}
						alt="UserProfile cover"
						className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
					/>
				</div>
				<div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
					<div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
						<div className="relative drop-shadow-2">
							<img src={userSix} alt="UserProfile" />
						</div>
					</div>
					<div className="mt-4">
						<h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
							{user?.fullName}
						</h3>
						<p className="font-medium">{user?.role}</p>
						<div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
							<div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
								<span className="font-semibold text-black dark:text-white">0</span>
								<span className="text-sm">Мероприятия</span>
							</div>
							<div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
								<span className="font-semibold text-black dark:text-white">0</span>
								<span className="text-sm">Заявки</span>
							</div>
							<div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
								<span className="font-semibold text-black dark:text-white">
									{user.xp}
								</span>
								<span className="text-sm">XP</span>
							</div>
						</div>

						{user?.bio && (
							<div className="mx-auto max-w-180">
								<h4 className="font-semibold text-black dark:text-white">Био</h4>
								<p className="mt-4.5">{user.bio}</p>
							</div>
						)}

						<div className="mt-6.5">
							<h4 className="mb-3.5 font-medium text-black dark:text-white">
								Контакты
							</h4>
							<div className="flex items-center justify-center gap-3.5">
								{user?.email}
							</div>
						</div>
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
};

export default UserProfile;
