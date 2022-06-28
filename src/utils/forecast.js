const request = require("request");

const forecast = (longitude, latitude, callback) => {
    const WeatherURL = `${process.env.WeatherURL}/${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}?units=si`;

    request({ url: WeatherURL, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Unable to connect to Location services", undefined);
        } else if (body.error) {
            callback("location is Invalid", undefined);
        } else {
            callback(undefined, body);
        }
    });
};

module.exports = forecast;
