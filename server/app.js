var express = require("express");
var path = require("path");
var app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use((req, res, next) => {
    console.log(`New Request, URL ${req.url}`);
    next();
});

app.get("/api/getLeaderboard", (req, res) => {
    res.json({
        success: true,
        lb: [
            { user: "Ashton Karp", wins: 3, losses: 2 },
            { user: "Ron Kogan", wins: 2, losses: 4 },
        ],
    });
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(process.env.PORT || 8080, () =>
    console.log(`Listening on port ${process.env.PORT || 8080} `)
);
