const input = "R3, L5, R2, L2, R1, L3, R1, R3, L4, R3, L1, L1, R1, L3, R2, L3, L2, R1, R1, L1, R4, L1, L4, R3, L2, L2, R1, L1, R5, R4, R2, L5, L2, R5, R5, L2, R3, R1, R1, L3, R1, L4, L4, L190, L5, L2, R4, L5, R4, R5, L4, R1, R2, L5, R50, L2, R1, R73, R1, L2, R191, R2, L4, R1, L5, L5, R5, L3, L5, L4, R4, R5, L4, R4, R4, R5, L2, L5, R3, L4, L4, L5, R2, R2, R2, R4, L3, R4, R5, L3, R5, L2, R3, L1, R2, R2, L3, L1, R5, L3, L5, R2, R4, R1, L1, L5, R3, R2, L3, L4, L5, L1, R3, L5, L2, R2, L3, L4, L1, R1, R4, R2, R2, R4, R2, R2, L3, L3, L4, R4, L4, L4, R1, L4, L4, R1, L2, R5, R2, R3, R3, L2, L5, R3, L3, R5, L2, R3, R2, L4, L3, L1, R2, L2, L3, L5, R3, L1, L3, L4, L3";
//const input = 'R2, L3';
//const input = 'R2, R2, R2';
//const input = "R5, L5, R5, R3";
//const input = 'R8, R4, R4, R8';
const formattedInput = input.split(",").map(function (val) {
  return val.trim();
});

const ordered_cardinals = ['N', 'E', 'S', 'W'];

function turn (original_direction, handed_turn) {
  let orig_index = ordered_cardinals.indexOf(original_direction);
  let left_index = orig_index -1;
  let right_index = orig_index +1;
  if (right_index === 4) {
    right_index = 0;
  }
  if (left_index === -1) {
    left_index = 3;
  }
  if (handed_turn === 'R') {
    return ordered_cardinals[right_index];
  }
  
  if (handed_turn === 'L') {
    return ordered_cardinals[left_index];
  }
  console.log('TURN ERROR');
  process.exit();
}

function move (location, direction, amount) {
  amount = parseInt(amount);
  if (direction === 'N') {
    location.vert = location.vert + amount;
    return location;
  }
  if (direction === 'E') {
    location.horiz = location.horiz + amount;
    return location;
  }
  if (direction === 'S') {
    location.vert = location.vert - amount;
    return location;
  }
  if (direction === 'W') {
    location.horiz = location.horiz - amount;
    return location;
  }
  console.log('MOVE ERROR');
  process.exit();
}

//side-effect: adds to past_locations
function locationsBetween(current_location, previous_location, past_locations) {
  if (current_location.vert !== previous_location.vert) {
    if (current_location.vert > previous_location.vert) {
      for (let i =previous_location.vert+1;i<current_location.vert+1;i++){
        let new_location = i + ',' + current_location.horiz;
        if (past_locations.indexOf(new_location) > -1){
          console.log('VISITED ' + new_location + ' TWICE');
          console.log('which is ' + (Math.abs(i) + Math.abs(current_location.horiz)) + ' from the beginning');
        }
        past_locations.push(new_location);
      }
    } else {
      for (let i =previous_location.vert-1;i>current_location.vert-1;i--){
        let new_location = i + ',' + current_location.horiz;
        if (past_locations.indexOf(new_location) > -1){
          console.log('VISITED ' + new_location + ' TWICE');
          console.log('which is ' + (Math.abs(i) + Math.abs(current_location.horiz)) + ' from the beginning');
        }
        past_locations.push(new_location);
      }
    }
  } else {
    if (current_location.horiz > previous_location.horiz) {
      for (let i =previous_location.horiz+1;i<current_location.horiz+1;i++){
        let new_location = current_location.vert + ',' + i;
        if (past_locations.indexOf(new_location) > -1){
          console.log('VISITED ' + new_location + ' TWICE');
          console.log('which is ' + (Math.abs(i) + Math.abs(current_location.vert)) + ' from the beginning');
        }
        past_locations.push(new_location);
      }
    } else {
      for (let i =previous_location.horiz-1;i>current_location.horiz-1;i--){
        let new_location = current_location.vert + ',' + i;
        if (past_locations.indexOf(new_location) > -1){
          console.log('VISITED ' + new_location + ' TWICE');
          console.log('which is ' + (Math.abs(i) + Math.abs(current_location.vert)) + ' from the beginning');
        }
        past_locations.push(new_location);
      }
    }
  }
}

let current_location = {vert: 0, horiz: 0};
let previous_location = {vert: 0, horiz: 0};
let current_direction = 'N';
let visited = ["0,0"];

for (let i = 0;i < formattedInput.length; i++) {
  
  let turn_dir = formattedInput[i].charAt(0);
  current_direction = turn(current_direction, turn_dir);
  previous_location = JSON.parse(JSON.stringify(current_location));
  current_location = move(current_location, current_direction, formattedInput[i].substr(1));
  locationsBetween(current_location, previous_location, visited);
  console.log(JSON.stringify(current_location));
  
  
}

console.log('Distance = ' + (Math.abs(current_location.vert) + Math.abs(current_location.horiz)));
//console.log(JSON.stringify(visited));

