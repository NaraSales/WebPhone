var server_ip = "10.0.0.159"
var server = `ws://${server_ip}:8088/ws`;
var aor = `sip:1000@${server_ip}`;
var authorizationUsername = '1000';
var authorizationPassword = '7777';

var delegate = {
    onCallReceived: function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Chamada recebida!');
                    if (window.confirm("Atender")) {
              return [4, simpleUser.answer()];
          } else{
            return [4];
          }                    		
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    }); }
};

var options = {
    aor: aor,
    delegate: delegate,
    media: {
        remote: {
            audio: getAudioElement("remoteAudio")
        }
    },
    userAgentOptions: {
        authorizationPassword: authorizationPassword,
        authorizationUsername: authorizationUsername,
    }
};

var simpleUser = new SIP.Web.SimpleUser(server, options);

simpleUser.connect()
  .then(() => document.getElementById('checkConexao').checked = true )
 //

simpleUser.register()
  .then(() => document.getElementById('checkRegistro').checked = true, testeConexao());
  // document.write('Registrado!'));

function call() {
  
  var call_number = parseInt( document.getElementById('GetNramal').value);
  var campo = document.getElementById('GetNramal')
  if(call_number ==100) {alert('Error');call_number.value=''; campo.focus();}
  
    
  
  console.log(call_number)

  var destination = `sip:${call_number}@${server_ip}`;
  simpleUser.call(destination);
  console.log(call_number)

}

function hangup() {
  simpleUser.hangup();
}

function answer() {
  simpleUser.answer();
  wait(60);
  if (wait < 60) { simpleUser.hangup();}
}		

function testeConexao(){
  var status = document.getElementById('checkRegistro').checked;
  console.log(status)
  let corLed = document.getElementById('led');
  if(status === true) { 
    corLed.style.backgroundColor = '#12df29'
  }else {
    corLed.style.backgroundColor = '#ec1f13'
  }
}

function limparInput(){
  document.getElementById('GetNramal').innerHTML ='digite...';
}
