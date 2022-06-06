var express = require("express");
var path = require("path");
var app = express();


app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.resolve(__dirname, "../client/build")));


app.use((req, res, next) => {
    console.log(`New Request, URL ${req.url}`);
    next();
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(process.env.PORT || 8080, () =>
    console.log(`Listening on port ${process.env.PORT || 8080} `)
);