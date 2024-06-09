import { Link } from "react-router-dom";
import AuthIllestration from "./AuthIllestration";
import AuthorSignupForm from "./AuthorSignupForm";
import DefaultLayout from "../../layout/DefaultLayout";

const SignUpAuthor = () => {
	return (
		<DefaultLayout>
			<div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
				<div className="flex flex-wrap">
					<div className="hidden w-full xl:block xl:w-1/2 ">
						<div className="py-17.5 px-26 text-center">
							<Link className="mb-5.5 inline-block" to="/">
								<h1 className="text-2xl font-bold">Совет Молодых Ученых</h1>
							</Link>
							<p className="2xl:px-20">Начните свой научный путь.</p>

							<span className="mt-15 inline-block">
								<AuthIllestration width="350" height="350" />
							</span>
						</div>
					</div>

					<div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
						<div className="w-full p-4 sm:p-12.5 xl:p-17.5">
							<h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
								Регистрация как автор
							</h2>

							<AuthorSignupForm />
						</div>
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
};

export default SignUpAuthor;
