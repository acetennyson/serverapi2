const Tutorial = require("../models/tutorial.model.js");

/* <!-- User --> */

// Create and Save a new Tutorial

exports.registerUser = (req, res) => {
    // Validate request
    var _existingStatus = 0;
    if (!req.body) {
        res.status(400).send({
        message: "User's Content can not be empty!"
        });
    }
    console.log("BODY", req.body);
    const user = req.body;

    

    // Check if User's Record already exists
    Tutorial.checkUbyemail(user.email, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while registering the User."
        });
        else{
            _existingStatus = data;
            if (_existingStatus==0) {
                // if no existing data register user
                Tutorial.registerUser(user, (err, data) => {
                    if (err)
                    res.status(500).send({
                        message:
                        err.message || "Some error occurred while registering the User."
                    });
                    else{
                        console.log("Registered User: ",data);
                        res.send(data);
                    }
                });
            }else{
                console.log("_existingStatus: ", _existingStatus);
                res.send(0);
            }
        }
    });
};


exports.loginUser = (req, res) => {
    if (!req.body) {
        res.status(400).send({
        message: "User's Content can not be empty!"
        });
    }

    const details = req.body;

    Tutorial.loginUser(details, (err, data)=> {
        if (err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while registering the Employee."
            });
        else{
            res.send(data);
        }
    })
}

/* <!-- /User --> */


/* <!-- Doctor --> */

// Create and Save a new Tutorial

exports.registerDoc = (req, res) => {
    // Validate request
    var _existingStatus = 0;
    if (!req.body) {
        res.status(400).send({
        message: "User's Content can not be empty!"
        });
    }
    console.log("BODY", req.body);
    const user = req.body;

    

    // Check if User's Record already exists
    Tutorial.checkDbyemail(user.email, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while registering the User."
        });
        else{
            _existingStatus = data;
            if (_existingStatus==0) {
                // if no existing data register user
                Tutorial.registerDoc(user, (err, data) => {
                    if (err)
                    res.status(500).send({
                        message:
                        err.message || "Some error occurred while registering the User."
                    });
                    else{
                        console.log("Registered User: ",data);
                        res.send(data);
                    }
                });
            }else{
                console.log("_existingStatus: ", _existingStatus);
                res.send(0);
            }
        }
    });
};


exports.loginDoc = (req, res) => {
    if (!req.body) {
        res.status(400).send({
        message: "User's Content can not be empty!"
        });
    }

    const details = req.body;

    Tutorial.loginDoc(details, (err, data)=> {
        if (err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while registering the Employee."
            });
        else{
            res.send(data);
        }
    })
}

/* <!-- /Doctor --> */



exports.loginUser = (req, res) => {

    const details = req.body;

    Tutorial.loginUser(details, (err, data)=> {
        if (err)
            res.status(500).send({
            });
        else{
            res.send(data);
        }
    })
}

// Retrieve all doctors from the database (with no condition).
exports.getdoctors = (req, res) => {
    // const title = req.query.title;

    Tutorial.getdoctors((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving doctors."
        });
      else res.send(data);
    });
};































// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
    const title = req.query.title;

    Tutorial.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      else res.send(data);
    });
};


// Retrieve all Industries from the database (with no condition).
exports.getIndustries = (req, res) => {
    // const title = req.query.title;

    Tutorial.getIndustries((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving industries."
        });
      else res.send(data);
    });
};

// Retrieve all Employers from the database (with no condition).
exports.getEmployers = (req, res) => {
    // const title = req.query.title;
  
    Tutorial.getEmployers((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Employers."
        });
      else res.send(data);
    });
  };


// Find a single Tutorial with a id
exports.findOne = (req, res) => {
    Tutorial.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Tutorial with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Tutorial with id " + req.params.id
            });
          }
        }else
            res.send(data);
    });
};

// find all published Tutorials
exports.findAllPublished = (req, res) => {
    Tutorial.getAllPublished((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving tutorials."
          });
        else res.send(data);
    });
};

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Tutorial.updateById(
        req.params.id,
        new Tutorial(req.body),
        (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Tutorial with id ${req.params.id}.`
            });
            } else {
            res.status(500).send({
                message: "Error updating Tutorial with id " + req.params.id
            });
            }
        } else res.send(data);
        }
    );
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    Tutorial.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Tutorial with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Tutorial with id " + req.params.id
                });
            }
        } else res.send({ message: `Tutorial was deleted successfully!` });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Tutorial.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while removing all tutorials."
            });
        else res.send({ message: `All Tutorials were deleted successfully!` });
    });
};