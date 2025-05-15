
let aviso = document.querySelector('#aviso')
let formulario = document.querySelector('form')

let btnCalcular = document.querySelector('#btnCalcular')
let btnLimpar = document.querySelector('#btnLimpar')

// selecionar caixas de texto por id
let cxNota1 = document.querySelector('#nota1')
let cxNota2 = document.querySelector('#nota2')
let cxNota3 = document.querySelector('#nota3')
let cxNota4 = document.querySelector('#nota4')
let cxMedia = document.querySelector('#media')
let cxSituacao = document.querySelector('#situacao')

// CALCULAR MEDIA
function calcularMedia(n1, n2, n3, n4) {
    return (n1 + n2 + n3 + n4) / 4
}

// DEFINIR SITUACAO FINAL COM BASE NA MEDIA
function situacaoFinal(mediaFinal) {
    let situacaoFinal = ''
    
    if (mediaFinal >= 7) {
        situacaoFinal = 'Aprovado(a)'
    } else if (mediaFinal <= 3) {
        situacaoFinal = 'Reprovado(a)'
    } else {
        situacaoFinal = 'Recuperação'
    }
    return situacaoFinal
}

// FORMATAR A CAIXA DE SITUACAO FINAL
function formatarSituacao(situacaoFinal) {
    console.log('Situação Final ' + situacaoFinal)
    switch(situacaoFinal) {

        case 'Aprovado(a)':
            cxSituacao.classList.remove('reprovado')
            cxSituacao.classList.remove('recuperacao')
            cxSituacao.classList.add('aprovado')
            console.log('adicionar class aprovado')
            break
        
        case 'Reprovado(a)':
            cxSituacao.classList.remove('aprovado')
            cxSituacao.classList.remove('recuperacao')
            cxSituacao.classList.add('reprovado')
            console.log('adicionar class reprovado')
            break
        
        case 'Recuperação':
            cxSituacao.classList.remove('aprovado')
            cxSituacao.classList.remove('reprovado')
            cxSituacao.classList.add('recuperacao')
            console.log('adicionar class recuperacao')
                break

        default:
            console.log('Situação Indefinida')
    } // fim do switch case

}

// VALIDAR E GERAR FLASH MESSAGE

function validarNumero() {
    let notas = [cxNota1.value, cxNota2.value, cxNota3.value, cxNota4.value]

    for (let nota of notas) {
        let valor = parseFloat(nota)
        if (isNaN(valor) || valor < 0 || valor > 10) {
            formulario.reset()
            aviso.textContent = 'Digite notas entre 0.0 e 10.0'
            aviso.classList.add('alerta')
            setTimeout(function(){
                aviso.textContent = ''
                aviso.classList.remove('alerta')
            }, 2000)
            return false
        }
    }
    return true
}


// CALCULAR A MEDIA APOS O CLICK NO BOTAO
btnCalcular.addEventListener('click', function(e) {
    e.preventDefault() 
    if (!validarNumero()) return
    console.log('Calcular Média')

    let nota1 = parseFloat(cxNota1.value)
    let nota2 = parseFloat(cxNota2.value)
     let nota3 = parseFloat(cxNota3.value)
      let nota4 = parseFloat(cxNota4.value)
    let media = calcularMedia(nota1, nota2, nota3, nota4)
    
     console.log(nota1, nota2, nota3, nota4, media)

    if(isNaN(media) || media < 0) {
        console.log("Não é um número")
        cxSituacao.value = ''
    } else {
         cxMedia.value = media.toFixed(1)
        let situacao = situacaoFinal(media)
        cxSituacao.value = situacao
        formatarSituacao(situacao)
    }
   
})

// APOS LIMPAR TIRAR AS CLASS DA CX SITUACAO
btnLimpar.addEventListener('click', function() {
    cxSituacao.classList.remove('aprovado')
    cxSituacao.classList.remove('reprovado')
    cxSituacao.classList.remove('recuperacao')
})