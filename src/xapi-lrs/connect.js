export default {
  post (statement, config) {
    const USER_BASE_64 = btoa(`${config.USERNAME}:${config.PASSWORD}`);
    const AUTHORIZATION = `Basic ${USER_BASE_64}`;
    const ContentType = 'application/json;charset=UTF-8';

    const request = new XMLHttpRequest();

    request.open('POST', config.URL);

    request.setRequestHeader('Content-Type', ContentType);
    request.setRequestHeader('Authorization', AUTHORIZATION);
    request.setRequestHeader('X-Experience-API-Version', config.VERSION);

    request.send(JSON.stringify(statement));
  }
};
