var app = new Vue({
      el: '#clock',
      data:{
         breaklength:5,
         sessionlength:5,
         sessionName:"Session",
         timeLeft:"",
         sessionsecond: 60,
         breaksecond:60,
         globalMin:0,
         globalHour:0,
         bool:true,
         message:"odd",
         ht:0,
         bgc:"#78C087"
      },
    
      computed:{
         sessionhour : {
          cache:false,
          get : function(){
          this.ht=0;
          return Math.floor(this.sessionlength/60);
         }
       },
         sessionminute :{ 
          cache:false,
          get : function(){
               return this.sessionlength-this.sessionhour*60-1;
         }
       },

        breakhour: {
          cache:false,
          
          get:function(){
            this.ht=0;
            return Math.floor(this.breaklength/60);
          }
        },
        breakminute : {
          cache:false,
          get:function(){
            
               return this.breaklength-this.breakhour*60-1;
         }
        }

     },
     watch:{
         sessionlength:function(){
          
          if(this.message=="odd"&&this.sessionName=="Session")
               this.bool=true;
         },
          breaklength:function(){

          if(this.message=="odd"&&this.sessionName=="Break")
               this.bool=true;
         }
         
         
      },
      
      methods:{
        
      	addBreak:function(){
             if(this.message!="even"&&this.sessionName!="Break")
                this.breaklength+=1;

      	},
      	minusBreak:function(){
          if(this.message!="even"&&this.sessionName!="Break"){
               this.breaklength-=1;
               if(this.breaklength<1)
               	   this.breaklength=1;
                }
      	},
        addSession:function(){
        
          if(this.message!="even"&&this.sessionName!="Break")
               this.sessionlength+=1; 
        },
        minusSession:function(){
          if(this.message!="even"&&this.sessionName!="Break"){
               this.sessionlength-=1;
               if(this.sessionlength<1)
               	    this.sessionlength=1;
           }
        },
        toggle:function(message){
          
          
          if(message=="odd"){
            if(this.sessionName=="Session")
             var total=this.sessionlength*60;
           
           
                
           else
               var total=this.breaklength*60;
           
              
            var now=this.globalHour*60*60+this.globalMin*60+this.globalSec;
            this.ht=(total-now)/total*100;
            var self = this;
            var mes="odd";
            if(this.bool){

               this.globalSec = this.sessionsecond;
               this.globalMin = this.sessionminute;
               this.globalHour = this.sessionhour;
               this.bool=false; console.log(this.globalMin);
             }
             console.log( this.globalSec);

            this.globalSec = this.globalSec-1;  //在这行之前this.globalSec为string，如果小于10的话this.globalSec为"09"-"01",这行之后又会变为一个数字。
            if (this.globalSec<0) {
            	this.globalSec=59;
              this.globalMin-=1;
              
            }
            if(this.globalMin<0){
            	if(this.globalHour!=0)
            	    this.globalHour-=1;
              else
                  {
                    this.sessionName="Break";
                    this.ht=0;
                    this.globalSec = this.breaksecond;
                    this.globalMin = this.breakminute;
                    this.globalHour = this.breakhour;
                    this.bgc="red";
                  }

            }

            if (this.globalHour<10) {
            	this.globalHour = "0"+this.globalHour;
             
            }
            if (this.globalSec<10) {
            	this.globalSec = "0"+this.globalSec;console.log( this.globalSec)
            }
            if (this.globalMin<10) {
            	this.globalMin = "0"+this.globalMin;

            }
           
           if(this.globalMin==0&this.globalSec<=0&this.sessionName=="Break")
              {
                alert("You Die !!!");

          }

          
        	if(this.globalHour!=0)
        		this.timeLeft=this.globalHour.slice(-2)+":"+this.globalMin.slice(-2)+":"+this.globalSec;
            
        	else
        	    this.timeLeft=this.globalMin.slice(-2)+":"+this.globalSec;
           this.message="even";
        	t=setTimeout(function(){self.toggle(mes)},1000);    //why 要用self,不能用this???
        	 }
           if(message=="even"){
                  clearTimeout(t);
                  this.message="odd";
           }

        }
      
      }





})

