export interface Tour {
	tourId: string;
	name: string;
	price: number;
	thumbnail: string | null;
	duration: string;
	rating: number;
}

export interface FavoriteTourItem {
	tourFavoriteId: string;
	tour: Tour;
}
