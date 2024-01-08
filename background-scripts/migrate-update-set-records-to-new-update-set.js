var gr = new GlideRecord('sys_update_xml');
var OLD_UPDATE_SET_SYS_ID = "OLD_UPDATE_SET_SYS_ID";
var NEW_UPDATE_SET_SYS_ID = "NEW_UPDATE_SET_SYS_ID";

gr.addQuery("update_set", OLD_UPDATE_SET_SYS_ID);
// gr.addEncodedQuery(); // ADD ENCODED QUERY FILTERING
gr.query();

var rowCount = gr.getRowCount();

gr.setValue("update_set", NEW_UPDATE_SET_SYS_ID);
gr.updateMultiple();

gs.log("Total items" + rowCount);