// const socket = io()
// let name;

// let textarea = document.querySelector('#textarea')
// let messageArea = document.querySelector('.message__area')
// let typingDiv = document.querySelector('.typing')

// //Letting user know when someone is typing
// let typing = false;
// let timeout = undefined;


// //Jab tak user name nhi dlega tab tak prompt jayega
// do {
//     name = prompt('Enter your name: ')
// }while(!name)

// textarea.addEventListener('keydown', (e) => {
//     if (!typing) {
//         typing = true;
//         socket.emit('typing', name);
//     }

//     clearTimeout(timeout);
// });


// textarea.addEventListener('keyup', (e) => {
//     if (e.key === 'Enter') {
//         sendMessage(e.target.value)
//         e.target.value =" ";
//     } else {
//         // emit typing event to the server
//         socket.emit('typing', name);
//     };

// })

// function sendMessage(message) {
//     let msg = {
//         //jo name user se liya tha woh
//         user: name,
//         message: message.trim()
//     }
//     //Message Append

//     appendMessage(msg, 'outgoing')
    
//     //Send to server
//     socket.emit('message', msg)

//        // emit stopTyping event to the server
//        socket.emit('stopTyping', name);
// }

// function appendMessage(msg, type) {
//     let mainDiv = document.createElement('div')
//     let className = type;
//     mainDiv.classList.add(className, 'message')
    
//     let markup = `
    
//     <h4>${msg.user}</h4>
//     <p>${msg.message}</p>
//     `

//     mainDiv.innerHTML = markup

//     messageArea.appendChild(mainDiv)

//     // // Autoscroll to the most recent message
//     // messageArea.scrollTop = messageArea.scrollHeight;

//     // // Smoothly scroll to the most recent message
//     // messageArea.scrollTo({
//     //     top: messageArea.scrollHeight,
//     //     behavior: 'smooth'
//     // });

//     // Smoothly scroll to the most recent message
//     const start = messageArea.scrollTop;
//     const end = messageArea.scrollHeight;
//     const duration = 2000; // Change this to adjust the animation duration

//     const startTime = performance.now();

//     function animate(currentTime) {
//         const elapsedTime = currentTime - startTime;
//         messageArea.scrollTop = easeInOutQuad(elapsedTime, start, end - start, duration);
//         if (elapsedTime < duration) {
//             requestAnimationFrame(animate);
//         }
//     }

//     function easeInOutQuad(t, b, c, d) {
//         t /= d / 2;
//         if (t < 1) return c / 2 * t * t + b;
//         t--;
//         return -c / 2 * (t * (t - 2) - 1) + b;
//     }

//     requestAnimationFrame(animate);
// }




// //Recieve Mssg
// socket.on('message', (msg) => {
//     appendMessage(msg,'incoming')
// })

// // listen for the typing event from the server
// socket.on('typing', (name) => {
//     typingDiv.innerText = `${name} is typing...`;
// });

// // listen for the stopTyping event from the server
// socket.on('stopTyping', (name) => {
//     typingDiv.innerText = '';
// });

const socket = io()

let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
let typingDiv = document.querySelector('.typing')

//Jab tak user name nhi dlega tab tak prompt jayega
do { 
    name = prompt('Enter your name: ')
} while (!name)

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
        e.target.value =" ";
    } else {
        // emit typing event to the server
        socket.emit('typing', name);
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    appendMessage(msg, 'outgoing')

    socket.emit('message', msg)

    // emit stopTyping event to the server
    socket.emit('stopTyping', name);
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type;
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup

    messageArea.appendChild(mainDiv) 

    
    // Smoothly scroll to the most recent message
    const start = messageArea.scrollTop;
    const end = messageArea.scrollHeight;
    const duration = 2000; // Change this to adjust the animation duration

    const startTime = performance.now();

    function animate(currentTime) {
        const elapsedTime = currentTime - startTime;
        messageArea.scrollTop = easeInOutQuad(elapsedTime, start, end - start, duration);
        if (elapsedTime < duration) {
            requestAnimationFrame(animate);
        }
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animate);
}

//Recieve Mssg
socket.on('message', (msg) => {
    appendMessage(msg,'incoming')
})

// listen for the typing event from the server
socket.on('typing', (name) => {
    typingDiv.innerText = `${name} is typing...`;
});

// listen for the stopTyping event from the server
socket.on('stopTyping', (name) => {
    typingDiv.innerText = '';
});

