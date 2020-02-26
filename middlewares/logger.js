const logger = (req, res, next) => {
  req.requestTime = new Date(Date.now()).toLocaleString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  req.from = `${req.protocol}://${req.get("host")}`;
  console.log({
    method: req.method,
    from: req.from,
    timestamp: req.requestTime
  });
  // CONSOLE LOG COOKIES ON EACH REQUEST
  // console.log(req.cookies);
  next();
};

module.exports = logger;
