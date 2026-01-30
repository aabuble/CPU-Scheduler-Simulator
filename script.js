console.log('Happy developing ✨')
const div = document.getElementById("box");
div.style.display = "none";
// DICHIARAZIONE VARIABILI GLOBALI
let p = []; //ARRAY PROCESSI
let at = []; //ARRAY TEMPO DI ARRIVO
let bt = []; //ARRAY TEMPO DI BURST
let rbt = []; //ARRAY TEMPO DI BURST RIMANENTE
let pr = []; //ARRAY PRIORITÀ
let tt = []; //ARRAY TEMPO DI TURNAROUND
let ttM = 0; //TEMPO DI TURNAROUND MEDIO
let ta = []; //ARRAY TEMPO DI ATTESA
let taM = 0; //TEMPO DI ATTESA MEDIO
let tf = []; //ARRAY TEMPO FINALE
let i = 0;
let t =0;    //TEMPO ATTUALE ALL'INTERNO DEL ROUND ROBIN
rbtt =0;     //TEMPO DI BURST RIMANENTE TOTALE
document.getElementById("processo").textContent = "inserire i dati per il processo 0";

/* FUNZIONE RESET
 La tabella dei processi viene sostituita con una tabella vuota
 Il contenuto dei div relativi all'output viene cancellato
*/
function reset(){
   p = [];             
   at = [];             
   bt = [];          
   rbt = [];                
   pr = [];
   tt = [];                //reset array  e altre variabili utilizzate
   ta = [];
   tf = [];
   ttM = 0;
   taM = 0;
   i = 0;
   t = 0;
   rbtt = 0;
   document.getElementById("processo").textContent = "inserire i dati per il processo 0";

   let tableEl = document.getElementById("idTable");
   let oldTBodyEl = tableEl.getElementsByTagName('tbody')[0];
   let newTBodyEl = document.createElement('tbody');

   tableEl.replaceChild(newTBodyEl, oldTBodyEl);
   document.getElementById("output").style.display = "none";
}
/* FUNZIONE START
si inseriscono nel corpo della tabella i dati dei processi  (nome, tempo di arrivo, tempo di burst, tempo di burst rimanente, priorità)  si mostra il diagramma di Gantt di attivazione dei processi
*/
function start(){
   ttM = 0;
   taM = 0;
   tt = [];
   ta = [];
   tf = [];
   t = 0;
   rbttCounter();
   let i;
   // si inseriscono nel corpo della tabella i dati dei processi 
   let tableEl = document.getElementById("idTable");
   let oldTBodyEl = tableEl.getElementsByTagName('tbody')[0];
   let newTBodyEl = document.createElement("tbody");
   for(i=0; i<p.length; i++) {
      rbt[i] = bt[i];
       const trEl = newTBodyEl.insertRow();
       let tdEl = trEl.insertCell();
       tdEl.appendChild(document.createTextNode(p[i]));
       tdEl = trEl.insertCell();
       tdEl.appendChild(document.createTextNode(at[i]));
       tdEl = trEl.insertCell();
       tdEl.appendChild(document.createTextNode(bt[i]));
       tdEl = trEl.insertCell();
       tdEl.id = "idP" + i;
       tdEl.appendChild(document.createTextNode(rbt[i]));
       tdEl = trEl.insertCell();
       tdEl.appendChild(document.createTextNode(pr[i]));
   }
   tableEl.replaceChild(newTBodyEl, oldTBodyEl);
   document.getElementById("output").style.display = "block";
   roundRobin();
   tempoDiTurnaround();
   tempoDiAttesa();
   console.log(ttM+" "+taM);
}

