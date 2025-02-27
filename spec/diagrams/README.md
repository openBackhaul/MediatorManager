# MediatorManager Diagrams



## Automated Load Sharing
- automatische Gleichverteilung
  . Neue interfaces
  . zusätzliche Resourcen
  . Mediator update
- deprecated => entleeren
 

## Übergabe Prozess im Detail
- Notifications

## Hygiene Funktion (?)




## Providing and Maintaining the NETCONF interfaces  
Regardless of whether it is the initial connection or the continuous optimisation, the following two sub-processes can be distinguished:  
- Selecting the mediatorVM
- Creating the mediatorProcesses

## Selecting the mediatorVM  
- Filter for the mediatorVMs that are able to provide a mediatorProcess for the device's model name  
- Calculate the respective load on these MediatorVMs (load = (number of configured mediatorProcesses) / (engineering limit) )  
- Pick the MediatorVM with the lowest load  
- If the lowest load would be 1 (or higher), the process shall return no MediatorVM, but an error message  

## Creating the mediatorProcesses

