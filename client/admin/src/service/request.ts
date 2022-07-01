import HttpServiceRequest from '@/utils/http';

const request = new HttpServiceRequest({ timeout: 21600, withCredentials: true });

export default request;
