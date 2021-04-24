<template>
  <div class="">
    <div class="flex justify-center">
      <div class="pt-10"><input v-model="n" type="text" v-on:keyup.prevent.enter="lanched"></div>
    </div>
      
    <div class="h-screen flex items-center justify-center">
      <div class="border" >
        <div class="flex flex-wrap" v-for="(t, is) in ts" :key="is">
          <Stile class="" v-for="(v, i) in t" :key="i" :size="t.length" :value="v" :md="md" :sd="sd" :red="red" :blue="blue" :style="`width: 35px; height: 35px;`" />
        </div>
      </div>
    </div>
  </div>
    
</template>

<script>

import billard from '../services/billard.js';
import Stile from './Stile.vue';

export default {
  name: 'Table',
  components: {
    Stile,
  },
  data() {
    return {
      ts: [],
      md: [],
      sd:[],
      buld: [],
      blue: 0,
      red: 0,
      n: 12,
      sens: 1,
    }
  },
  props: {
    size: String
  },

  mounted() {
    this.ts = billard.createdbillardTable(this.n);
    let diagonal = billard.diagonaldbillardTable(this.n, this.ts);
    this.md = diagonal[0];
    this.sd = diagonal[1];
    this.blue;
    this.red;
  },

  methods: {
    lanch: function () {
      let iRed = this.n-1;
      let jRed = 0;
      let aRed = '0';

      let sRB = '+';
      let dRB = 7;

      let iBlue = this.n-1;
      let jBlue = this.n -1;
      let aBlue = '0';
      let tr = 0;

      this.iter(iRed, jRed, aRed, iBlue, jBlue, aBlue, tr, sRB, dRB);

    },

    iter: async function (iRed, jRed, aRed, iBlue, jBlue, aBlue, tr, sRB, dRB) {
      if(tr == 0) 
      {
        tr++;
        this.red  = this.ts[iRed][jRed];
        this.blue = this.ts[iBlue][jBlue];        
        this.iter(iRed, (jRed+1), aRed, iBlue, (jBlue-1), aBlue, tr, sRB, dRB);
      } 
      else 
      {
        await this.onbuld(1);
        if(aRed == '0' && aBlue == '0') {
          this.red  = this.ts[iRed][jRed];
          this.blue = this.ts[iBlue][jBlue];
          let dif = (this.red - this.blue);

          if(Math.abs(dif) == 1)
            this.iter((iRed-1), (jRed-1), '45', iBlue-1, (jBlue+1), '45', tr, sRB, dRB);
          else
            this.iter(iRed, (jRed+1), aRed, iBlue, (jBlue-1), aBlue, tr, sRB, dRB);
        }
        else if(aRed == '45' && aBlue == '45') {

          this.red  = this.ts[iRed][jRed];
          this.blue = this.ts[iBlue][jBlue];

          if((jRed == 0) && (jBlue == 7))
          {
            if(sRB == '+')
            {
              this.iter((iRed-1), (jRed+1), '90', iBlue-1, (jBlue-1), '90', tr, sRB, dRB);
            }
            else 
            {
              this.iter((iRed+1), (jRed+1), '90', (iBlue+1), (jBlue-1), '90', tr, sRB, dRB);
            }
          }
          else if((iRed == 0) && (iBlue == 0))
          {
            this.iter((iRed+1), (jRed-1), '90', (iBlue+1), (jBlue+1), '90', tr, '-', 7);
          }
          else if((iRed == 7) && (iBlue == 7)) {
            this.iter((iRed+1), (jRed-1), '90', (iBlue+1), (jBlue+1), '90', tr, '+', 7);
          }
          else 
          {
            if(dRB == 7)
              this.iter((iRed-1), (jRed-1), '45', iBlue-1, (jBlue+1), '45', tr, sRB, dRB);
            else
              this.iter((iRed+1), (jRed-1), '45', iBlue+1, (jBlue+1), '45', tr, '-', 0);
          }      
        }
        else if(aRed == '90' && aBlue == '90')
        {          
          this.red  = this.ts[iRed][jRed];
          this.blue = this.ts[iBlue][jBlue];
          let dif = (this.red - this.blue);

            if(Math.abs(dif) == 1) {
              if(sRB == '+')
              {
                this.iter((iRed-1), (jRed-1), '45', iBlue-1, (jBlue+1), '45', tr, sRB, dRB);
              }
              else
              {
                if(dRB == 7)
                  this.iter((iRed+1), (jRed+1), '45', iBlue+1, (jBlue-1), '45', tr, sRB, dRB);
                else
                  this.iter((iRed+1), (jRed-1), '45', iBlue+1, (jBlue+1), '45', tr, '-', 0);
              }
            }
            else if((jRed == 0) && (jBlue == 7)) {
              if(sRB == '+')
                this.iter((iRed+1), (jRed-1), '90', (iBlue+1), (jBlue+1), '90', tr, sRB, dRB);
              else
                this.iter((iRed+1), (jRed+1), '90', (iBlue+1), (jBlue-1), '90', tr, sRB, 0);                
            }
            else 
            {
              if(sRB == '+')
                this.iter((iRed-1), (jRed+1), '90', iBlue-1, (jBlue-1), '90', tr, sRB, dRB);
              else
              { 
                if(dRB == 7)
                  this.iter((iRed+1), (jRed-1), '90', (iBlue+1), (jBlue+1), '90', tr, '-', dRB);
                else
                  this.iter((iRed+1), (jRed+1), '90', (iBlue+1), (jBlue-1), '90', tr, sRB, 0);
                
              }
            }
        }
      }
    },

    onbuld: async function(value) {
      return new Promise((resolve) => {
        if(value) {
          setTimeout(() => {resolve(value);}, 500);
        }          
      });
    },

    lanched: function () {
      this.lanch();
    }



  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
