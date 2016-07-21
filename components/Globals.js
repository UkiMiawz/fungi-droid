/* all of the constans value for the android app */

module.exports = {
    FIREBASE: {
        URL: "https://fungi-5edf1.firebaseio.com",
        FUNGI_HUMIDITY: "fungi_humidity",
        FUNGI_TEMPERATURE: "fungi_temperature",
        FUNGI_LUX: "fungi_lux",
        FUNGI_AUTOMATION: "fungi_automation",
        FUNGI_PARAMETERS: "fungi_parameters",
    },
    FUNGI_AUTOMATION: {
      LIGHT: "light",
    },
    TEMPERATURE: {
        MIN: 18,
        MAX: 28,
        LIMIT: 50,
    },
    HUMIDITY: {
        MIN: 60,
        MAX: 90,
        LIMIT: 100,
    },
    LUX: {
        MIN: 90,
        MAX: 110,
        LIMIT: 200,
    },
    COLORS: {
        BLACK: "#000000",
        WHITE: "#ffffff",
        GREEN: "#00ff00",
        RED: "#ff0000",
        YELLOW: "#ffff00",
        LIGHTON: "#edff21",
        LIGHTOFF: "#000000",
    },
    TIMEZONE: {
      LOCAL_TIMEZONE: "Europe/Berlin",
      DATE_FORMAT: "YYYY-MM-DD hh:mm:ss",
      DATE_ONLY_FORMAT: "MMM.DD.YYYY",
      TIME_ONLY_FORMAT: "hh:mm:ss",
    }
};
