# Processing of Create  

### Create  

The following services  
- /v1/create-application-template  
- /v1/create-load-balancer-template  
- /v1/create-controller-template  
- /v1/create-mount-point-template  

shall be processed as follows:  
- copy content of RunningDS into CandidateDS  
- create logical object of specified type and category with values from RequestBody in CandidateDS  
- invoke validationOrchestrator  
- IF ResponseCode==204  
  - copy content of CandidateDS into RunningDS  
  - respond 204 to requestor  
  ELSE  
  - respond ResponseCode to requestor  

### Delete  

The following services  
- /v1/delete-application-template  
- /v1/delete-load-balancer-template  
- /v1/delete-controller-template  
- /v1/delete-mount-point-template  

shall be processed as follows:  
- copy content of RunningDS into CandidateDS  
- identify logical object by specified type, category and key attribute value and delete if from CandidateDS  
- invoke validationOrchestrator  
- IF ResponseCode==204  
  - copy content of CandidateDS into RunningDS  
  - respond 204 to requestor  
  ELSE  
  - respond ResponseCode to requestor  

### List  

The following services  
- /v1/list-application-templates  
- /v1/list-load-balancer-templates  
- /v1/list-controller-templates  
- /v1/list-mount-point-templates  

shall be processed as follows:  
- retrieve key attribute values of logical objects of specified type and category from RunningDS  
- respond list of key attribute values to requestor  

### Inform  

The following services  
- /v1/inform-about-application-template  
- /v1/inform-about-load-balancer-template  
- /v1/inform-about-controller-template  
- /v1/inform-about-mount-point-template  

shall be processed as follows:  
- identify logical object by specified type, category and key attribute value  
- respond values of logical object from RunningDS to requestor  

### Update  

The following services  
- /v1/update-application-template  
- /v1/update-load-balancer-template  
- /v1/update-controller-template  
- /v1/update-mount-point-template  

shall be processed as follows:  
- copy content of RunningDS into CandidateDS  
- identify logical object by specified type, category and key attribute value and change it with values from RequestBody in CandidateDS  
- invoke validationOrchestrator  
- IF ResponseCode==204  
  - copy content of CandidateDS into RunningDS  
  - respond 204 to requestor  
  ELSE  
  - respond ResponseCode to requestor  
