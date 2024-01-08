var CustomAlert = Class.create();
CustomAlert.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    customAlert: function() {
        return "Hello from the server - side: " + this.getParameter('message');
    },
    getGroupsId: function() {
        var groups = new GlideRecord('sys_user_group');
        var groupsIds = [];
        groups.query();

        while(groups.next()) {
            groupsIds.push({
                name: groups.getValue('name'),
                sys_id: groups.getValue('sys_id')
            });
        }
        return JSON.stringify(groupsIds);
    }
});