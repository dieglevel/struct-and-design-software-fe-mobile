export interface RatingDetail {
	label?: string;
	value?: number;
}

export interface RatingProps {
	rating?: number;
	ratingDetails?: RatingDetail[];
}
