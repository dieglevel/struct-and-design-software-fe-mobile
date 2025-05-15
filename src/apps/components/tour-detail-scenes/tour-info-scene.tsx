import TourInfo from "../ui/more-infors";

export const InfoScene = ({
	transport,
	accommodation,
	others,
}: {
	transport: string[];
	accommodation: string[];
	others: string[];
}) => {
	return (
		<TourInfo
			transport={transport}
			accommodation={accommodation}
			others={others}
		/>
	);
};
