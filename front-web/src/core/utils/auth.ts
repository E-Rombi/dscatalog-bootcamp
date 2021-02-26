import jwtDecode from 'jwt-decode';
export const CLIENT_ID = 'dscatalog';
export const CLIENT_SECRET = 'dscatalog123';

type LoginResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
    userFirstName: string;
    userId: number;
}

export type Role = 'ROLE_OPERATOR' | 'ROLE_ADMIN';

type AccessToken = {
    exp: number;
    user_name: string;
    authorities: Role[];
}

export const saveSessionData = (loginResponse: LoginResponse) => {
    localStorage.setItem("authData", JSON.stringify(loginResponse));
}

export const getSessionData = () => {
    const sessionData = localStorage.getItem("authData") ?? '{}';
    const parsedSessionData = JSON.parse(sessionData);
    return parsedSessionData as LoginResponse;
}

export const getAccesTokenDecoded = () => {
    const accessToken = getSessionData().access_token;
    try {
        const tokenDecoded = jwtDecode(accessToken);
    
        return tokenDecoded as AccessToken;
    } catch (error) {
        return { } as AccessToken;
    }
}

export const isTokenValid = () => {
    const { exp } = getAccesTokenDecoded();

    return (Date.now() <= exp * 1000);
}

export const isAuthenticated = () => {
    const { access_token } = getSessionData();

    return access_token && isTokenValid();
}

export const isAllowedByRole = (routesRoles: Role[] = []) => {
    if (routesRoles.length === 0) {
        return true;
    }
    
    const { authorities } = getAccesTokenDecoded();

    return routesRoles.some(role => authorities?.includes(role));
}