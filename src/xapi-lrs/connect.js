import lrsConfig from '../config/lrs';

const USER_BASE_64 = btoa(`${lrsConfig.USERNAME}:${lrsConfig.PASSWORD}`);
const AUTHORIZATION = `Basic ${USER_BASE_64}`;
const ContentType = 'application/json;charset=UTF-8';

export default {
  post(statement) {
    const request = new XMLHttpRequest();

    request.open('POST', lrsConfig.ENDPOINT);

    request.setRequestHeader('Content-Type', ContentType);
    request.setRequestHeader('Authorization', AUTHORIZATION);
    request.setRequestHeader('X-Experience-API-Version', lrsConfig.VERSION);

    request.send(JSON.stringify(statement));
  }
};
