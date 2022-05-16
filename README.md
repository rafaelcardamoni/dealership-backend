# dealership-backend  
Back-end repository for fullstack project of a car dealership  
  
Available routes:  
  
Get Requests  
https://dealership-next.herokuapp.com/api/cars List of all cars  
https://dealership-next.herokuapp.com/api/cars/id Car by ID  
https://dealership-next.herokuapp.com/api/cars/number(1-99) List limited amount of cars  
https://dealership-next.herokuapp.com/api/users List of all users  
https://dealership-next.herokuapp.com/api/cars/images/id List images by car ID  
  
Post Requests  
https://dealership-next.herokuapp.com/api/cars/create Route to create a car  
https://dealership-next.herokuapp.com/api/users/create Route to create a user  
https://dealership-next.herokuapp.com/api/cars/images/create/carId Add image(s) to a car  
https://dealership-next.herokuapp.com/ Login authentication route (generating a jwt token)  
  
Delete Requests 
https://dealership-next.herokuapp.com/api/cars/delete/carId Delete car by ID  
https://dealership-next.herokuapp.com/api/cars/images/delete/id Delete car image by image ID  
https://dealership-next.herokuapp.com/api/users/delete/id Delete user by ID  
  
Put Requests 
https://dealership-next.herokuapp.com/api/cars/update/id Update car by ID  
https://dealership-next.herokuapp.com/api/users/update/id Update user by ID  
