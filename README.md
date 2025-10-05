# omTest

#### API

DB has a fields: brand, model, color, year, isClear (crashed or not), price, registered

* /cars - returns a list of cars            
npm start cars
* /oneCar/:id - returns car (by id)         
npm start oneCar <id>
* /addCar - creates a new car               
npm start addCar model=<model> brand=<brand> color=<color> year=<year> isClear=<true/false> price=<price>
* /remove - removes car from db (by id)     
npm start remove <id>
* /sort - sorts the list by field (if to add argument isReverse=true, list will be reversed)
npm start sort <field> <isReverse>
* /filter - filters the list by field       
npm start filter <field>=<filter>
