import http, { IncomingMessage } from "http";
import mongodb from "mongodb";

class Resource {
  req: IncomingMessage;
  constructor(req: IncomingMessage) {
    this.req = req;
  }

  async authenticate(authID: string) {}

  async validate(data: any, schema: any) {}
}

export class Users extends Resource {
  static id = "users";

  constructor(req: IncomingMessage) {
    super(req);
  }

  async index(query: any) {
    await this.authenticate("admin");
    await this.validate(query, {});
    await Users.find(query).limit(20);
  }

  create(body: any) {}

  find(id: string) {}

  update(id: string) {}

  delete(id: string) {}
}

const server = (resources: [], req: Request, res: Response) => {};

export const serve = (resouces: Resource[]) => {
  const listener: http.RequestListener = (req, res) => {};
  http.createServer(listener).listen(8090);
};
