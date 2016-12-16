const_inst_1 = 'LDUDDRUDRRURRRRDRUUDULDLULRRLLLUDDULRDLDDLRULLDDLRUURRLDUDDDDLUULUUDDDDLLLLLULLRURDRLRLRLLURDLLDDUULUUUUDLULLRLUUDDLRDRRURRLURRLLLRRDLRUDURRLRRRLULRDLUDRDRLUDDUUULDDDDDURLDULLRDDRRUDDDDRRURRULUDDLLRRDRURDLLLLLUUUDLULURLULLDRLRRDDLUDURUDRLRURURLRRDDLDUULURULRRLLLDRURDULRDUURRRLDLDUDDRLURRDRDRRLDLRRRLRURDRLDRUDLURRUURDLDRULULURRLDLLLUURRULUDDDRLDDUDDDRRLRDUDRUUDDULRDDULDDURULUDLUDRUDDDLRRRRRDLULDRLRRRRUULDUUDRRLURDLLUUDUDDDLUUURDRUULRURULRLLDDLLUDLURRLDRLDDDLULULLURLULRDLDRDDDLRDUDUURUUULDLLRDRUDRDURUUDDLRRRRLLLUULURRURLLDDLDDD';
const_inst_2 = 'DRURURLLUURRRULURRLRULLLURDULRLRRRLRUURRLRRURRRRUURRRLUDRDUDLUUDULURRLDLULURRLDURLUUDLDUDRUURDDRDLLLDDRDDLUUDRDUDDRRDLDUDRLDDDRLLDDLUDRULRLLURLDLURRDRUDUDLDLULLLRDLLRRDULLDRURRDLDRURDURDULUUURURDLUDRRURLRRLDULRRDURRDRDDULLDRRRLDRRURRRRUURDRLLLRRULLUDUDRRDDRURLULLUUDDRLDRRDUDLULUUDRDDDDLRLRULRLRLLDLLRRDDLDRDURRULLRLRRLULRULDDDRDRULDRUUDURDLLRDRURDRLRDDUDLLRUDLURURRULLUDRDRDURLLLDDDRDRURRDDRLRRRDLLDDLDURUULURULRLULRLLURLUDULDRRDDLRDLRRLRLLULLDDDRDRU';
const_inst_3 = 'URUUDUDRDDRDRRRDLLUDRUDRUUUURDRRDUDUULDUDLLUDRRUDLLRDLLULULDRRDDULDRLDLDDULLDDRDDDLRLLDLLRDUUDUURLUDURDRRRRLRRLDRRUULLDLDLRDURULRURULRRDRRDDUUURDURLLDDUUDLRLDURULURRRDRRUUUDRDDLRLRRLLULUDDRRLRRRRLRDRUDDUULULRRURUURURRLRUDLRRUUURUULLULULRRDDULDRRLLLDLUDRRRLLRDLLRLDUDDRRULULUDLURLDRDRRLULLRRDRDLUURLDDURRLDRLURULDLDRDLURRDRLUUDRUULLDRDURLLDLRUDDULLLLDLDDDLURDDUDUDDRLRDDUDDURURLULLRLUDRDDUDDLDRUURLDLUUURDUULRULLDDDURULDDLLD';
const_inst_4 = 'LRRLLRURUURRDLURRULDDDLURDUURLLDLRRRRULUUDDLULLDLLRDLUDUULLUDRLLDRULDDURURDUUULRUDRLLRDDDURLRDRRURDDRUDDRRULULLLDLRLULLDLLDRLLLUDLRURLDULRDDRDLDRRDLUUDDLURDLURLUDLRDLDUURLRRUULDLURULUURULLURLDDURRURDRLUULLRRLLLDDDURLURUURLLLLDLLLUDLDLRDULUULRRLUUUUDLURRURRULULULRURDDRRRRDRUDRURDUDDDDUDLURURRDRRDRUDRLDLDDDLURRRURRUDLDURDRLDLDLDDUDURLUDUUDRULLRLLUUDDUURRRUDURDRRUURLUDRRUDLUDDRUUDLULDLLDLRUUDUULLDULRRLDRUDRRDRLUUDDRUDDLLULRLULLDLDUULLDRUUDDUDLLLLDLDDLDLURLDLRUUDDUULLUDUUDRUDLRDDRDLDRUUDUDLLDUURRRLLLLRLLRLLRLUUDULLRLURDLLRUUDRULLULRDRDRRULRDLUDDURRRRURLLRDRLLDRUUULDUDDLRDRD';
const_inst_5 = 'DDLRRULRDURDURULLLLRLDDRDDRLLURLRDLULUDURRLUDLDUDRDULDDULURDRURLLDRRLDURRLUULLRUUDUUDLDDLRUUDRRDDRLURDRUDRRRDRUUDDRLLUURLURUDLLRRDRDLUUDLUDURUUDDUULUURLUDLLDDULLUURDDRDLLDRLLDDDRRDLDULLURRLDLRRRLRRURUUDRLURURUULDURUDRRLUDUDLRUDDUDDRLLLULUDULRURDRLUURRRRDLLRDRURRRUURULRUDULDULULUULULLURDUDUDRLDULDRDDULRULDLURLRLDDDDDDULDRURRRRDLLRUDDRDDLUUDUDDRLLRLDLUDRUDULDDDRLLLLURURLDLUUULRRRUDLLULUUULLDLRLDLLRLRDLDULLRLUDDDRDRDDLULUUR';

