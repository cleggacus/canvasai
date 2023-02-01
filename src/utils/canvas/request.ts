type URLParams = {
  [key: string]: number | boolean | string | string[]
}
export type RequestOptions = {
  url: string,
  token: string,
  path?: string,
  params?: URLParams,
  method?: "GET" | "POST"
}

const defaultRequestOptions: Required<RequestOptions> = {
  url: "",
  token: "",
  path: "",
  params: {},
  method: "GET",
}

const request = async (requestOptions: RequestOptions) => {
  const options: Required<RequestOptions> = {
    ...defaultRequestOptions,
    ...requestOptions
  };

  const url = createUrl(options.url, options.path, options.params);

  const response = await fetch(url, {
    method: options.method,
    headers: {
      Authorization: `Bearer ${options.token}`,
    }
  })

  const data = await response.json();

  return data;
}

const createUrl = (urlString: string, path: string, params: URLParams) => {
  const url = new URL(urlString);
  url.pathname = path;

  addParams(url, params);

  return url.toString();
}

const addParams = (url: URL, params: URLParams) => {
  params["per_page"] = 100;

  const entries = Object.entries(params);

  for(const [key, value] of entries) {
    if(
      typeof value == "string" ||
      typeof value == "number" ||
      typeof value == "boolean"
    ) {
      url.searchParams.set(key, value.toString());
    } else {
      for(const elem of value) {
        url.searchParams.append(`${key}[]`, elem);
      }
    }
  }
}

export default request;