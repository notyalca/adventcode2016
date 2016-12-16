const fs = require('fs');


function triangleSort (a,b) {

    a = parseInt(a);
    b = parseInt(b);
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
}



let triangles = [];

fs.readFile('./triangles.txt', 'utf8', function(err, data) {
  if (err) throw err;
  console.log('OK: ' + './triangles.txt');
  triangles = data.split(/\r?\n/);
  for (let i = 0;i<triangles.length;i++) {
    let triangle = triangles[i].split('  ');
    
    triangle = triangle.filter(item => item !== '');
    for (let i = 0;i<triangle.length;i++) {
      triangle[i] = parseInt(triangle[i],10);
    }
    triangle = triangle.sort(triangleSort);
    triangles[i] = triangle;
  }
  //console.log(JSON.stringify(triangles));
  
  let impossible = 0;
  let possible = 0;
  for (let i = 0; i< triangles.length; i++) {
    if (triangles[i][2] >= triangles[i][0] + triangles[i][1]) {
      impossible++;
    } else {
      possible++;
    }
  }
  console.log('1 possible: ' + possible);
  console.log('1 impossible: ' + impossible);
  
  let triangles2 = data.split(/\r?\n/);
  for (let i = 0;i<triangles2.length;i++) {
    let triangle = triangles2[i].split('  ');
    
    triangle = triangle.filter(item => item !== '');
    for (let i = 0;i<triangle.length;i++) {
      triangle[i] = parseInt(triangle[i],10);
    }
    triangles2[i] = triangle;
  }
  let vert_triangles = [];
  let i = 0;
  while (i < triangles2.length) {
    let triangle1 = [triangles2[i][0], triangles2[i+1][0], triangles2[i+2][0]];
    let triangle2 = [triangles2[i][1], triangles2[i+1][1], triangles2[i+2][1]];
    let triangle3 = [triangles2[i][2], triangles2[i+1][2], triangles2[i+2][2]];
    triangle1 = triangle1.sort(triangleSort);
    triangle2 = triangle2.sort(triangleSort);
    triangle3 = triangle3.sort(triangleSort);
    vert_triangles.push(triangle1);
    vert_triangles.push(triangle2);
    vert_triangles.push(triangle3);
    i = i + 3;
  }
  
  impossible = 0;
  possible = 0;
  for (let i = 0; i< vert_triangles.length; i++) {
    if (vert_triangles[i][2] >= vert_triangles[i][0] + vert_triangles[i][1]) {
      impossible++;
    } else {
      possible++;
    }
  }
  console.log('2 possible: ' + possible);
  console.log('2 impossible: ' + impossible);
});
