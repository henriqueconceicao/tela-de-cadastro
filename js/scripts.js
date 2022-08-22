class Validator{
    constructor(){
        this.validations = [
            'data-min-length',
        ]
    }
// iniciar a validação de todos os campos
validate(form){
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
// Metodo para imprimir mensagem de erro na tela
printMassage(input,msg){
    let template = document.querySelector('.error').cloneNode(true)
    template.textContent = msg;

    let inputParent = input.parentNode;

    template.classList.remove('template')

    inputParent.appendChild(template)
    


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