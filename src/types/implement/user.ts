export enum Gender {
	Male = 0,
	Female = 1,
}

export enum UserRole {
	USER = "USER",
	ADMIN = "ADMIN",
}

export interface User {
	userId?: string;
	username?: string;
	fullName?: string;
	email?: string;
	phone?: string;
	avatarUrl?: string;
	birthday?: string | null;
	gender?: Gender;
	role?: UserRole;
}
