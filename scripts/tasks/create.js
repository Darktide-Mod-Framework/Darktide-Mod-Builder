const opn = require('opn');

const print = require('../print');

const pfs = require('../lib/pfs');

const cfg = require('../modules/cfg');
const config = require('../modules/config');

const modTools = require('../tools/mod_tools');
const uploader = require('../tools/uploader');
const templater = require('../tools/templater');

module.exports = async function taskCreate() {

    let exitCode = 0;

    let params = modTools.getWorkshopParams();
    let modName = params.name;
    let modDir = modTools.getModDir(modName);

    // Validate modName
    let error = '';
    if (!modTools.validModName(modName)) {
        error = `Folder name "${modDir}" is invalid`;
    }
    else if (await pfs.accessibleDir(modDir)) {
        error = `Folder "${modDir}" already exists`;
    }

    if (error) {
        print.error(new Error(error));
        return { exitCode: 1, finished: true };
    }

    try {

        // Copy and customize template
        console.log(`Copying template from "${config.get('templateDir')}"`);
        await templater.copyTemplate(params);
    }
    catch (error) {
        print.error(error);
        exitCode = 1;

        // Cleanup directory if it has been created
        let modDir = modTools.getModDir(modName);
        if (await pfs.accessibleDir(modDir)) {

            try {
                await pfs.deleteDirectory(modDir);
            }
            catch (error) {
                print.error(error);
            }
        }
    }

    return { exitCode, finished: true };
};
