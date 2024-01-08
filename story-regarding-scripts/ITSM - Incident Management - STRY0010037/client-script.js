function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
       return;
    }
    // Type appropriate comment here, and begin script below
     var assignmentGroupValue = g_form.getValue('assignment_group');
     var assignmentGroupIsEmpty = assignmentGroupValue == '' ? true : false;
 
     var ga = new GlideAjax('CustomAlert');
     ga.addParam('sysparm_name', 'getGroupsId');
     ga.addParam('message', 'Message from the Client Side');
     ga.getXML(customAlertParse);
 
     function getGroupSysId(groupName, groupsData) {
         var groupSysId = groupsData[groupName].sys_id;
         return groupSysId;
     }
 
     function customAlertParse(response) {
         var answer = response.responseXML.documentElement.getAttribute("answer");
         var groupsList = JSON.parse(answer);
         var groupsObject = groupsList.reduce(function (acc, currentGroup) {
             acc[currentGroup.name] = { sys_id: currentGroup.sys_id };
             return acc;
         }, {});
 
         if(assignmentGroupIsEmpty) {
             // Get Variables needed for the Conditions
             var category = g_form.getValue('category');
             var short_description = g_form.getValue('short_description');
             
             // Conditions to give value to assignment_group field
             var groupSydId;
             if (short_description.includes('IT')) {
                 groupSydId = getGroupSysId('IT Support', groupsObject);
                 g_form.setValue('assignment_group', groupSydId);
             } else if (category == 'Software') {
                 groupSydId = getGroupSysId('IT Network Support', groupsObject);
                 g_form.setValue('assignment_group', groupSydId);
             } else if (category == 'Security') {
                 groupSydId = getGroupSysId('Third-party Risk Managers', groupsObject);
                 g_form.setValue('assignment_group', groupSydId);
             } else if (category == 'Hardware') {
                 groupSydId = getGroupSysId('NorCal Technicians', groupsObject);
                 g_form.setValue('assignment_group', groupSydId);
             } else { // Default value
                 groupSydId = getGroupSysId('Service Desk', groupsObject);
                 g_form.setValue('assignment_group', groupSydId);
             }
         }
         return groupsObject;
     }
 }