function roundRobin(){
   let f = []; //ARRAY DEI PROCESSI ARRIVATI
   let k = 0;  //VARIABILE TEMPORANEA UTILIZZATA NELL'ARRAY DEI PROCESSI ARRIVATI
   while(rbtt>0){
      f=[];
      k=0;                           //FINCHE IL TEMPO DI BURST RIMANENTE TOTALE NON ARRIVA A 0 QUESTO PROCESSO CONTINUA ALL'INFINITO
     for(i=0; i<p.length; i++){      //SCORRE I PROCESSI REGISTRATI
      if(at[i]<=t && rbt[i]>0){      //QUESTO IF CONTROLLA SE AL TEMPO ATTUALE O QUELLI PRECEDENTI ARRIVANO DEI PROCESSI
         f.push(i);                  //SE SI CREA UN NUOVO PROCESSO NELL'ARRAY PROCESSI ARRIVATI (0-1-2-3-4)
      }
     }
      if(f.length == 1){      //QUESTO IF CONTROLLA SE C'E' UN UNICO PROCESSO ARRIVATO
         for(j=0;j<4;j++){    //QUESTO FOR TOGLIE 4 AL TEMPO RIMANENTE DEL PROCESSO
            if(rbt[f[0]]==0){ //QUESTO IF CONTROLLA SE IL TEMPO RIMANENTE DEL PROCESSO E' 0 IN CASO LO FERMA
               break;
            }
            rbt[f[0]]--;
            t++; 
    
            if(rbt[f[0]]==0){ //QUESTO IF CONTROLLA SE IL TEMPO RIMANENTE DEL PROCESSO E' 0 IN CASO LO FERMA
               tf[f[0]]=t;
               break;
            }
         }
      }else{       
         if(f.length>1){               //SE CE NE SONO PIU' DI 1
         bubbleSort(f);                 //LI METTE DA QUELLO CON PRIORITA' PIU' ALTA A QUELLA PIU' BASSA
            for(k=0;k<f.length;k++){   //E TOGLIE 4 AL TEMPO DI BURST DI OGNI PROCESSO PARTENDO DAL PIU'
               timeSlice(f,k);
            }
         }if(f.length == 0){
            t++;
            continue;
         }
      }
      rbttCounter();
   }
}
function timeSlice(f,k){
         for(j=0;j<4;j++){  //QUESTO FOR TOGLIE 4 AL TEMPO RIMANENTE DEL PROCESSO
            if(rbt[f[k]]==0){ //QUESTO IF CONTROLLA SE IL TEMPO RIMANENTE DEL PROCESSO E' 0 IN CASO LO FERMA
               break;
            }
            rbt[f[k]]--;
            t++;
            if(rbt[f[k]]==0){ //QUESTO IF CONTROLLA SE IL TEMPO RIMANENTE DEL PROCESSO E' 0 IN CASO LO FERMA
               tf[f[k]]=t;
               break;
            }
         }
}
function bubbleSort(f){
   for (i=0;i<f.length-1;i++){
      for(j=0;j<f.length-1;j++){
         if(pr[f[j]]>pr[f[j+1]]) {
            let l=f[j];
            f[j]= f[j+1];
            f[j+1]=l;
         }
      }
   }
}
function rbttCounter(){
      rbtt=0;
      for(i=0; i<p.length; i++) {
      rbtt += rbt[i];
      }
}


function input(){
   const div = document.getElementById("box");
   if(div.style.display == "none") {
      div.style.display = "block";
   }else{
      div.style.display = "none";
   }
}
function register(){
   if(document.getElementById("InPr").value >= 0 && document.getElementById("InPr").value <= 10){
      if(document.getElementById("InTa").value >= 0){
         if(document.getElementById("InTb").value > 0){
      p[i] = i;
      at[i] = Number(document.getElementById("InTa").value);
      bt[i] = Number(document.getElementById("InTb").value);
      rbt[i] = bt[i];
      pr[i] = Number(document.getElementById("InPr").value);
      alert("registrazione del processo "+i+" avvenuta");
      i++;
   
      document.getElementById("processo").innerHTML = "inserire i dati per il processo "+ i;
      document.getElementById("InTa").value = "";
      document.getElementById("InTb").value = "";
      document.getElementById("InPr").value = "";
         }else{alert("tempo di burst non valido (>0)");}
      }else{alert("tempo di arrivo non valido (>0)");}
   }else{alert("priorità non valida (0-10)");}
}

function tempoDiTurnaround(){
   for(i=0;i<p.length;i++){
      tt[i]=tf[i]-at[i];
      ttM+= tt[i];
   }
   ttM=ttM/p.length;
}

function tempoDiAttesa(){
   for(i=0;i<p.length;i++){
      ta[i]=tt[i]-bt[i];
      taM += ta[i];
   }
   taM=taM/p.length;
}