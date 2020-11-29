document.getElementById('issueInputForm').addEventListener('submit', submitIssue);


function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
  totalItem();
}

function setStatusClosed(event,id){
  event.preventDefault();
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  console.log('currentIssue',currentIssue);
  currentIssue.status = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
  totalClose()
}

    function deleteIssue(event, id){
      event.preventDefault();
      const issues = JSON.parse(localStorage.getItem('issues'));
      const remainingIssues = issues.filter(issue => issue.id != id )
      localStorage.setItem('issues', JSON.stringify(remainingIssues));
      const hideArea = document.getElementById(`issue-${id}`);
        hideArea.style.display = 'none';
        totalItem();
    }



const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML +=   `<div id="issue-${id}" class="well">
                              <h6  >Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span  class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span  class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="setStatusClosed(event,${id})" class="btn btn-warning">Close</a>
                              <a href="#" id="delete-data" onclick="deleteIssue(event,${id})"  class="btn btn-danger">Delete</a>
                              </div>`;
                              
  }
}
 
 
      function totalClose(){
        const isseus = JSON.parse(localStorage.getItem('issues'));
        document.getElementById('close').innerHTML = isseus.length - 1;
      }
      totalClose();
     function totalItem(){
       const isseus = JSON.parse(localStorage.getItem('issues'));
       document.getElementById('delete').innerHTML = isseus.length;
       document.getElementById('close').innerHTML = isseus.length;

     }
     totalItem();




