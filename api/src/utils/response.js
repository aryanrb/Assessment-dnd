const respond = (res, code, message, data) => {
  let response = {
    code: code,
    status: getStatusMessage(code),
  };

  if (message) {
    response.message = message;
  }

  if (data) {
    response.data = data;
  }

  res.status(code).json(response);
};

const getStatusMessage = (code) => {
  const Status = {
    Success: "Success",
    Failed: "Failed",
    Information: "Information",
    Redirect: "Redirect",
    Unknown: "Unknown",
  };

  if (code >= 100 && code <= 199) {
    return Status.Information;
  } else if (code >= 200 && code <= 299) {
    return Status.Success;
  } else if (code >= 300 && code <= 399) {
    return Status.Redirect;
  } else if (code >= 400 && code <= 599) {
    return Status.Failed;
  } else {
    return Status.Unknown;
  }
};

module.exports = {
  respond,
};
