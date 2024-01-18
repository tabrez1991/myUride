/* eslint-disable turbo/no-undeclared-env-vars */
import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';

const apiHelper = axios.create({ timeout: 60000 });
apiHelper.defaults.headers.common['Authorization'] = `Bearer ${getCookie('accessToken')}`;
// apiHelper.defaults.headers.common['Sessionid'] = `${getCookie('sessionID')}`;


apiHelper.interceptors.request.use(
  async (config: any) => {
    config.headers = {
      Authorization: `Bearer ${getCookie('accessToken')}`,
      // Sessionid: getCookie('sessionID'),
      // //security headers
      // 'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self' data:; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; block-all-mixed-content; upgrade-insecure-requests; -cache--control no-cache no-store; no-store; object-src 'none'; script-src-attr 'none'",
      // 'Strict-Transport-Security': "max-age=31536000; includeSubDomains; preload",
      // 'X-Content-Type-Options': 'nosniff',
      // 'X-Frame-Options': 'DENY',
      // 'X-XSS-Protection': '1; mode=block',
      // 'Referer-Policy': 'strict-origin-when-cross-origin',
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

apiHelper.interceptors.response.use(
  (response)=>{
    return response;
  },
  async function (error) {
    return Promise.reject(error);
  }
)
export default apiHelper;