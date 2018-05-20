/****
 *  LOGIN
 ****/
//console.log(document.session['user'].value);
    var ModuleSubmitFormLogin = (function(){
        var self = {};
        var form = document.querySelector('#formLogin');
        
        var disconnectBtn = document.querySelector('#deconnectionLink');
    

        self.formSubmit = function(){
            form.addEventListener("submit", function (event) {				
                // crée une verification des champs du formulaire	
                event.preventDefault();
                console.log('loginUserWithXHR');		
                var email = document.getElementById('email').value;
                var password = document.getElementById('password').value;
                var payLoad = "email=" + email + "&" + "pwd=" + password; 
                // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send
                var xhr = new XMLHttpRequest();
                xhr.open("POST", '/login/login', true);

                //Send the proper header information along with the request
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

                xhr.onreadystatechange = function() {//Call a function when the state changes.
                    if(xhr.readyState == XMLHttpRequest.DONE) {
                        console.log('------------------------------------');
                        console.log(xhr.response);
                        console.log('------------------------------------'); xhr.response;
                        form.reset();
                       // document.location.href = "/all-users";
                    }else if(xhr.readyState == XMLHttpRequest.DONE){
                        console.log('------------------------------------');
                        var a = JSON.parse(xhr.response);
                        console.log(a.error);
                        console.log('------------------------------------');
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
            
                    localStorage.removeItem('token');
           
           
            
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

    //ModuleSubmitFormLogin.formSubmit();
   // ModuleSubmitFormLogin.getTokenStorage();
   if (document.querySelector('#formLogin')){
    ModuleSubmitFormLogin.formSubmit();   
   }
   // ModuleSubmitFormLogin.formSubmit();
    //ModuleSubmitFormLogin.memberOnly();	

            
/****
 *  INSCRIPTION
 ****/
var ModuleInscription = (function(){
    var self = {};
    var contentEntreprise = document.getElementById('container-entreprise');
    var radioOui = document.getElementById('radioOui');
    var radioNon = document.getElementById('radioNon');
    var btnSubmit = document.getElementById('subInscription');
    var tokenFromStorage = localStorage.getItem('token');
    var form = document.getElementById(' formUpdate ') || document.getElementById('formInscription');

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
    function isFormUpdate(){
        if(document.getElementById(' formUpdate ')){
           return true;
        }else{
            return false;
        }
    }
    self.formSubmit = function(){
        form.addEventListener("submit", function (event) {				
            // crée une verification des champs du formulaire	
            event.preventDefault();
            console.log('Inscription XHR');		
            var name = document.getElementById('prenom').value;
            var lastName = document.getElementById('nom').value;
            var email = document.getElementById('emailInscription').value;
            if(isFormUpdate()){
                var payLoad = "name=" + name + "&" + "lastName=" + lastName + "&" + "email=" + email;
            }else{
                var pwd = document.getElementById('pwd').value;       
                var payLoad = "name=" + name + "&" + "lastName=" + lastName + "&" + "email=" + email + "&" + "pwd=" + pwd;
            }
             
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send
            console.log('------------------------------------');
            console.log(payLoad);
            console.log('------------------------------------');
            var xhr = new XMLHttpRequest();
            var path = '/login/inscription';
            if(isFormUpdate()){
                var id = this.getAttribute("data-id");
                path = '/user-update/' + id
            }
            console.log(path);
            xhr.open("POST", path, true);

            //Send the proper header information along with the request
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {//Call a function when the state changes.
                if(xhr.readyState == XMLHttpRequest.DONE ) {
                    console.log('------------------------------------');
                    console.log(xhr.response);
                    console.log('------------------------------------'); xhr.response;
                    form.reset();
                    if(isFormUpdate()){
                        document.location.href = "/user-details/"+ id;
                    }
                }else if(xhr.readyState == XMLHttpRequest.DONE){
                    console.log('------------------------------------');
                    var a = JSON.parse(xhr.response);
                    console.log(a.error);
                    console.log('------------------------------------');
                }
            }				
            
            xhr.send(payLoad); 				
       
        });
    }

    self.init = function(){
        if(contentEntreprise){
            entrepriseOK();
        entrepriseNon();
        }
    }

    return self;
})();
if(document.getElementById(' formUpdate ') || document.getElementById('formInscription')){
    console.log("ok");
    ModuleInscription.init();
    ModuleInscription.formSubmit();
}
console.log('------------------------------------');
console.log(document.getElementById(' formUpdate ') );
console.log('------------------------------------');