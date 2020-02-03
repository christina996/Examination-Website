var DataController=(function(){
  //private
  var questions = [
    {
    question: "Who is the strongest?",
    answers: {
    a: "Superman",
    b: "The Terminator",
    c: "Waluigi, obviously"
    },
    correctAnswer: "c"
    },
    {
    question: "What is the best site ever created?",
    answers: {
    a: "SitePoint",
    b: "Simple Steps Code",
    c: "Trick question; they're both the best"
    },
    correctAnswer: "c"
    },
    {
    question: "Where is Waldo really?",
    answers: {
    a: "Antarctica",
    b: "Exploring the Pacific Ocean",
    c: "Minding his own business, so stop asking"
    },
    correctAnswer: "c"
    },
    {
        question: "You should save your computer from?",
        answers: {
        a: "Viruses",
        b: "Time bombs",
        c: "Both a and b"
        },
        correctAnswer: "c"
        },
        {
            question: "World wide web is being standard by?",
            answers: {
            a: "Worldwide corporation",
            b: "w3c",
            c: "World wide web standard"
            },
            correctAnswer: "b"
            },
            {
                question: "A co-processor is?",
                answers: {
                a: "Relatively easy to support in sw",
                b: "quite common in modern computer",
                c: "Works with any application"
                },
                correctAnswer: "a"
                },
];
    var questionTracker = [];
    var questionAmount = 6;
    var randomQuestion;
    var userScore=0;
function existingQuestions() {
    for (var i = 0; i < questionTracker.length; i++) {
      if (questionTracker[i] === randomQuestion) {
        return true;
      }
    }
    return false;
  }
  //public
  return{
      GenerateRandomQuestion:function()
      {
        for (var i = 0; i < questionAmount; i++) {
            do {
            randomQuestion = Math.floor(Math.random() * questions.length);
            } while (existingQuestions());
            questionTracker.push(randomQuestion);
        }
    return {questions:questions,
            questionTracker:questionTracker,
            questionAmount:questionAmount
    }
      },
      ValidateUserAnswers :function (userAnswers)
        {
            for (var i = 0; i < questions.length; i++) {
                if(userAnswers[i]===questions[questionTracker[i]].correctAnswer)
                {
                userScore+=1;
                }
            }
            return userScore;
        }
  }
})();

