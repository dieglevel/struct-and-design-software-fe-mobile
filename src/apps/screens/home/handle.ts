import { getTours } from "@/services/tour-service";
import { Tour } from "@/types/implement";

export const handleGetTours = async (setListTour: React.Dispatch<React.SetStateAction<Tour[]>>) => {
	try {
		const response = await getTours();

		if (response) {
			const tours = response.data;

			if (tours) {
				setListTour(tours);
			}
		} else {
			console.error("Error fetching tours:", response);
		}
	} catch (error) {
		console.error("Error fetching tours:", error);
	}
};
