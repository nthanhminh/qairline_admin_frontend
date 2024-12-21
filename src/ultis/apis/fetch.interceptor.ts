import Cookies from 'js-cookie';
import { baseUrl } from '../constants';
import { DataApiResponse } from '../type/commom.type';

export const fetchInterceptor = async (url: RequestInfo, options: RequestInit = {}): Promise<Response | null> => {
  const token = Cookies.get('accessToken');

  const headers: Record<string, any> = {
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
    headers['Content-type'] = 'application/json';
  }

  const modifiedOptions: RequestInit = {
    ...options,
    headers,
  };

  try { 
    const response = await fetch(url, modifiedOptions);

    if (response.status === 401) {
        return handleRefreshToken(url, options);
    } else if (response.status === 403) {
      const locale = Cookies.get('NEXT_LOCALE') || 'en';
      window.location.href = `/${locale}/login`;
    }

    return response;

  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
};

const handleRefreshToken = async (url: RequestInfo, options: RequestInit = {}): Promise<Response | null> => {
    console.log('handleRefreshToken');
    const refreshToken = Cookies.get('refreshToken');
    console.log(refreshToken);
    const locale = Cookies.get('NEXT_LOCALE') || 'en';
    if (!refreshToken) {
        console.error('No refresh token available');
        window.location.href = `/${locale}/login`;
        return null;
    }

    try {
        const response = await fetch(`${baseUrl}/auth/refresh`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${refreshToken}`,
            },
        });

        if (!response.ok) {
            console.error('Unauthorized! Redirecting to login...');
            // window.location.href = `/${locale}/login`;
            return null;
        }

        const parseResponse: DataApiResponse<{ accessToken: string }> = await response.json();
        const { accessToken } = parseResponse.data;

        Cookies.set(
          'accessToken', 
            accessToken.toString(), 
          { 
            path: '/', 
            secure: true, 
            sameSite: 'strict',
            expires: 60 * 60 * 24 * 7
          }
        );
        return fetchInterceptor(url, options);

    } catch (error) {
        console.error('Error refreshing token:', error);
        return null;
    }
}
