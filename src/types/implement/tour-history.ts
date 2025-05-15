export interface TourHistoryItem {
	tourHistoryId: string;
	tour: Tour;
	viewDate: string;
}

export interface Tour {
	tourId: string;
	name: string;
	price: number;
	thumbnail: string | null;
	duration: string;
	rating: number;
}
