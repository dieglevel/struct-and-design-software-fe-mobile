export interface Tour {
	tourId: string;
	name?: string;
	description?: string;
	price?: number;
	thumbnail?: string;
	duration?: string;
	tourDestinationResponses?: TourDestinationResponse[];
	tourImageResponses?: TourImageResponse[];
	active?: boolean;
}

export interface TourDestinationResponse {
	name?: string
	description?: string
	image?: string
	active?: boolean
}

export interface TourImageResponse {
	tourImageId?: string
	tourId?: string
	imageUrl?: string
	description?: string
	orderIndex?: number
	active?: boolean
}