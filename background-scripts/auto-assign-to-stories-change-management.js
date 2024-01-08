
var gr = new GlideRecord('rm_story');

gr.addEncodedQuery('sys_class_name=rm_story^product.display_nameSTARTSWITHChange Management');
gr.query();

var totalRecords = gr.getRowCount();
gs.log('Total records: ' + totalRecords);


var itsmAdmins = [
    {
        name: 'Oscar Munguia',
        sys_id: 'b1ae3126938371107e9e7a718bba10b6',
        count: 0
    },
    {
        name: 'Josue Velasquez',
        sys_id: '29ae3126938371107e9e7a718bba1082',
        count: 0
    },
    {
        name: 'Jeffrey Mata',
        sys_id: 'edae3126938371107e9e7a718bba100d',
        count: 0
    }
];

function getRandomAssignee() {
    var continueAssignmentLoop = true;
    while(continueAssignmentLoop) {
        var randomNumber = Math.ceil(Math.random() * 3) - 1;
        if (itsmAdmins[randomNumber].count < 35) {
            var assignedMember = itsmAdmins[randomNumber];
            itsmAdmins[randomNumber].count = itsmAdmins[randomNumber].count + 1;
            continueAssignmentLoop = false;
        }
    }
    return assignedMember;
};

function storiesAutomatedAssignment() {
    gs.log('\nInside function: ');
    gs.log(totalRecords);

    while(gr.next()) {
        var selectedMember = getRandomAssignee();
        gs.log('randomAssigne: ' + selectedMember.name + ' ' + selectedMember.count);
        gr.assigned_to = selectedMember.name;
        gr.update();
    }
};

storiesAutomatedAssignment();
