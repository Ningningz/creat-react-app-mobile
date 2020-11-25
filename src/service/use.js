import http from './http';

export const loginPosts = params => http.post('/api/v1/user/loginSms', params);
export const sendSmsCodePosts = params => http.get('/api/v1/user/sendPasscode', {params});
