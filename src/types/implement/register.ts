export interface RegisterParams {
	username?: string;
	password?: string;
	email?: string;
	phone?: string;
	fullName?: string;
}

export interface RegisterResponse {
	userId?: string;
	username?: string;
	email?: string;
	phone?: string;
	fullName?: string;
	avatarUrl?: string;
	birthday?: string;
	gender?: number;
	role?: string;
}
