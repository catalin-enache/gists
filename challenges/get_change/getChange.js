/*
A vending machine has the following denominations: 1c, 5c, 10c, 25c, 50c, and $1.
Your task is to write a program that will be used in a vending machine to return change.
Assume that the vending machine will always want to return the least number of coins or notes.
Devise a function getChange(M, P) where M is how much money was inserted into the machine and P the price of the item selected,
that returns an array of integers representing the number of each denomination to return.

Example:
getChange(5, 0.99) // should return [1,0,0,0,0,4]
* */

const denominations = [1, 0.5, 0.25, 0.1, 0.05, 0.01];

function getChange(total, price) {
    let remaining  = +(total - price).toFixed(2);
    const result = {};

    while (remaining) {
        for (const currentDenomination of denominations) {
            if (currentDenomination > remaining) continue;
            const currentDenominationAmount = Math.floor(remaining/currentDenomination);
            remaining = +(remaining % currentDenomination).toFixed(2);
            result[currentDenomination] = currentDenominationAmount;
        }
    }
    return result;
}

console.log(getChange(5, 0.99));