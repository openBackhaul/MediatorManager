## General

1. In the OAS specification , only the indication of the object creation regarding the CandidateDS will be specified as the RequestBody to Object mapping is rational in this case. 
2. A start up data store will be provided with functions, validation sequence , implementation sequence and empty Datastores
3. During the initial deployment of the application , 
   CandidateDS : from startup
   RunningDS : from candidate
   Operational : ??
4. Later during the operational of the application, the startup DS will be updated by candidate DS whenever there is an update.
5. Query : When application crash and restore, if candidateDS already has value , then consider that as a initial deployment ? will it work ?
6. In few cases , we are deleting the CC object if the target is not reachable. Shall we include a status class instead ?
7. need additional APIs to regard CCD ?