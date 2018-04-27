/****
 *  LOGIN
 ****/

    var ModuleSubmitFormLogin = (function(){
        var self = {};
        var form = document.querySelector('#formLogin');
        
        var tokenFromStorage = localStorage.getItem('token');
        var disconnectBtn = document.querySelector('#deconnectionLink');
        var page = "index"; //"member-only";
        var config = {};

        self.formSubmit = function(){
            form.addEventListener("submit", function (event) {				
                // crée une verification des champs du formulaire	
                event.preventDefault();
                console.log('loginUserWithXHR');		
                var email = document.getElementById('email').value;
                var password = document.getElementById('password').value;
                var payLoad = "email=" + email + "&" + "password=" + password; 
                // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send
                var xhr = new XMLHttpRequest();
                xhr.open("POST", '/login', true);

                //Send the proper header information along with the request
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

                xhr.onreadystatechange = function() {//Call a function when the state changes.
                    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                        // add token to localStorage
                        var token = xhr.response;
                        localStorage.setItem('token', token);
                        form.reset();
                        window.location.replace("/");
                    }
                }				
                
                xhr.send(payLoad); 				
           
            });
        }

        self.getTokenStorage = function() { 
               
            console.log('getTokenStorage tokenFromStorage', tokenFromStorage);   
            
           // connectionLinkNav.setAttribute("href", "/login");
            if(tokenFromStorage) {
                var base64Payload = tokenFromStorage.split('.')[1];                
                console.log('------------------------------------');
                console.log(JSON.parse(JSON.stringify(window.atob(base64Payload))));
                console.log('------------------------------------'); 
            } else {
                console.log('------------------------------------');
                console.warn('NO TOKEN');
                console.log('------------------------------------');
            } 
        }

        self.deconnect = function(){
            if(document.querySelector('nav')){
                disconnectBtn.addEventListener('click', function() {
                    localStorage.removeItem('token');
                });
            }
            
        }

        self.memberOnly = function(){
            tokenFromStorage = localStorage.getItem('token');
            
            if(tokenFromStorage) {
                config.headers =  {'Authorization': "Bearer " + JSON.parse(tokenFromStorage)}
                
                var movie  = document.getElementById("movie");
                movie.href= "/movies?Authorization=Bearer " + JSON.parse(tokenFromStorage)
                /* axios.get( 
                    'http://localhost:3000/' + page,
                    config
                ).then((res) => {
                    console.log('success');
                // console.log(res);  
                console.log('------------------------------------');
                console.log("on recupere les donner encoder dans le token pour pouvoir les afficher");
                console.log(res.data.user + " -- " + res.data.role + " -- " + res.data.iss);
                console.log('------------------------------------');
                })
                .catch(err => {
                    console.error('makeRequestWithToken err', err);
                }); */
            }
        }

        return self;
    })();

    ModuleSubmitFormLogin.formSubmit();
    ModuleSubmitFormLogin.getTokenStorage();
    ModuleSubmitFormLogin.deconnect();
    ModuleSubmitFormLogin.memberOnly();	

            
/****
 *  INSCRIPTION
 ****/
var ModuleInscription = (function(){
    var self = {};
    var contentEntreprise = document.getElementById('container-entreprise');
    var radioOui = document.getElementById('radioOui');
    var radioNon = document.getElementById('radioNon');
    var btnSubmit = document.getElementById('subInscription');

    function entrepriseOK() {
        radioOui.addEventListener('click', function(){
            contentEntreprise.style.display = "block";
            checkedRadio(radioOui, radioNon); 
            btnSubmit.setAttribute("name", "entreprise");
           
        })         
    }

    function entrepriseNon() {
        radioNon.addEventListener("click", function(){
            document.getElementById('container-entreprise').style.display = "none";
            checkedRadio(radioNon, radioOui); 
            btnSubmit.setAttribute("name", "user");
        })
        
    }

    function checkedRadio(check, noChecked){
        if(check.checked){
            noChecked.checked = false;
        }
    }


    self.init = function(){
        entrepriseOK();
        entrepriseNon();
    }

    return self;
})();

ModuleInscription.init();
