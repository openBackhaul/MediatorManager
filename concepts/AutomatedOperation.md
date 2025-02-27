# Automated Operation  

**Autonomously executed Tasks**  
The following tasks are autonomously executed  
- Create the network behind a new NETCONF interface  
- Redistribute load (Mediator processes)  
  - when new resources (mediatorVM) are added  
  - when existing resources are marked as obsolete  
  - when existing resources fail  
- Clean dismantling of the network behind an obsolete NETCONF interface  
- Continuous purging of obsolete configuration artefacts  

**Code of Conduct**  
The following basic rules must be observed when carrying out the above-listed tasks.  
- Never break something that is operational  
- Seize opportunities when something is not working  
- Do the task completely or not at all  
- Clean up after the task has been completed  

**Providing a new NETCONF Interface**  
Whenever its MM://v1/provide-netconf-interface service is addressed, it  
- filters for mediatorVMs that are able to connect the specified kind of device  
- filters for mediatorVMs that did not yet reach their engineering limit  
- compares the load on the filtered mediatorVMs and choses the one with the lowest load  
- creates a mediatorProcess on that mediatorVM  


_**[The rest of the chapter is half cooked and needs to be discussed and updated together.]**_

A prerequisite for creating or modifying a mediator is that the IP address provided as an input is not used for an existing mediator instance with another mount name in connected state.  
During creating a mediatorProcess, the following aspects have to be considered:  
| mount-name already exist | ip-address already exist | for the expected mount-name + ip-address combination | ping test succeeds | consequence |
|-|-|-|-|-|
| yes  | yes  | yes  | | return 200  |
| yes  | no  | ./.  | | ![Image](https://github.com/user-attachments/assets/00da9948-17cb-447b-a5c1-d633c9742622)  |
| no/yes  | yes  | no  | | reject with **response 409 "IP Address occupied by \<mountname>“**<br>  |
| no  | no  | ./.  | yes | create mediator instance  |
| no  | no  | ./.  | no | return 532 |


**Dismantling an existing NETCONF Interface**  
Whenever its MM://v1/dismantle-netconf-interface service is addressed, the MM  
- searches all mediatorVMs for mediatorProcesses that are connecting the specified device  
- deletes all found mediatorProcesses  


_**[The rest of the chapter is half cooked and needs to be discussed and updated together.]**_


During deleting a mediatorProcess, the following aspects have to be considered:  
- If a mediatorProcess is still operational, it doesn't get deleted

(Consequently, this means that the MM://v1/dismantle-netconf-interface service could also be used to remove redundant mediatorProcesses without harming the existing NETCONF interface.)
