import * as alt from "alt-client";
import  '/client/panels/chat';
import * as game from "natives"

alt.onServer('tpto', tpToWaypoint);//sending the function to the server side if requested

function tpToWaypoint() {
  let waypoint = game.getFirstBlipInfoId(8);
  if (game.doesBlipExist(waypoint))
   {
     var coords = game.getBlipInfoIdCoord(waypoint);
     var res = game.getGroundZFor3dCoord(coords.x, coords.y, coords.z, undefined, undefined)[0];
     console.log(res);
     var  Gz =coords.z;
        setTimeout(() => { 
          res = game.getGroundZFor3dCoord(coords.x, coords.y, Gz+2, undefined, undefined)[0];
          while (!res) {
        Gz=Gz+1;
        res=game.getGroundZFor3dCoord(coords.x, coords.y, Gz+1, undefined, undefined)[0];
         if (Gz>800) {
           Gz=0;
           break;
         }
      }
},100);
      if (!res){ 
        console.log('failed to load ground,Don t worry i will handle that!');//if the player spawned before the texture 
          setTimeout(() => {   
            while (!res) {
              Gz=Gz+1;
              res=game.getGroundZFor3dCoord(coords.x, coords.y, Gz+1, undefined, undefined)[0];
              if (Gz>790) {

                break;
              }
            }                                             //this will help out
            game.setPedCoordsKeepVehicle(alt.Player.local, coords.x, coords.y,Gz);  //if textures already loaded then nothing to worry about :)         

        }, 1000); 
      };
      game.setPedCoordsKeepVehicle(alt.Player.local, coords.x, coords.y,coords.z);  //if textures already loaded then nothing to worry about :)         
  }
};


 

