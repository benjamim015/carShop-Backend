export type HttpResponse = {
  statusCode: number;
  body: any;
};

export type HttpRequest = {
  file?: any;
  params?: any;
  body?: any;
};
