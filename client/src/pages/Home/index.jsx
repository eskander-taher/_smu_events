import useListNews from "../../api/news/useListNews";
import ImageSlider from "../../common/ImageSlider";
import DefaultLayout from "../../layout/DefaultLayout";
import Left from "./Left";
import Title from "../../components/Title";
import Skeleton from "../../components/Skeleton";
import LinkCard from "../../components/LinkCard";
import formatDate from "../../utils/dateFormater";

const Index = () => {
	const { data, isSuccess, isLoading } = useListNews();
	let news = [];

	if (isSuccess) {
		news = data.data.data;
	}

	return (
		<DefaultLayout>
			<ImageSlider />
			<div className="flex flex-col justify-between sm:flex-row mt-4 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
				<div className="w-full">
					<Title>Новости</Title>
					<div className="flex flex-col gap-4 md:gap-6">
						{isLoading && <Skeleton />}
						{!isLoading && news.length === 0 && (
							<div className="text-center py-5">Нет новостей.</div>
						)}
						{!isLoading &&
							news
								.slice()
								.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
								.map((newsItem) => (
									<LinkCard
										key={newsItem._id}
										to={`/news/${newsItem._id}`}
										title={newsItem.title}
										subTitle={formatDate(newsItem.createdAt)}
									/>
								))}
					</div>
				</div>
				<Left />
			</div>
		</DefaultLayout>
	);
};

export default Index;
