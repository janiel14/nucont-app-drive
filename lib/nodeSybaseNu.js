const sybase = require("node-sybase-nu");
module.exports = function() {
    const _self = {};
    const _params = {
        name: "main",
        host: "localhost",
        port: 2638,
        dbname: "contabil",
        username: "NUCONTBI",
        password: "123456",
        logging: true,
        encoding: "utf8"
    };

    /**
     *  setParams
     *
     */

    _self.setParams = (
        hostname,
        username,
        password,
        dbname = "contabil",
        port = 2638,
        charset = "utf8"
    ) => {
        _params.host = hostname;
        _params.port = port;
        _params.dbname = dbname;
        _params.username = username;
        _params.password = password;
        _params.encoding = charset;
    };

    /**
     * query
     */
    _self.query = async (query) => {
        return new Promise((resolve, reject) => {
            const sb = new sybase([_params]);
            sb.DBPools.main
                .query(query)
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    return _self;
};
