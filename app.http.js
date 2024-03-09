const http = require("http");
const port = 8081;

const todoList = ["Wake up early", "Play cricket"];

http
  .createServer((req, res) => {
    if (req.method === "GET") {
      res.write(todoList.toString());
      res.end();
    }

    if (req.method === "POST") {
      let data = "";

      req.on("data", (chunk) => {
        data += chunk;
      });

      req.on("end", () => {
        const itemToAdd = JSON.parse(data).name;
        todoList.push(itemToAdd);
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("POST request received\n");
      });
    }

    if (req.method === "DELETE") {
      let data = "";

      req.on("data", (chunk) => {
        data += chunk;
      });

      req.on("end", () => {
        const itemToRemove = JSON.parse(data).name;

        for (let i = 0; i < todoList.length; i++) {
          if (todoList[i] === itemToRemove) {
            todoList.splice(i, 1);
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("DELELE request received\n");
          }
        }
      });
    }
  })
  .listen(port, () => {
    console.log(`Listening to port ${port}`);
  });
