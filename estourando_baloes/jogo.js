var timerId = null; //variavel q armazena a chamada da função timeout

function iniciaJogo(){
	var url = window.location.search;

	var nivel_jogo = url.replace("?", "");

	var tempo_seg = 0;

	if(nivel_jogo == 1){
		//facil - 120 segundos
		tempo_seg = 120;
	}
	if(nivel_jogo == 2){
		//normal - 60 segundo
		tempo_seg = 60;
	}
	if(nivel_jogo == 3){
		//dificl - 30 segundos
		tempo_seg = 30;
	}

//inserir os segundo no span cronometro
document.getElementById('cronometro').innerHTML = tempo_seg;
//qtd de baloes
var qtd_baloes = 30;
criaBaloes(qtd_baloes);

//imprimir qtd_baloes_inteiros
document.getElementById('baloes_inteiros').innerHTML = qtd_baloes;
document.getElementById('baloes_estourados').innerHTML = 0;

contagem_tempo(tempo_seg + 1);
}

function contagem_tempo(segundos){
	segundos = segundos - 1;
	if(segundos == -1){
		clearTimeout(timerId); //para a execução da função sitetimeout
		game_over();
		return false;
	}

	document.getElementById('cronometro').innerHTML = segundos;
	timerId = setTimeout("contagem_tempo("+segundos+")", 1000);
}

function game_over(){
	remove_evento_baloes();
	alert('fim de jogo, você nao conseguiu estourar todos os valões a tempo');

}

function criaBaloes(qtd_baloes){
	for(var i = 1; i<=qtd_baloes; i++){
		var balao = document.createElement("img");
		balao.src = 'imagens/balao_azul_pequeno.png';
		balao.style.margin = '11px';
		balao.id = 'b'+i;
		balao.onclick = function(){
			estourar(this);
		}

		document.getElementById('cenario').appendChild(balao);
	}
}

function estourar(e){
	var id_balao = e.id;
	document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';
	pontuacao(-1);
	document.getElementById(id_balao).setAttribute('onclick', '');
	//alert(id_balao);
}
function pontuacao(acao){

	var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
	var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);

	baloes_inteiros = baloes_inteiros + acao;
	baloes_estourados = baloes_estourados - acao;

	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

	situacao_jogo(baloes_inteiros);
// alert(baloes_inteiros);
// alert(baloes_estourados);
}

function situacao_jogo(baloes_inteiros){
	if(baloes_inteiros == 0){
		alert('Parabéns você coseguiu estourar todos os balões a tempo!!!');
		parar_jogo();
	}
}

function parar_jogo(){
	clearTimeout(timerId);
}

function remove_evento_baloes(){
	var i = 1;

	while(document.getElementById('b'+i)){
		document.getElementById('b'+i).onclick = '';
	}
}