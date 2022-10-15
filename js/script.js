
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
function Place_Rover() {
Start_Move_Rover(document.getElementById('X-axsis').value,document.getElementById('Y-axsis').value,document.getElementById('Direction').value);
}

//dictionary to avoid If Conditions
dictionary = {};
//if Command symbole if 'f' or 'F' move forward with same direction
function ForwardCommand(x,y,direction)
{
  dictionary={
    'North':[x,(parseInt(y)+1)],
    'South':[x,parseInt(y)-1],
    'West':[parseInt(x)-1,y],
    'East':[parseInt(x)+1,y] 
    }
      Position.X=dictionary[direction][0];
      Position.Y = dictionary[direction][1];
      Position.Direction=direction;
     return Position
}
//if Command symbole if 'b' or 'B' move forward with same direction
function BackwardCommand(x,y,direction)
{
  
  dictionary={
    'North':[x,(parseInt(y)-1)],
    'South':[x,parseInt(y)+1],
    'West':[parseInt(x)+1,y],
    'East':[parseInt(x)-1,y] 
    }
      Position.X=dictionary[direction][0];
      Position.Y = dictionary[direction][1];
      Position.Direction=direction;
      return Position
}
function LeftCommand(x,y,direction)
{
  dictionary={
    'North':'West',
    'South':'East',
    'West':'South',
    'East':'North' 
    }
      move_rover_Icon(dictionary[direction]);
      Position.X = x;
      Position.Y= y;
      Position.Direction=dictionary[direction];
      return Position
}
function RightCommand(x,y,direction)
{
  dictionary={
    'North':'West',
    'South':'East',
    'West':'South',
    'East':'North' 
    }
      move_rover_Icon(dictionary[direction]);
      Position.X = x;
      Position.Y= y;
      Position.Direction=dictionary[direction];
      return Position
}
function move_rover_Icon(direction)
{
 var Rover = document.getElementById('box');
 if(direction === "South"){Rover.style.transform = ' rotate(90deg)';}
 else if  (direction === "North"){Rover.style.transform = 'rotate(-0.25turn)';}
 else if(direction === "East") {Rover.style.transform = 'rotate(0)'; }
 else if(direction === "West") { Rover.style.transform = 'rotate(3.142rad)';}
}

//Main Function To move Rover and reassign new coordinates of the rover 
// this function Move rover according to web page height and width by dividing it to 4 quads so we 
// have to check if input (-,+) , (+,+) , (-,-) , (+,-) so we can handele it 
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
   }, 200);
  }

//Here we Get the seperate symbol and compare it to know which command to Excute
function Move_Rover(command,x,y,direction) {
   if(command === "f" || command ==="F")
   {
     Position = ForwardCommand(x,y,direction);
     Start_Move_Rover(Position.X,Position.Y,Position.Direction);

   }
   else if (command === "b" || command === "B")
   {
    Position = BackwardCommand(x,y,direction);
    Start_Move_Rover(Position.X,Position.Y,Position.Direction);

   }
   else if (command === "l" || command === "L")
   {
    Position = LeftCommand(x,y,direction);
     Start_Move_Rover(Position.X,Position.Y,Position.Direction);

   }
   else if (command === "r" || command === "R")
   {
     Position = RightCommand(x,y,direction);
    Start_Move_Rover(Position.X,Position.Y,Position.Direction);
   }
}
