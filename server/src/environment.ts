class Environment {
    getPort(): Number {
        return 8000;
    }

    getDBName(): String {
        return 'db_dev';
    }
}

export default new Environment();