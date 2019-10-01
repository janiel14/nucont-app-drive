const sqlanywhere = require("sqlanywhere");
module.exports = function() {
    const _self = {};
    const _params = {
        Host: "localhost:2638",
        UserId: "EXTERNAL",
        Password: "EXTERNAL",
        CharSet: "utf-8",
        ConnectionPool: "YES(MaxCached=10)",
        AutoStart: "NO"
    };

    /**
     *  setParams
     *
     */

    _self.setParams = (
        Host,
        UserId,
        Password,
        Port = 2638,
        Charset = "utf-8"
    ) => {
        _params.Host = `${Host}:${Port}`;
        _params.UserId = UserId;
        _params.Password = Password;
        _params.CharSet = Charset;
    };

    /**
     * query
     */
    _self.query = async (query) => {
        return new Promise((resolve, reject) => {
            const conn = sqlanywhere.createConnection();
            conn.connect(_params, (error, connection) => {
                if (error) reject(error);
                else {
                    conn.exec(query, (error, result) => {
                        if (error) reject(error);
                        conn.disconnect();
                        resolve(result);
                    });
                }
            });
        });
    };

    return _self;
};
