import { Array } from "core-js";

class BillardService {

  constructor() {}

  createdbillardTable(n) {
    let k = 1;
    let t = new Array(n).fill().map(() => new Array(n));

    for (let i = 0; i < n; i++) 
    {
      for (let j = 0; j < n; j++) {
        t[i][j] = k++;
      }
    }
    return t;
  }


  diagonaldbillardTable(n, t) {
    let md = [];
    let sd = [];

    for(let i = 0; i < n; i++)
    {
      for(let j = 0; j < n; j++)
      {
        if(i == j)
          md.push(t[i][j]);
        
        if(n-i-1 == j)
          sd.push(t[i][j]);
      }
    }

    return [md, sd];
  }
}

export default new BillardService();