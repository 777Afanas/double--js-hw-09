import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector(".form"); 
form.addEventListener("submit", handleSubmit);

let position;
let delay;

function handleSubmit(e) {
  e.preventDefault();
  
  delay = Number(e.currentTarget.elements.delay.value);
  const step = Number(e.currentTarget.elements.step.value);
  const amount = Number(e.currentTarget.elements.amount.value); 
 
  for (position = 1; position <= amount; position += 1) { 

    createPromise(position, delay)  
  .then(({ position, delay }) => {     
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {   
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  }); 
    delay += step;  
}  
  e.currentTarget.reset();    
}

function createPromise(position, delay) { 
    return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    
    setTimeout(() => {
      if (shouldResolve) {
      // Fulfill
        // resolve(`Fulfill`);
        resolve({position, delay});
    } else {
      // Reject
        // reject('Reject');
        reject({position, delay});
    }
    }, delay);          
    });   
}
