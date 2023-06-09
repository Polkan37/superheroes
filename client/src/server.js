import { createServer, Model } from "miragejs";
import { v4 as uuid } from 'uuid';

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    models: {
      hero: Model
    },

    seeds(server) {
      server.create("hero", { id: 1, nickname: "Superman", real_name: "Clark Kent", origin_description: "he was born Kal-El on the planet Krypton, before being rocketed to Earth as an infant by his scientist father Jor-El, moments before Krypton's destruction…", superpowers: 'solar energy absorption and healing factor, solar flare and heat vision, solar invulnerability, flight', catch_phrase: "Look, up in the sky, it's a bird, it's a plane, it's Superman!", images: ['https://upload.wikimedia.org/wikipedia/en/3/35/Supermanflying.png','https://upload.wikimedia.org/wikipedia/en/3/35/Supermanflying.png','https://upload.wikimedia.org/wikipedia/en/d/d6/Superman_Man_of_Steel.jpg', 'https://cdn.britannica.com/61/177761-050-F38C22B1/Christopher-Reeve-Superman-Richard-Donner.jpg'] });

      server.create("hero", { id: 2, nickname: "Superman", real_name: "Clark Kent", origin_description: "he was born Kal-El on the planet Krypton, before being rocketed to Earth as an infant by his scientist father Jor-El, moments before Krypton's destruction…", superpowers: 'solar energy absorption and healing factor, solar flare and heat vision, solar invulnerability, flight', catch_phrase: "Look, up in the sky, it's a bird, it's a plane, it's Superman!", images: ['https://upload.wikimedia.org/wikipedia/en/d/d6/Superman_Man_of_Steel.jpg','https://cdn.theatlantic.com/thumbor/cTP7DsiUyI81zFg8c-FDnIoCBhA=/540x0:2340x1800/540x540/media/img/mt/2016/01/superman/original.jpg','https://upload.wikimedia.org/wikipedia/en/3/35/Supermanflying.png','https://cdn.britannica.com/61/177761-050-F38C22B1/Christopher-Reeve-Superman-Richard-Donner.jpg']
       });
    },

    routes() {
      this.namespace = "api";

      this.get("/heroes", (schema) => {
        return schema.heros.all();
      });
      
      this.post("/heroes", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        attrs.id = uuid();
        
        return schema.heros.create(attrs);
      });

      this.delete("/heroes/:id", (schema, request) => {
        const id = request.params.id;

        return schema.heros.find(id).destroy();
      });
      this.passthrough()
    },
  });

  return server;
}