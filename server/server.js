const express = require("express");
//const url = require("url");
const bodyParser = require("body-parser");
const app = express();

app.all("/*", function (req, res, next) {
  // 跨域处理
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next(); // 执行下一个路由
});

app.use(bodyParser.json());

app.post("/login", (req, res) => {
  const mObj = req.body;
  const mobile = mObj.mobile;
  const code = mObj.code;
  if (mobile != "13880600111") {
    return res.status(422).json({
      msg: "手机号不正确",
      status: 1,
    });
  } else {
    //login sucess
    if (code === "123456") {
      //save the session
      return res.status(201).json({
        msg: "登录成功",
        status: 0,
      });
    } else {
      return res.status(422).json({
        msg: "验证码不正确",
        status: 2,
      });
    }
  }
});

app.get("/send13880600111", (req, res) => {
  res.send("已收到验证码");
});

app.get("/getuserchannels", (req, res) => {
  res.send([
    { id: 0, name: "推荐" },
    { id: 1, name: "CSS" },
    { id: 2, name: "HTML" },
    { id: 3, name: "Vue" },
    { id: 4, name: "React" },
    { id: 5, name: "Nodejs" },
    { id: 6, name: "Uniapp" },
  ]);
});

app.get("/getallchannels", (req, res) => {
  res.send([
    { id: 1, name: "CSS" },
    { id: 2, name: "HTML" },
    { id: 3, name: "Vue" },
    { id: 4, name: "React" },
    { id: 5, name: "Nodejs" },
    { id: 6, name: "Uniapp" },
    { id: 7, name: "C" },
    { id: 8, name: "C++" },
    { id: 9, name: "Java" },
    { id: 10, name: "Python" },
  ]);
});

app.get("/getarticles", (req, res) => {
  const page = parseInt(req.query.page);
  switch (page) {
    case 0:
      res.send({
        data: [
          { id: 0, name: "文章1", author: "作者1", comment: 0, covertype: 1 },
          { id: 1, name: "文章2", author: "作者2", comment: 0, covertype: 3 },
          {
            id: 2,
            name: "文章3文章3文章3文章3文章3文章3文章3文章3文章3文章3文章3文章3文章3文章3文章3文章3文章3文章3文章3文章3文章3文章3文章3",
            author: "作者3",
            comment: 0,
            covertype: 1,
          },
          { id: 3, name: "文章4", author: "作者4", comment: 0, covertype: 3 },
          { id: 4, name: "文章5", author: "作者5", comment: 0, covertype: 1 },
        ],
        params: req.query,
      });
      break;
    case 1:
      res.send({
        data: [
          { id: 5, name: "文章6", author: "作者6", comment: 0, covertype: 1 },
          { id: 6, name: "文章7", author: "作者7", comment: 0, covertype: 3 },
          { id: 7, name: "文章8", author: "作者8", comment: 0, covertype: 1 },
          { id: 8, name: "文章9", author: "作者9", comment: 0, covertype: 3 },
          { id: 9, name: "文章10", author: "作者10", comment: 0, covertype: 1 },
        ],
        params: req.query,
      });
      break;
    case 2:
      res.send({
        data: [
          {
            id: 10,
            name: "文章11",
            author: "作者11",
            comment: 0,
            covertype: 3,
          },
          {
            id: 11,
            name: "文章12",
            author: "作者12",
            comment: 0,
            covertype: 1,
          },
          {
            id: 12,
            name: "文章13",
            author: "作者13",
            comment: 0,
            covertype: 3,
          },
          {
            id: 13,
            name: "文章14",
            author: "作者14",
            comment: 0,
            covertype: 1,
          },
          {
            id: 14,
            name: "文章15",
            author: "作者15",
            comment: 0,
            covertype: 3,
          },
        ],
        params: req.query,
      });
      break;
    default:
      res.send({
        data: [],
        params: req.query,
      });
      break;
  }
});

app.get("/getsearchsuggestions", (req, res) => {
  res.send([
    { id: 1, name: req.query.q + "--1st" },
    { id: 2, name: req.query.q + "--2nd" },
    { id: 3, name: req.query.q + "--3rd" },
    { id: 4, name: req.query.q + "--4th" },
    { id: 5, name: req.query.q + "--5th" },
  ]);
});

app.listen(3000, "127.0.0.1", () => {
  console.log("server running at http://127.0.0.1:3000");
});
