const version: string = 'v1';

/**
 * The URL of the app
 */
export const APP_ROUTE: string | undefined = process.env.PUBLIC_APP_URL;

/**
 * The URL of the API
 */
export const API_ROUTE: string = `${process.env.NEXT_PUBLIC_API_URL}/${version}`;

/**
 * The buildings route
 */
export const BUILDINGS: string = '/buildings';

/**
 * The login route
 */
export const loginRoute: string = APP_ROUTE + '/auth/login';

/**
 * The trendlogs route
 */
export const TRENDLOGS: string = '/trendlogs';
