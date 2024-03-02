export type RegisterType = {
	email: string;
	fullname: string;
	password: string;
};
export type LoginType = {
	email: string;
	password: string;
};

export type LoginResponse = {
	id: string;
	email: string;
	fullname: string;
	phone: string;
	address: string;
	typeLogin: string;
	accessToken: string;
	createdAt: Date;
	updatedAt: Date;
};

export type LoginGoogleType = {
	accessToken: string;
};
