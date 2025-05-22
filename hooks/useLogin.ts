import { useMutation, useQueryClient } from '@tanstack/react-query';
import { firstValueFrom } from 'rxjs';
import { ajax } from 'rxjs/ajax';

const login = async (data: {
  username: string;
  password: string;
}) => {
  const params = new URLSearchParams();
  params.append('grant_type', 'password');
  params.append('username', data.username);
  params.append('password', data.password);
  params.append('scope', '');
  params.append('client_id', 'string');
  params.append('client_secret', 'string');

  const observable$ = ajax({
    url: 'http://localhost:8080/oauth2/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      accept: 'application/json',
    },
    body: params.toString(),
    responseType: 'json',
  });

  // Convert Observable to Promise for React Query
  const response = await firstValueFrom(observable$);
  return response.response;
};

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.setQueryData(['auth'], data);
      console.log('Login successful:', data);
    },
  });
}