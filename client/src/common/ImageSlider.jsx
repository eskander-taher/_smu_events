import { useEffect, useState } from "react";
import image1 from "../images/cards/girl_on_laptop.avif";
import image2 from "../images/cards/hero_math.webp";
import image3 from "../images/cards/man_on_microscope.avif";
import image4 from "../images/cards/two_on_office.avif";

import { useNavigate } from "react-router-dom";

const images = [
	{ src: image1, alt: "Image 1", name: "Website 1" },
	{ src: image2, alt: "Image 2", name: "Website 2" },
	{ src: image3, alt: "Image 3", name: "Website 3" },
	{ src: image4, alt: "Image 4", name: "Website 4" },
];

const ImageSlider = () => {
	const navigate = useNavigate();
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="relative w-full h-64 overflow-hidden mb-5">
			<div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-10 vignette">
				<span className="text-white text-3xl mb-4 font-semibold">СОВЕТ МОЛОДЫХ УЧЕНЫХ</span>
				<div className="flex flex-col sm:flex-row gap-2">
					<button
						onClick={() => navigate("auth/signup/author")}
						className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
					>
						Стать автором
					</button>
					<button
						onClick={() => navigate("auth/signup/mod")}
						className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
					>
						Стать модератором
					</button>
				</div>
			</div>
			<img
				src={images[currentIndex].src}
				alt={images[currentIndex].alt}
				className="w-full h-full object-cover"
			/>
		</div>
	);
};

export default ImageSlider;
