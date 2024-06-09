import useListNews from "../../api/news/useListNews";
import ImageSlider from "../../common/ImageSlider";
import NewsCard from "./NewsCard";
import DefaultLayout from "../../layout/DefaultLayout";
import Left from "./Left";
import Title from "../../components/Title";

const index = () => {
	const { data, isSuccess } = useListNews();

	return (
		<DefaultLayout>
			<ImageSlider />

			<div className="flex flex-col justify-between sm:flex-row mt-4 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
				<div className="w-full">
					<Title>Новости</Title>
					<div className="flex flex-col gap-4 md:gap-6">
						{isSuccess &&
							data?.data.map((item) => {
								return <NewsCard key={item._id} {...item} />;
							})}
					</div>
				</div>

				<Left />
			</div>
		</DefaultLayout>
	);
};

export default index;
