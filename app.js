const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blogmodel = require("./models/blogs");

// creating and app via express

const app = express();

// CONNECT TO MONGO DB
const dbURI =
  "mongodb+srv://Newuser2:Newuser2@nodeproject2.a28ilpu.mongodb.net/NodeProject2?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((results) => {
    console.log("connected to db Node project2");
    app.listen(3000, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("listerning to port 3000");
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// setting view engines to be ejs
// app.set('views', path.join(__dirname), 'views')

app.set("view engine", "ejs");

// creating routes to be handled
app.get("/post-blogs", (req, res) => {
  const blog = new Blogmodel({
    title: "my new blog",
    made: "this is my new blog",
    body: "a new bog about my coding ",
  });
  blog
    .save()

    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.log(err);
    });

  // list all documents in that db

  app.get("/all-blogs", (req, res) => {
    Blogmodel.find()
      .then((results) => {
        res.render("index", { title: "all Blogs", results });
      })
      .catch((err) => console.log(err));
  });
  app
    .get("/find-Id", (req, res) => {
      Blogmodel.findById("631c9fb131b242bd09613b99");
    })
    .then((results) => {
      res.send(results);
    });
});

app.get("/", (req, res) => {
  res.render("index", { title: "Node Project" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "about us" });
});
app.get("/newpost", (req, res) => {
  res.render("newpost", { title: "New Post" });
});

app.get("/createblog", (req, res) => {
  Blogmodel.find()
    .then((results) => {
      res.render("createblog.ejs", { blogs: results, title: "Blog Posts" });
    })
    .catch((err) => {
      console.log(err);
    });

    app.get('/createblog/:id', (res,req)=>{
        const id = req.params.id;
        Blogmodel.findById(id)
        console.log(id)


    })

  app.post("/newblogs", (req, res) => {
    const newblog = new Blogmodel(res.body);
    newblog.save().then((results) => {
      console.log(results);
      res.redirect("/createblog").catch((err) => {
        console.log(err);
      });
    });
  });
  // create an array of blogs opjacts
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404 page" });
});

// listerning to server at port 3000
