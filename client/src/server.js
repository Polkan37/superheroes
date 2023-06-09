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

      server.create("hero", { id: 2, nickname: "Spiderman", real_name: "Пи́тер Бе́нджамин Па́ркер", origin_description: "Челове́к-пау́к, настоящее имя Пи́тер Бе́нджамин Па́ркер — супергерой, появляющийся в комиксах издательства Marvel Comics, созданный Стэном Ли и Стивом Дитко. С момента своего первого появления на страницах комикса Amazing Fantasy № 15 он стал одним из самых популярных супергероев", superpowers: 'токсичные жала на его предплечьях, способность прикреплять кого-либо на свою спину, улучшенное чутьё и ночное видение, а также возможность выпускать органическую паутину без использования каких-либо приспособлений, что отличается от ранних версий', catch_phrase: "«Люди часто говорят, что Marvel удалось смешать историю о супергерое и мыльную оперу. Ли и Дитко на самом деле сделали из серии", images: ['https://upload.wikimedia.org/wikipedia/ru/thumb/c/cb/AmazingSpiderMan50.jpg/231px-AmazingSpiderMan50.jpg','https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Spider_Strikes_v1n1_i05_Wentworth.png/220px-Spider_Strikes_v1n1_i05_Wentworth.png','https://upload.wikimedia.org/wikipedia/ru/thumb/b/ba/AmazingFantasy15.jpg/200px-AmazingFantasy15.jpg','https://upload.wikimedia.org/wikipedia/ru/thumb/c/cf/SpiderMan96.jpg/200px-SpiderMan96.jpg','https://upload.wikimedia.org/wikipedia/ru/thumb/f/f8/Amazing_SpiderMan_252.jpg/200px-Amazing_SpiderMan_252.jpg']
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