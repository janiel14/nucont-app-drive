const validate = () => {
    const driver = document.getElementById("driver").value,
        hostname = document.getElementById("hostname").value,
        port = document.getElementById("port").value,
        database = document.getElementById("database").value,
        username = document.getElementById("username").value,
        password = document.getElementById("password").value,
        query = document.getElementById("query").value,
        display = document.getElementById("display");

    if (driver == 0) {
        display.innerHTML = "Selecione o driver!!!!";
        return false;
    }
    if (port == 0) {
        display.innerHTML = "informe a porta!!!!";
        return false;
    }
    if (hostname.length == 0) {
        display.innerHTML = "informe a hostname!!!!";
        return false;
    }
    if (database.length == 0) {
        display.innerHTML = "informe a database!!!!";
        return false;
    }
    if (username.length == 0) {
        display.innerHTML = "informe a username!!!!";
        return false;
    }
    if (password.length == 0) {
        display.innerHTML = "informe a password!!!!";
        return false;
    }
    if (query.length == 0) {
        display.innerHTML = "informe a query!!!!";
        return false;
    }

    return true;
};

const testDriver = () => {
    try {
        const driver = document.getElementById("driver").value,
            hostname = document.getElementById("hostname").value,
            port = document.getElementById("port").value,
            database = document.getElementById("database").value,
            username = document.getElementById("username").value,
            password = document.getElementById("password").value,
            query = document.getElementById("query").value,
            display = document.getElementById("display");

        if (!validate()) {
            return null;
        }

        let conn = null;

        if (driver == 1) {
            const sqlanywhere = require("./lib/sqlanywhere")();
            sqlanywhere.setParams(hostname, username, password, port, "utf-8");
            conn = sqlanywhere;
        } else {
            const sybase = require("./lib/nodeSybaseNu")();
            sybase.setParams(
                hostname,
                username,
                password,
                database,
                port,
                "utf-8"
            );
            conn = sybase;
        }

        if (conn) {
            display.innerHTML = "awaiting...";
            conn.query(query)
                .then((result) => {
                    display.innerHTML = JSON.stringify(result);
                })
                .catch((error) => {
                    display.innerHTML = error;
                });
        }
    } catch (error) {
        document.getElementById("display").innerHTML = error;
    }
};
window._testDriver = testDriver;
