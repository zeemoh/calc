// create class
class jarocalc {
    constructor(previousOperand, currentOperand, current, previous,operation) {
       this.previousOperand = previousOperand;
       this.currentOperand = currentOperand;
       this.current = current;
       this.previous = previous;
       this.operation = operation;
    }
      
    updateDisplay() {
        if (this.currentOperand.innerText === '' || this.currentOperand.innerText === '.') {
            this.operation = "";
            this.currentOperand.innerText = this.current; 
            
        } 
        else if (this.currentOperand.innerText != '') {
            if (this.currentOperand.innerText.includes(this.operation)) {
                this.previous = this.currentOperand.innerText.slice(0, this.currentOperand.innerText.indexOf(this.operation) +1);
                this.currentOperand.innerText = this.previous + this.current;
            
            }
            else {
                this.currentOperand.innerText =  this.current + this.operation;
                this.current = '';
            }  
            
            } 
            console.log(this.currentOperand.innerText.slice(0, this.currentOperand.innerText.indexOf(this.operation) + 1) );
            console.log(this.getOperand());
            // console.log(this.calculate());
        }
         
        
    getOperand() {
        let x = this.currentOperand.innerText;
         return x.slice(x.indexOf(this.operation) + 1);
    }    

    calculate() {
        let calculation = "";
        this.previous = this.currentOperand.innerText.slice(0, this.currentOperand.innerText.indexOf(this.operation));
        switch(this.operation) {
            case "+" :
                calculation = Number(this.previous) + Number(this.getOperand());
                break;
            case "/" :
                calculation =  Number(this.previous) / Number(this.getOperand());
                break;
            case "-" :
                calculation = Number(this.previous) - Number(this.getOperand());
                break;
            case "*" :
                calculation =  Number(this.previous) * Number(this.getOperand());
                break;
            default :
              return;
        }
        this.previousOperand.innerText = this.currentOperand.innerText;
        this.currentOperand.innerText = calculation;
        
    }

    // displayAnswer () {
    //     // this.currentOperand.innerText = this.previousOperand.innertext;
    //     this.currentOperand.innertext = this.calculate();
        
    // }
    
    clear() {
        this.previousOperand.innerText = "";
        this.currentOperand.innerText = "";
        this.current = "";
    }
     
    // arrangeOperands() {
    //     this.currentOperand.innerText = this.previousOperand.innerText;
    // }

    delete() {
        this.currentOperand.innerText = this.currentOperand.innerText.slice(0, -1);
        this.current = "";
        // console.log(this.currentOperand.innerText.charAt(this.currentOperand.innerText.length - 1).toString());
    }
    
    chooseOperation(sign) {
       this.operation = sign.toString();
    }

    appendNumber(number) {
        // if (this.number === '.' || this.current.includes('.')) return;
        this.current = this.current.toString() + number.toString();
    }
}

// Get DOM elements
const selectedNumber = document.querySelectorAll('[data-number]');
const selectedOperation = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const allClear= document.querySelector('[data-all-clear]');
const prviousOperand = document.querySelector('[data-previous-operand]');
const crrentOperand = document.querySelector('[data-current-operand]');
const deleteButton = document.querySelector('[data-delete]');
let current = "";
let previous = "";
let operation= "";

// initialize calculator object
const calculator = new jarocalc(prviousOperand, crrentOperand, current, previous, operation)
selectedNumber.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay();
        // console.log(current);
    })
});

selectedOperation.forEach(button => { 
    button.addEventListener ('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay();
        // calculator.arrangeOperands();
        
    })
});

allClear.addEventListener('click', () =>{
    calculator.clear();
    calculator.updateDisplay();
    
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

equalsButton.addEventListener("click", () => {
    calculator.calculate();
    
});