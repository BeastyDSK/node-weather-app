// Loading the default and required npm modules
const path = require("path");
var sslRedirect = require("heroku-ssl-redirect");
var compression = require("compression");
var helmet = require("helmet");
const express = require("express");

if (process.env.NODE_ENV === "development") {
    const dotenv = require("dotenv");
    dotenv.config({
        path: path.join(__dirname, "config.env"),
    });
}

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();

// making the request to https
app.use(sslRedirect());
app.use(compression());
app.use(helmet());

// settig up the port to work with.
const port = process.env.PORT || 1234;

// setting up the default directories
const PathforExpress = path.join(__dirname, "../public");
app.use(express.static(PathforExpress));

// setting up the get request to send the data when some access the server
app.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/weather", (req, res) => {
    if (req.query.lat && req.query.lon) {
        geocode.withcoords(parseFloat(req.query.lat), parseFloat(req.query.lon), (Gerror, { place } = {}) => {
            if (Gerror) {
                return res.send({
                    error: Gerror,
                });
            }
            forecast(parseFloat(req.query.lon), parseFloat(req.query.lat), (Ferror, Fdata) => {
                if (Ferror) {
                    return res.send({
                        error: Ferror,
                    });
                }
                res.send({
                    temperature: parseFloat(Fdata.currently.temperature).toFixed(0),
                    chance_for_rain: (Fdata.currently.precipProbability * 100).toFixed(0),
                    address: place,
                    forecast: Fdata.currently.summary,
                });
            });
        });
    } else if (req.query.address) {
        geocode.withlocation(req.query.address, (Gerror, { lat, long, place } = {}) => {
            if (Gerror) {
                return res.send({
                    error: Gerror,
                });
            }
            forecast(long, lat, (Ferror, Fdata) => {
                if (Ferror) {
                    return res.send({
                        error: Ferror,
                    });
                }
                res.send({
                    temperature: parseFloat(Fdata.currently.temperature).toFixed(0),
                    chance_for_rain: (Fdata.currently.precipProbability * 100).toFixed(0),
                    address: place,
                    forecast: Fdata.currently.summary,
                });
            });
        });
    } else {
        res.send({
            error: "Sorry you didn't provided any location.",
        });
    }
});

app.get("/about", (req, res) => {
    res.send("I am working on it.");
});

app.get("/help", (req, res) => {
    res.send("I am working on it.");
});

app.get("*", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "..", "public", "error.html"));
});

// setting up the server to start on localhost with a port of 1234
app.listen(port, () => {
    console.log(`server starting on ${port}.`);
});
