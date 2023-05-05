// import express from "express";
// const app = express();
// import dotenv from "dotenv";
// dotenv.config();
// import cors from "cors";
// import path from "path";

// const pathToFile = path.resolve("./");
// const api =
//   `${process.env.apiURL}:${process.env.apiPort}` || "http://localhost:3500/";
// const port = process.env.frontEndPort || 3000;
// const url = process.env.frontEndURL || `http://localhost`;

// app.use(cors());

// // app.use((req, res, next) => {
// //   res.setHeader("X-Content-Type-Options", "nosniff");
// //   next();
// // });

// app.get("/", (req, res) => {
//   try {
//     res.sendFile(`${pathToFile}/index.html`);
//     res.sendFile(`${pathToFile}/src/main.jsx`);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send("bad request");
//   }
// });

// app.get("/src/App.css", (req, res) => {
//   try {
//     res.sendFile(`${pathToFile}/src/App.css`);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send("bad request");
//   }
// });

// app.get("/src/index.css", (req, res) => {
//   try {
//     res.sendFile(`${pathToFile}/src/index.css`);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send("bad request");
//   }
// });

// // app.use((req, res, next) => {
// //   if (req.url.endsWith(".jsx")) {
// //     res.setHeader("Content-Type", "text/jsx");
// //   }
// //   next();
// // });

// app.get("/src/App.jsx", (req, res) => {
//   try {
//     res
//       .setHeader("Content-Type", "text/jsx")
//       .sendFile(`${pathToFile}/src/App.jsx`);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send("bad request");
//   }
// });

// app.get("/src/main.jsx", (req, res) => {
//   try {
//     res
//       .setHeader("Content-Type", "text/jsx")
//       .sendFile(`${pathToFile}/src/main.jsx`);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send("bad request");
//   }
// });

// app.listen(port, url, () => {
//   console.log(`fronEnd running at ${url}:${port}`);
// });