var UiController=(function(){
    //private
    var questionNumTitle=document.getElementById("quesNo");
    var displayQuestion = document.getElementById("question");
    var displayAnswer1 = document.getElementById("ans-1");
    var displayAnswer2 = document.getElementById("ans-2");
    var displayAnswer3 = document.getElementById("ans-3");
    var circleQuestions=document.querySelectorAll(".circleQuestion");
    var quesOutOf=document.querySelector(".out-of");
    var ans=document.getElementsByName("answer");
    var model=document.querySelector(".modal");
    var overlay=document.querySelector(".overlay");
    var ScoreText=document.querySelector(".modal-body");
    var nameText=document.querySelector(".username");
    var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    nameText.textContent=queryString;
    var Answered=0;

    //public
    return{
        displayQuestionAndAnswersToUser: function (pos,index,questionTracker,questions,questionAmount,userAnswers)
        {
        document.getElementById("answer").classList.remove("hide");
        questionNumTitle.innerHTML="Question No."+pos;
        displayQuestion.innerHTML = questions[questionTracker[index]].question + '<br>'+'<br>'+'<br>';
        displayAnswer1.innerHTML="A) "+questions[questionTracker[index]].answers.a+ '<br>'+'<br>';
        displayAnswer2.innerHTML="B) "+questions[questionTracker[index]].answers.b+ '<br>'+'<br>';
        displayAnswer3.innerHTML="C) "+questions[questionTracker[index]].answers.c+ '<br>'+'<br>';
        circleQuestions[index].classList.toggle("current");
        quesOutOf.innerHTML=pos+"/"+questionAmount;
        for (var i = 0; i < ans.length; i++) 
        {
            if(userAnswers[index]===ans[i].value)
            {
                ans[i].checked=true;
            }
            else
            {
                ans[i].checked=false;
            }   
        }   
        },
        btnVisibility:function(btn,state)
        {
            document.getElementById(btn).style.visibility=state;
        },
        GetUserAnswer:function(index,userAnswers)
        {Answered=0;
            for (var i = 0; i < ans.length; i++) {
                if(ans[i].checked){
                    if(userAnswers[index]===undefined)
                    {
                        userAnswers.push(ans[i].value);
                        
                    }
                    else
                    {
                      userAnswers[index]=ans[i].value;
                    }
                    circleQuestions[index].classList.add("answered");
                    circleQuestions[index].classList.remove("current");
                    circleQuestions[index].classList.remove("not-answered");
                    Answered++;
                }
            }
            if(Answered===0)
            {
            circleQuestions[index].classList.add("not-answered");
            circleQuestions[index].classList.remove("current");
          
            userAnswers.push("");
            }
            return userAnswers;
        },
        ToggleDisplayModel:function(userScore)
        {
            model.classList.toggle("is-visible");
            overlay.classList.toggle("is-visible");
            ScoreText.innerHTML+=userScore;

        },
        changebgcolorOfQues:function(index,userAnswers)
        {circleQuestions[index].classList.toggle("marked");
        circleQuestions[index].classList.remove(".current");
        userAnswers=UiController.GetUserAnswer(index,userAnswers);
        },
        addMarkedQuestions:function (pos,index,questionTracker,questions,questionAmount,userAnswers) {

            var markqes = document.createElement('a');
            markqes.innerHTML="<p>Question"+pos+"</p>";
            markqes.href = "#";
            markqes.addEventListener("click",function(){
                UiController.displayQuestionAndAnswersToUser(pos,index,questionTracker,questions,questionAmount,userAnswers);
                markqes.style.display="none";
                UiController.changebgcolorOfQues(index,userAnswers);
              
            });
            document.querySelector(".marked-list").appendChild(markqes);
     
            
        }
        
    }
  })();

  var AppController=(function(UiCtrl,DataCtrl){
    //private
    var pos=1;
    var index=0;
    var userAnswers=[];
    //1-generate random  questions in array
    var question= DataCtrl.GenerateRandomQuestion();
    //2-display question and answer to user
    UiCtrl.displayQuestionAndAnswersToUser(pos,index,question.questionTracker,question.questions,question.questionAmount,userAnswers);
    //3-question 1 hide previous btn
    UiCtrl.btnVisibility("prev-btn","hidden");
    document.getElementById("Next-btn").addEventListener("click",function()
    {
        UiCtrl.btnVisibility("prev-btn","visible");
        //get answer from user if he choose and save it
        userAnswers=UiCtrl.GetUserAnswer(index,userAnswers);
        pos++;
        index++;
        if(pos<question.questionAmount)
       {   
        UiCtrl.displayQuestionAndAnswersToUser(pos,index,question.questionTracker,question.questions,question.questionAmount,userAnswers);
       }
        else
        {
            UiCtrl.displayQuestionAndAnswersToUser(pos,index,question.questionTracker,question.questions,question.questionAmount,userAnswers);
            UiCtrl.btnVisibility("Next-btn","hidden");
            UiCtrl.btnVisibility("test-submit","visible");
        }
    });
    document.getElementById("prev-btn").addEventListener("click",function()
    {
        UiCtrl.btnVisibility("Next-btn","visible");
        //get answer from user if he choose and save it
        userAnswers=UiCtrl.GetUserAnswer(index,userAnswers);
        index--;
        pos--;
        if(pos>1 && pos<question.questionAmount+1)
        { 
            UiCtrl.displayQuestionAndAnswersToUser(pos,index,question.questionTracker,question.questions,question.questionAmount,userAnswers);
        }
        else
        {
            UiCtrl.displayQuestionAndAnswersToUser(pos,index,question.questionTracker,question.questions,question.questionAmount,userAnswers);
            UiCtrl.btnVisibility("prev-btn","hidden");
        }
    });
    document.getElementById("test-submit").addEventListener("click",function()
    {

            userAnswers=UiCtrl.GetUserAnswer(index,userAnswers);
            var userScore=DataCtrl.ValidateUserAnswers(userAnswers);
            UiCtrl.ToggleDisplayModel(userScore);


    });

    document.getElementById("Marked-btn").addEventListener("click",function()
    {
        UiCtrl.changebgcolorOfQues(index,userAnswers);
        UiCtrl.addMarkedQuestions(pos,index,question.questionTracker,question.questions,question.questionAmount,userAnswers);

    });
    document.querySelector(".modal-close-btn").addEventListener("click",function()
    {
        window.document.location='index.html';
    });
    //public
    return{
        
    }
  })(UiController,DataController);
  