const keypad = [[1,2,3],[4,5,6],[7,8,9]];
const keypad2 = [[0,0,1,0,0], [0,2,3,4,0], [5,6,7,8,9], [0,'A','B', 'C', 0], [0,0,'D',0,0]];
const location = {x:1, y:1};

function add (x, y, cap) {
  x = parseInt(x);
  y = parseInt(y);
  if ((x + y) > cap) {
    return cap;
  } else {
    return x + y;
  }
}
function subtract (x, y, cap) {
  x = parseInt(x);
  y = parseInt(y);
  if ((x - y) < cap) {
    return cap;
  } else {
    return x - y;
  }
}

function move (current_location, dir) {
  if (dir === 'U') {
    return {
      x: current_location.x,
      y: subtract(current_location.y, 1, 0)
    };
  } else if (dir === 'R') {
    return {
      x: add(current_location.x, 1, 2),
      y: current_location.y
    };
  } else if (dir === 'D') {
    return {
      x: current_location.x,
      y: add(current_location.y, 1, 2)
    };
  } else if (dir === 'L') {
    return {
      x: subtract(current_location.x, 1, 0),
      y: current_location.y
    };
  } else {
    console.log('MOVE ERROR');
    process.exit();
  }
}

function move2 (current_location, dir) {
  if (dir === 'U') {
    let cap = Math.abs(current_location.x - 2);
    return {
      x: current_location.x,
      y: subtract(current_location.y, 1, cap)
    };
  } else if (dir === 'R') {
    let cap = 4 - Math.abs(current_location.y - 2);
    return {
      x: add(current_location.x, 1, cap),
      y: current_location.y
    };
  } else if (dir === 'D') {
    let cap = 4 - Math.abs(current_location.x - 2);
    return {
      x: current_location.x,
      y: add(current_location.y, 1, cap)
    };
  } else if (dir === 'L') {
    let cap = Math.abs(current_location.y - 2);
    return {
      x: subtract(current_location.x, 1, cap),
      y: current_location.y
    };
  } else {
    console.log('MOVE ERROR');
    process.exit();
  }
}

function findSingleCode(input, startingLocation) {
  
  let current_location = JSON.parse(JSON.stringify(startingLocation));
  for(let i = 0;i<input.length;i++) {
    current_location = move2(current_location, input.charAt(i));
  }
  console.log(JSON.stringify(current_location));
  console.log('CODE IS ' + keypad2[current_location.y][current_location.x]);
  return current_location;
}

//let location1 = findSingleCode('ULL', {x:1, y:1});
//let location1 = findSingleCode('ULL', {x:0, y:2});
//let location2 = findSingleCode('RRDDD', location1);
//let location3 = findSingleCode('LURDL', location2);
//let location4 = findSingleCode('UUUUD', location3);

//let location1 = findSingleCode(const_inst_1, {x:1, y:1});
let location1 = findSingleCode(const_inst_1, {x:0, y:2});
let location2 = findSingleCode(const_inst_2, location1);
let location3 = findSingleCode(const_inst_3, location2);
let location4 = findSingleCode(const_inst_4, location3);
let location5 = findSingleCode(const_inst_5, location4);
