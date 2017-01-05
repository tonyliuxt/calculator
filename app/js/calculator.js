    
    // Declare the calculator App
	var calculatorApp = angular.module('calculatorApp', ['calculatorModule']);

    var calculatorModule = angular.module('calculatorModule', []);
	
	// Core calculate module of the whole which can be extended 
	var CoreCalculateModule = {
		sum: function (x, y) {
			return x + y;
		},
		subtract: function (x, y) {
			return x - y;
		},
		multiply: function(x, y){
			return x * y;
		},
		divide: function (x, y) {
			return (y === 0) ? 0 : x / y;
		},
		sqrn: function(x, y){
			return Math.sqrt(x);
		},
		sqn: function(x, y){
			var tempvalue = x;
			for(var i=0; i<y-1; i++){
				tempvalue = tempvalue*x;
			}
			return tempvalue;
		}
	}

	// Declare the common calculatorModel Instance
	var calculatorModel = {
			result: 0, // Each time of calculate
			operation: "",
			currentNumber: "0",
			currentDisplay: "",
			middleValue: "",
			
			// Store currentResult for further using
			savemiddleValue: function(){
				this.middleValue = parseFloat(this.currentDisplay);
			},
			
			reset: function() {
				this.result = 0; 
				this.operation = "";
				this.currentNumber = "0";
				this.currentDisplay = "" ;
				this.middleValue = "";
			},
			
			setOperation: function(operationToSet) {
				this.operation = operationToSet;
				if(calculatorModel.currentNumber === "0") {
					this.currentDisplay += "0";
				}
				
				this.currentDisplay += " " + this.operation + " ";
				this.calculate();
				
				this.currentNumber = "";
			},

			calculate: function() {

				switch(this.operation) {
					case "+": // Addition
						this.result = CoreCalculateModule.sum(parseFloat(this.middleValue), parseFloat(this.currentNumber));
						break;
					case "-": // Subtraction
						this.result = CoreCalculateModule.subtract(parseFloat(this.middleValue), parseFloat(this.currentNumber));
						break;
					case "*": // Multiplication
						this.result = CoreCalculateModule.multiply(parseFloat(this.middleValue), parseFloat(this.currentNumber));
						break;
					case "/":	// Division
						this.result = CoreCalculateModule.divide(parseFloat(this.middleValue), parseFloat(this.currentNumber));
						break;
					case "sqrn": // Sqare root
						this.result = CoreCalculateModule.sqrn(parseFloat(this.middleValue), parseFloat(this.currentNumber));
						break;
					case "sqn":  // Sqare by N
						this.result = CoreCalculateModule.sqn(parseFloat(this.middleValue), parseFloat(this.currentNumber));
						break;
					// trigonometric functions (sine, cosine, tangent and their reciprocals)
					// calculus (integrals and derivatives) as well as logarithmic functions.
						
					default :
						this.result = "Error";
						break;
				}
				this.savemiddleValue();
		}			
			
	};
	
	// End common calculator module
		
    // Add the common calculator-controller to module
    calculatorModule.controller('calculatorController', ['$scope', function ($scope) {
        $scope.calculator = calculatorModel;
		$scope.numberClicked = function(clickedNumber) {
			if(calculatorModel.currentNumber === "0") {
				calculatorModel.currentNumber = "";
				calculatorModel.currentDisplay = "";
			}
				
			calculatorModel.currentNumber += clickedNumber;
			calculatorModel.currentDisplay += clickedNumber;
		};
		
		$scope.backSpace = function(){
			if(calculatorModel.currentNumber === "0") {
				calculatorModel.currentNumber = "";
				calculatorModel.currentDisplay = "";
				return;
			}
			// String.slice( begin [, end ] ) String.substring( from [, to ] ) String.substr( start [, length ] )
			var tmpvalue = calculatorModel.currentDisplay + "";
			calculatorModel.currentNumber = tmpvalue.slice(0, tmpvalue.length-1);
			calculatorModel.currentDisplay = tmpvalue.slice(0, tmpvalue.length-1);
			calculatorModel.savemiddleValue();
		}
			
		$scope.operationButtonClicked = function(clickedOperation) {
			calculatorModel.setOperation(clickedOperation);
			calculatorModel.savemiddleValue();
		};
			
		$scope.calculateIt = function() {
			calculatorModel.calculate();
			calculatorModel.currentDisplay = calculatorModel.result;
		};
			
		$scope.resetClicked = function() {
			calculatorModel.reset();
		};
    }]);


	