var DataController=(function()
{
    //private 
    var arrayofusers=[]; 

    function User(name,age,phone,email,pass,passconf,gender)
    {
        this.name=name;
        this.age=age;
        this.phone=phone;
        this.email=email;
        this.pass=pass;
        this.passconf=passconf;
        this.gender=gender;
    };
    
    //public 
    return{
        AddNewObjectToArray :function(gender,name,age,phone,email,pass,passconf)
        {
            var newUser=new User(name,age,phone,email,pass,passconf,gender);
            arrayofusers.push(newUser);
            return arrayofusers;
        }
        

    }
})();
var UiController=(function()
{
    //private 

    //public 
    return{
        getInputs: function()
        {
            var gendr=document.getElementsByName("gender");
            for (var i = 0; i < gendr.length; i++) {
                if(gendr[i].checked){
                    var gender=gendr[i].value;
                }
            }
            return{
                name: document.getElementById("name").value,
                passconf: document.getElementById("confirmpassword").value,
                age:document.getElementById("age").value,
                pass:document.getElementById("password").value,
                phone:document.getElementById("phone").value,
                email:document.getElementById("email").value,
                gender:gender

            }
        },
        checkname:function(name)
        {
            if(name=="")
            {
                document.getElementById("userName").style.visibility="visible"
                document.getElementById("userName").innerHTML="*please fill the Name";
                document.getElementById("name").focus();
                return false;
            }
            else if(!isNaN(name))
            {
                document.getElementById("userName").style.visibility="visible"
                document.getElementById("userName").innerHTML="*please enter characters";
                document.getElementById("name").focus();
                return false;
            }
            else if((name.length<3) || (name.length>20))
            {
                document.getElementById("userName").style.visibility="visible"
                document.getElementById("userName").innerHTML="*please fill Name Between 3-20";
                document.getElementById("name").focus();
                return false;
            }
            else
            {
                document.getElementById("userName").style.visibility="hidden";
                return true;
            }
        },
        checkage:function (age)
        {
           
            if(age==="")
            {
                document.getElementById("userAge").style.visibility="visible";
                document.getElementById("userAge").innerHTML="*please fill the Age";
                document.getElementById("age").focus();
                return false;
            }
            else if(age<1 || age>99)
            {
                document.getElementById("userAge").style.visibility="visible";
                document.getElementById("userAge").innerHTML="*please fill Age Between 1-99";
                document.getElementById("age").focus();
                return false;
            }
            else
            {
                       document.getElementById("userAge").style.visibility="hidden";
                        return true;
    
            }
        },
        checkphone:function (phone)
        {
           
                     if(phone==="")
                        {   document.getElementById("userPhone").style.visibility="visible";
                            document.getElementById("userPhone").innerHTML="*please fill the phone";
                            document.getElementById("phone").focus();
                            return false;
                        }
                    else if(phone.length!=11)
                        {
                            document.getElementById("userPhone").style.visibility="visible";
                            document.getElementById("userPhone").innerHTML="*please fill valid phone 11 digits ";
                            document.getElementById("phone").focus();
                            return false;
                        }
                        else
                        {
    
                            document.getElementById("userPhone").style.visibility="hidden";
                            
                            return true
                        }
    
        },
        checkemail:function (email)
        {
          
            if(email==="")
            {
                document.getElementById("userEmail").style.visibility="visible";
                document.getElementById("userEmail").innerHTML="*please fill the Email";
                document.getElementById("email").focus();
                return false;
            }
         else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
            {
                document.getElementById("userEmail").style.visibility="visible";
                document.getElementById("userEmail").innerHTML="*please enter valid Email";
                document.getElementById("email").focus();
                return false;
            }
            else
            {
                document.getElementById("userEmail").style.visibility="hidden";
    
                return true;
            }
    
    
        },
        checkpass:function (pass){
    
            if(pass=="")
                {
                    document.getElementById("userPassword").style.visibility="visible";
                    document.getElementById("userPassword").innerHTML="*please fill the Password";
                    document.getElementById("password").focus();
                    return false;
                }
               else if(pass.length<8 || pass.length>20)
                {
                    document.getElementById("userPassword").style.visibility="visible";
                    document.getElementById("userPassword").innerHTML="*please atleast 8 characters";
                    document.getElementById("password").focus();
                    return false;
                }
                else
                {
                    document.getElementById("userPassword").style.visibility="hidden";
                  
                    return true;
                }


    },
    checkconfpass:function (pass,passconf)
    {       
    if(passconf==="")
    {
        document.getElementById("userConfPass").style.visibility="visible";
        document.getElementById("userConfPass").innerHTML="*please fill Confirm Password";
        document.getElementById("confirmpassword").focus();
        return false;
    }
    else if(pass !==passconf)
    {
        document.getElementById("userConfPass").style.visibility="visible";
        document.getElementById("userConfPass").innerHTML="*password not match"; 
        document.getElementById("confirmpassword").focus();
        return false;
    }
    else
    {

        document.getElementById("userConfPass").style.visibility="hidden";

        return true;
    }

    }

    }
})();
var AppController=(function(UICtrl, DataCtrl)
{
    //private 
    document.getElementById("regtration-btn").addEventListener("click",function()
    {
      //get inputs 
      var inputs=UICtrl.getInputs();
      //check inputs
      var namCheck=UICtrl.checkname(inputs.name);
      var agecheck=UICtrl.checkage(inputs.age);
      var phonecheck=UICtrl.checkphone(inputs.phone);
      var mailCheck=UICtrl.checkemail(inputs.email);
      var passCheck=UICtrl.checkpass(inputs.pass);
      var confpassCheck=UICtrl.checkconfpass(inputs.pass,inputs.passconf);
      if(namCheck &&mailCheck&&phonecheck&&passCheck&&confpassCheck&&agecheck)
      {
        var arrayofusers= DataCtrl.AddNewObjectToArray(inputs.gender,inputs.name,inputs.age,inputs.phone,inputs.email,inputs.pass,inputs.passconf);
        var queryString = "?" + inputs.name;
        window.location.href = "index3.html" + queryString;
      }
    });

    //public 
    return{
        
    }
})(UiController,DataController);