
export type UserResponse = {
    user: {
        id: number;
        name: string;
        email: string;
        roles: string[];
    };
    token: string;
};