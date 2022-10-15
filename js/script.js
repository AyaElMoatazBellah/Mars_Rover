// DOM manipulation


  // show First popup or hide it 
  $('.submit').click(function(){
    $('.popup').fadeOut();  
  });
  
// Rover_Position
var Position = new Object();

//the total width and height for the web page 
var width = window.innerWidth;
var height = window.innerHeight;
console.log(width,height);

/*Lets divde this width in order to make 4 quadrant (-,+) , (+,+) , (-,-) , (+,-)
  with full screen orgin will be (682,312)*/
var origin_W = Math.floor(width/2);
var origin_H = Math.floor(height/2);


// Onclick For Start Button it place the Rover at his First Place
function isValidCoordinates () {
Position.X = document.getElementById('X-axsis').value;
Position.Y= document.getElementById('Y-axsis').value;
Position.Direction=document.getElementById('Direction').value;

Start_Move_Rover(Position.X,Position.Y,Position.Direction);
}

//if Command symbole if 'f' or 'F' move forward with same direction
function FowrwardCommand(x,y,direction)
{
  if(direction === "South"){y =  parseInt(y)-1}
  else if  (direction === "North"){y = parseInt(y)+1}
  else if(direction === "East") {x =  parseInt(x)+1}
  else if(direction === "West") {x =  parseInt(x)-1}
    Position.X = x;
    Position.Y= y;
    Position.Direction=direction;
}

//if Command symbole if 'b' or 'B' move forward with same direction
function BackwardCommand(x,y,direction)
{
  if(direction === "South"){y =  parseInt(y)+1}
  else if  (direction === "North"){y = parseInt(y)-1}
  else if(direction === "East") {x = parseInt(x)-1}
  else if(direction === "West") {x = parseInt(x)+1}
    Position.X = x;
    Position.Y= y;
    Position.Direction=direction;
}
function LeftCommand(x,y,direction)
{
  if(direction === "South"){
    direction="East"
    Rover.style.transform = ' rotate(0)';
  }
  else if  (direction === "North"){
    direction="West"
    Rover.style.transform = 'rotate(-0.25turn)';
  }
  else if(direction === "East") {
    direction="North"
    Rover.style.transform = 'rotate(3.142rad)'; 
  }
  else if(direction === "West") {
    direction="South"
    Rover.style.transform = 'rotate(90deg)';
  }
    Position.X = x;
    Position.Y= y;
    Position.Direction=direction;
}
function RightCommand(x,y,direction)
{
  var Rover = document.getElementById('box');
  if(direction === "South"){
    direction="West"
    Rover.style.transform = 'rotate(3.142rad)'; 
  }
  else if  (direction === "North"){
    direction="East"
    Rover.style.transform = ' rotate(0)';
  }
  else if(direction === "East") {
    direction="South"
    Rover.style.transform = 'rotate(90deg)';
  }
  else if(direction === "West") {
    direction="North"
     Rover.style.transform = 'rotate(-0.25turn)';
  }
    Position.X = x;
    Position.Y= y;
    Position.Direction=direction;
    console.log("Done")
}

//Main Function To move Rover and reassign new coordinates of the rover 
function Start_Move_Rover(x ,y,direction)
{
    var Rover = document.getElementById('box');
    Position.X = x;
    Position.Y= y;
    Position.Direction=direction;
    document.getElementById("Rover_Coordinates").innerHTML = "";
    document.getElementById('Rover_Coordinates').innerHTML += (""+x+","+y+","+direction+"");

    if(x<0 && y>0){ 
    
         x=parseInt(origin_W) + parseInt(x);
         y=parseInt(origin_H) - parseFloat(y)
         Rover.style.left = x+'px';
         Rover.style.top = y+'px';  
    }
    else if(x>0 && y>0){ 

         x=parseInt(origin_W) + parseFloat(x);
         y=parseInt(origin_H) - parseInt(y);
         Rover.style.left = x+'px';
         Rover.style.top = y+'px';  
    }
    else if(x<0 && y<0){ 
        
         x=parseInt(origin_W) + parseInt(x);
         y=parseInt(origin_H) - parseFloat(y);
         Rover.style.left = x+'px';
         Rover.style.top = y+'px';  
    }
   else if(x>0 && y<0){ 
         x=parseInt(origin_W) + parseInt(x);
         y=parseInt(origin_H) - parseFloat(y)
         Rover.style.left = x+'px';
         Rover.style.top = y+'px';  
    }
}

// Onclick function for Excute Command button that moves the rover accourding to each symbole in Command
function ExecuteCommand(){
  
  //Command Text
  var command = document.getElementById('command').value
  var count = parseInt(command.length);
  console.log(count);
  var i=0;
  //setinterval to delay rover move in order to se it 
  setInterval(function(){
    Move_Rover(command[i],Position.X,Position.Y,Position.Direction);
    i++;
    if(count === i) {
        clearInterval(i);
    }
   }, 400);
  }

//Here we Get the seperate symbol and compare it to know which command to Excute
function Move_Rover(command,x,y,direction) {
   if(command === "f" || command ==="F")
   {
     FowrwardCommand(x,y,direction);
     Start_Move_Rover(Position.X,Position.Y,Position.Direction);

   }
   else if (command === "b" || command === "B")
   {
    FowrwardCommand(x,y,direction);
    Start_Move_Rover(Position.X,Position.Y,Position.Direction);

   }
   else if (command === "l" || command === "L")
   {
     LeftCommand(x,y,direction);
     Start_Move_Rover(Position.X,Position.Y,Position.Direction);

   }
   else if (command === "r" || command === "R")
   {
    RightCommand(x,y,direction);
    Start_Move_Rover(Position.X,Position.Y,Position.Direction);
   }
}
