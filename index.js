const state = {userList: [] };  //creating a new userlist first. my user information (id,name and balance) will come here.

function setState(stateName, newValue) {  // userList will be updated with setState function when i added new user    
  state[stateName] = newValue;
}

let userId = 0 //   set userId = 0 first. function will give different id number to every user 


function addUser (event) {    // 
    event.preventDefault()
    const userName = document.getElementById("newUser").value;
    const balance = document.getElementById("balance").value;

    if (userName =='' || balance ==''){
    return alert('Your balance or username are invalid. Please enter a valid value')
    
    }if(balance<0){
      alert('Balance can not be less than 0')
    }
    
    else{
      setState("userList", [
        ...state.userList,
        {
          id: userId +=1,
          name: userName,
          balance: balance,
        },
      ]);
      senderList(userName,userId,balance)     // sending user,userId and balance to transfer area for select 
      updateList()
      addedHistory(userName)                 //added message for history
      document.getElementById('form').reset();   //reset form
    }
}


function senderList(userName,userId) {
  const sender = document.getElementById('sender')
  const option = document.createElement('option')
  option.setAttribute('value',userName)
  option.setAttribute('id',userId)
  option.innerText = userName
  sender.appendChild(option)
 
  const receiver = document.getElementById('receiver')
  const option2 = document.createElement('option')
  option2.setAttribute('value',userName)
  option2.setAttribute('id',userId)
  option2.innerText = userName

 receiver.appendChild(option2)
}


function sendMoney(event) {

  event.preventDefault();
  const userSender = sender.value;
  const userReceiver = receiver.value;
  const senderIndex = sender.selectedIndex;
  const receiverIndex = receiver.selectedIndex;
  const amount = Number(document.getElementById("amount").value)
  const senderBalance = state.userList.find((item) => item.id == senderIndex)
  const receiverBalance = state.userList.find((item) => item.id == receiverIndex)

  if(senderBalance.balance<amount){
   return alert('Insufficient balance')
  }if(amount == 0){
    return  alert('You can not send 0 ₺')               
  }if(amount<0){
    return alert('You can not send money less than 0 ₺') 
  }
  else{
    senderBalance.balance -= amount
    receiverBalance.balance = Number(receiverBalance.balance)+ amount
     
    updateList()   //  updating user list again. because of changing balances
    history(userSender,userReceiver,amount)  //   sending data with history function to list on main page
    document.getElementById('transferForm').reset();  //reset form
  }
}


 function addedHistory(userName){   //sending  customer added message to history 
  const history= document.querySelector('#historyList');
  const historyLi = document.createElement('tr')
  
  historyLi.innerHTML = `
  <td id="historyLine">${userName} named customer has added.</td> 
  `;
  history.appendChild(historyLi)
 }


 function  updateList() {      // creating table element with updateList function

  const allUserList= document.querySelector('#userTable');
  allUserList.innerHTML = ``;
  state.userList.map((user) => {
      const newLine = document.createElement('tr');

      newLine.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.balance}₺</td>
        `;
      allUserList.appendChild(newLine);
  });
};

function history(userSender,userReceiver,amount) {  // transaction history and date information

  const history= document.querySelector('#historyList');
  const historyLi = document.createElement('tr')
  
  historyLi.innerHTML = `
  <td id="historyLine">${userSender} has sent ${amount} ₺ to ${userReceiver} . Transaction time : ${new Date().toLocaleString()}</td> 
  `;
  history.appendChild(historyLi)
}


 