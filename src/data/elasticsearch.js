
export class Client {
  constructor(config) {
    this._host = config.host || 'http://localhost';
  }

  search(path, query) {
    return fetch(this._host + '/' + path + '/_search', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
    }).then((res) => {
      return res.json();
    });
  }
}
