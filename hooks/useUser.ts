import { useQuery, useQueryClient } from '@tanstack/react-query';
import { firstValueFrom } from 'rxjs';
import { ajax } from 'rxjs/ajax';

type User = {
  id: string;
  username: string;
  email: string;
};

const API_URL = 'http://localhost:8080/oauth2/user';

const fetchUser = async (jwt: string): Promise<User> => {
  const observable$ = ajax<User>({
    url: API_URL,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwt}`,
      accept: 'application/json',
    },
    responseType: 'json',
  });

  const response = await firstValueFrom(observable$);
  return response.response;
};

export function useUser() {
  const queryClient = useQueryClient();
  const authData = queryClient.getQueryData<{ accessToken?: string }>(['auth']);
  const jwt = authData?.accessToken;

  return useQuery<User, Error>({
    queryKey: ['user'],
    queryFn: () => {
      if (!jwt) throw new Error('No JWT found');
      return fetchUser(jwt);
    },
    enabled: !!jwt, // Only run if JWT is present
  });
}