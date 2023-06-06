const sql = require("./db.js");

// constructor
const Tutorial = function(tutorial) {
  this._appVersion = tutorial._appVersion;
  this._ip = tutorial._ip;
  this._latitude = tutorial.latitude;
  this._longitude = tutorial.longitude;
};


/* <!-- User --> */

Tutorial.registerUser = (user, result) => {
  sql.query("INSERT INTO patient_tbl SET ?", user, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("registered user: ", { patient_id: res.insertId, ...user });
    result(null, { patient_id: res.insertId, ...user });
  });
};

/* Get User By Email */

Tutorial.checkUbyemail = (email, result) => {
  sql.query(`SELECT * FROM patient_tbl WHERE email = '${email}' LIMIT 1`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found User: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result( null, 0);
  });
};


Tutorial.loginUser = (details, result) => {
  sql.query(`SELECT * FROM patient_tbl WHERE email = '${details.email}' AND password = '${details.password}' LIMIT 1`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found User: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the email and passord
    result( null, 0);
  });
};

/* <!-- /User --> */


/* <!-- Doctor --> */

Tutorial.registerDoc = (user, result) => {
  sql.query("INSERT INTO doctor_tbl SET ?", user, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("registered Doctor: ", { patient_id: res.insertId, ...user });
    result(null, { patient_id: res.insertId, ...user });
  });
};

/* Get User By Email */

Tutorial.checkDbyemail = (email, result) => {
  sql.query(`SELECT * FROM doctor_tbl WHERE email = '${email}' LIMIT 1`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Doctor: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result( null, 0);
  });
};


Tutorial.loginDoc = (details, result) => {
  sql.query(`SELECT * FROM doctor_tbl WHERE email = '${details.email}' AND password = '${details.password}' LIMIT 1`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Doctor: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the email and passord
    result( null, 0);
  });
};

/* <!-- /Doctor --> */

Tutorial.findById = (id, result) => {
  sql.query(`SELECT * FROM tutorials WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tutorial: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Tutorial.getdoc = (name, result) => {
  let query = "SELECT id, name, specialty FROM doctor_tbl WHERE name LIKE ?";
  let params = [`%${name}%`];

  sql.query(query, params, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("get doctors ", res);
    result(null, res);
  });
};

Tutorial.getdoctors = (result) => {
  let query = "SELECT * FROM doctor_tbl";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("doctors: ", res);
    result(null, res);
  });
};




















// Tutorial.getdoc = (_name, result) => {
//   let query = "SELECT name FROM doctor_tbl";
//   sql.query(query, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log("get doctors ", res);
//     result(null, res);
//   });
// };

/* Get Employer */

Tutorial.getvalu = (id, result) => {
  let query = "SELECT _name, _email FROM employer";

  if(id){
    query += ` WHERE id = ${id}`;
  }
  if (industry) {
    query += ` AND _industry = ${industry} LIMIT 1`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("industries: ", res);
    result(null, res);
  });
};


/* Get Industries */

Tutorial.getIndustries = (result) => {
    let query = "SELECT * FROM industries";
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("industries: ", res);
      result(null, res);
    });
};

/* Get Employers */

Tutorial.getEmployers = (result) => {
  let query = "SELECT * FROM employer";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Employers: ", res);
    result(null, res);
  });
};



Tutorial.getAllPublished = result => {
  sql.query("SELECT * FROM tutorials WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tutorials: ", res);
    result(null, res);
  });
};

Tutorial.updateById = (id, tutorial, result) => {
  sql.query(
    "UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?",
    [tutorial.title, tutorial.description, tutorial.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tutorial: ", { id: id, ...tutorial });
      result(null, { id: id, ...tutorial });
    }
  );
};

/* Update Temporary Employer */
Tutorial.updateTEbyss = (employer, result) => {
  sql.query(
    `UPDATE t_employer SET _name = '${employer._name}', _email = '${employer._email}', _industry = '${employer._industry}' WHERE _ss = '${employer._ss}' LIMIT 1`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("response in model on line 248: ", res);

      console.log("updated t_employer: ", employer);
      result(null, employer);
    }
  );
};

/* Update Temporary Employer */
Tutorial.updateUbyemail = (employee, result) => {
  sql.query(
    `UPDATE employee SET _name = '${employee._name}', _gender = '${employee._gender}', _industry = '${employee._industry}' WHERE _email = '${employee._email}' LIMIT 1`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("response in model on line 248: ", res);

      console.log("updated employee: ", employee);
      result(null, employee);
    }
  );
};

Tutorial.remove = (id, result) => {
  sql.query("DELETE FROM tutorials WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tutorial with id: ", id);
    result(null, res);
  });
};

Tutorial.removeAll = result => {
  sql.query("DELETE FROM tutorials", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} tutorials`);
    result(null, res);
  });
};

module.exports = Tutorial;