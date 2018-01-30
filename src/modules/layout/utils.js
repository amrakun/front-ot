import consts from 'consts';

export const logout = () => {
  const { LOGIN_TOKEN_KEY, LOGIN_REFRESH_TOKEN_KEY } = consts;

  localStorage.removeItem(LOGIN_TOKEN_KEY);
  localStorage.removeItem(LOGIN_REFRESH_TOKEN_KEY);

  window.location.href = '/';
};
