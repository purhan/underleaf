![](https://socialify.git.ci/purhan/underleaf/image?description=1&font=Inter&language=1&logo=https%3A%2F%2Fraw.githubusercontent.com%2FPurhan%2Funderleaf%2Fb827c5016f1ba66aacabdd6d6001732511a86e48%2Fpublic%2Flogo512.svg%3Ftoken%3DACTEQDYPW4TDKVCI7RNPUU3ATTCH6&owner=1&pattern=Plus&theme=Light)

## License
This project is released under the MIT License. See [LICENSE](LICENSE).

## Demo
Visit the [heroku](https://under-leaf.herokuapp.com/) instance for a demo.

## Installation
Install latex compiler on your system. On debian-based:
```bash
$ sudo apt install texlive-full texlive-xetex curl
```

[Development] Set up a proxy in package.json:
```json
...
"proxy": "http://localhost:8080",
...
```

Install this package:
```bash
$ npm install
```

[Development] Run the react and express servers:
```bash
# In separate terminals

$ npm start
$ node server/server.js
```

[Production] Build and run the server
```bash
$ npm run build
$ npx serve -s build
```
