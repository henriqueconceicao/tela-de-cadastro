class Validator{
    constructor(){
        this.validations = [
            'data-required',
            'data-min-length', 
            'data-max-length',
            'data-email-validate',
            'data-only-letters',
            'data-equal',
            'data-password-validate',
            
        ]
    }
// iniciar a validação de todos os campos
validate(form){

    // Resgata todas as validações
    let currentVallidations = document.querySelectorAll('form .error')
    if(currentVallidations.length > 0){
        this.cleanValidations(currentVallidations)
    }

    // pegar todos os input
    let inputs = form.getElementsByTagName('input')
    //HTMLCollaction -> array
    let inputsArray = [...inputs]
//Loop nos inputs e validação no que for encontrado
    inputsArray.forEach(function(input){
// loop em todas as validações
    for(let i = 0; this.validations.length > i; i++){
// Verifica se a validação atual existe no input
        if(input.getAttribute(this.validations[i])!= null ) {
            // limpando a string para virar um metodo
            let method = this.validations[i].replace('data-','').replace('-','')
            // Valor do input 
            let value = input.getAttribute(this.validations[i])

            // invocar o metodo
            this[method](input,value); 
        }
    }
    }, this)
 
}
minlength(input, minValue) {
    let inputLength = input.value.length;
    let errorMessage = `O Campo precisa ter pelo menos ${minValue} caracteres `

    if(inputLength < minValue){
        this.printMassage(input,errorMessage)
    }
}
// Verifica se o input passou do limite de carecteres
maxlength(input,maxValue){
    let inputLength = input.value.length;
    let errorMessage = `O Campo precisa ter menos que ${maxValue} caracteres `

    if(inputLength > maxValue){
        this.printMassage(input,errorMessage)
    }
}
//Valida todos os emails
emailvalidate(input){
    let re = /\S+@\S+\.\S+/;

    let email = input.value 
    let errorMessage = 'Insira um valor de email valido. Ex: email@email.com'

    if(!re.test(email)){
        this.printMassage(input,errorMessage)
    }
}
//  Valida se o campo tem apenas letras
onlyletters(input){
    let re = /^[A-Za-z]+$/;

    let inputValue = input.value

    let errorMessage = 'Este campo não aceita numeros nem caracteres especiais'

    if(!re.test(inputValue)){
        this.printMassage(input,errorMessage)
    }
}

// Metodo para imprimir mensagem de erro na tela
printMassage(input,msg){
    // Verificar a quantidade de erros que o input tem
    let errorsQty = input.parentNode.querySelector('.error')


    if(errorsQty === null ) {let template = document.querySelector('.error').cloneNode(true)
    template.textContent = msg;

    let inputParent = input.parentNode;

    template.classList.remove('template')

    inputParent.appendChild(template)
    }
}
// Verifica se o input esta preenchido
required(input){
    let inputValue = input.value
    if(inputValue === ''){
        let errorMessage = 'Este campo é Obrigatorio'

        this.printMassage(input,errorMessage)
    }

}
// Verifica se dois campos são iguais

equal(input,inputName){
    let inputToCompare = document.getElementsByName(inputName)[0]

    let errorMessage = 'As duas senhas não estão iguais'

    if(input.value != inputToCompare.value){
        this.printMassage(input,errorMessage)
    }
}
// Valida o campo das senhas

passwordvalidate(input){
    // transformar a string em array
    let charArr = input.value.split("")

    let uppercases = 0
    let numbers = 0
    
    for(let i = 0; charArr.length > i; i++){
        if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))){
            uppercases++
        } else if(!isNaN(parseInt(charArr[i]))){
            numbers++
        }
    }

if(uppercases === 0 || numbers === 0){
    let errorMessage = 'Sua senha precisa de ao menos 1 caractere maiusculo e um nomero'

    this.printMassage(input,errorMessage)
}
}

// Limpa as validações da tela
cleanValidations(validations){
    validations.forEach(el => el.remove())
}

}
// Verifica se o input tem o numero minimo de caracteres


let form = document.getElementById("registro");
let submit = document.getElementById("btn-submit");
let validator = new Validator();

// Evento
submit.addEventListener('click', function(e){
    e.preventDefault()

    validator.validate(form);
})