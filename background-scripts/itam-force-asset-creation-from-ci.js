var CI_TABLE_TO_MAIN_SCAN = 'cmdb_ci_display_hardware';
var ENCONDED_QUERY_MAIN_SCAN = 'model_id=fb452d75830d0650f0d6a830ceaad35e'

var computerCiRecords = new GlideRecord(CI_TABLE_TO_SCAN);

// add query that filters the computers/hardware that should have assets
computerCiRecords.addEncodedQuery(ENCONDED_QUERY_MAIN_SCAN);
computerCiRecords.query();

var totalRecords = computerCiRecords.getRowCount();
gs.log('Total records: ' + totalRecords);

// This function determines if the CI has a real asset assigned or is referencing an inexistent asset, if it´s the last case the inexistent reference will be fixed.
function doesAssetExistForCI(CiAssetSysIdReference) {
    var assetRecords = new GlideRecord('alm_asset');
    gs.log('Searching for asset sys_id [ ' + CiAssetSysIdReference + ' ]')
    assetRecords.addEncodedQuery('sys_id='+ CiAssetSysIdReference);
    assetRecords.query();

    var assetsFoundCounts = assetRecords.getRowCount();
    gs.log('Assets found = ' + assetsFoundCounts);
    var assetFound = assetsFoundCounts >= 1 ? true : false;
    return assetFound;
}


while (computerCiRecords.next()) {
    var CiSysId = computerCiRecords.getValue('sys_id');
    var CiSysName = computerCiRecords.getValue('name');
    var CiAssetSysIdReference = computerCiRecords.asset;
    var CiAssetSysIdReferenceIsNull = CiAssetSysIdReference === undefined ? true
        : CiAssetSysIdReference === null ? true
        : false;

    gs.log('Asset exists ? ' + !computerCiRecords.asset.nil() + ' ' + computerCiRecords.asset.nil() + ' ' + computerCiRecords.name + ' ' + computerCiRecords);

    if (!computerCiRecords.asset.nil()) {
        var assetExists = doesAssetExistForCI(CiAssetSysIdReference);
        if (!assetExists) {
            // Fix CIs that have asset reference that does not exists.
            gs.log('Asset does not exists for CI [ ' + CiSysName + ' ], proceeding to clean inexistent reference');
            computerCiRecords.asset = 'NULL';
            computerCiRecords.update();
        } else {
            gs.log('Asset found!');
        }
    } else if (!CiAssetSysIdReference) {
        // Create asset for the CI
        gs.log('Asset does not exist for this [ ' + CiSysName + ' ] CI, proceeding to CREATE ASSET');
        var ciAsset = new AssetandCI();
        ciAsset.createAsset(computerCiRecords);
    }
}