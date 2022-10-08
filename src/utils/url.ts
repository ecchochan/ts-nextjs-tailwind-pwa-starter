export const objToSearchParams = function (obj: {
  [key: string | symbol]: string | number | boolean;
}) {
  const str: string[] = [];
  for (const p in obj)
    if (Object.prototype.hasOwnProperty.call(obj, p) && obj[p] !== undefined) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  return str.join('&');
};

export const getQueryParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return Object.fromEntries(urlParams);
};

export const paramsToFormData = (params: {
  [key: string | symbol]: string | Blob;
}) => {
  const _params = new FormData();
  for (const key in params) _params.append(key, params[key]);

  return _params;
};
