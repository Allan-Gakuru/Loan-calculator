//Listen for submit
document.getElementById('loan-form').addEventListener('submit', function showLoader(e){
    //hide results in UI
    document.getElementById('results').style.display = 'none';
    //show loader
    document.getElementById('loading').style.display = 'block';
    //set the timer to stop loading and show results
    setTimeout(calculateResults, 1500);

    e.preventDefault();
})

//Calculate Results
function calculateResults(){
    console.log('Calculating....');
    //Creating DOM selector variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayments = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');
    //Defining variables needed for calculation
    const principal = parseFloat(amount.value);
    const interestRate = parseFloat(interest.value)/100;
    const numberOfPayments = parseFloat(years.value)*12;
    //function to calculate the total payment
    const bracketValue = 1 + interestRate/numberOfPayments;
    const powered = Math.pow(bracketValue, numberOfPayments);
    const result = powered * principal;
    console.log(result);
    //function to calculate monthly payments
    const monthlyCalculated = result/numberOfPayments;
    console.log(monthlyCalculated);
    //function to calculate total interest
    const interestAccrued = result-principal;
    console.log(interestAccrued);
    //displaying the correct decimals results to the UI
    if(isFinite(result)){
        totalPayment.value = result.toFixed(2);
        monthlyPayments.value = monthlyCalculated.toFixed(2);
        totalInterest.value = interestAccrued.toFixed(2);
        //hide loader in UI
        document.getElementById('loading').style.display = 'none';
        //show results in UI
        document.getElementById('results').style.display = 'block';
        
    } 
    else {
        showError('Please check your numbers');
    };



};

//show error function
function showError(error){
    //hide loader in UI
    document.getElementById('loading').style.display = 'none';
    //creates the error div
    const errorDiv = document.createElement('div');
    //adds the bootstrap classs
    errorDiv.className = 'alert alert-danger';
    //appending the error message(in show error) to the errorDiv
    errorDiv.appendChild(document.createTextNode(error));
    // inserting the div above heading nut within the card
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    card.insertBefore(errorDiv, heading);
    //CLEAR THE ERROR AFTER THREE SECONDS
    setTimeout(clearError, 3000);

}
//Function for clear error
function clearError(){
    document.querySelector('.alert').remove();
};