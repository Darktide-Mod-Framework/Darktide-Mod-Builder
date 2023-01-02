(async () => {

    let { exitCode, finished } = await (require('./scripts/dmb')(process.argv));

    if (finished) {
        process.exit(exitCode);
    }
    else {
        process.exitCode = exitCode;
    }

})();
