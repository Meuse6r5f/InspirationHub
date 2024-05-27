const quoteElement = document.getElementById('quote');
const quoteElementPara = document.querySelector('.quote-para')
const nextBtn = document.getElementById('nextBtn');
const btn = document.querySelector('.btn')
const prevBtn = document.getElementById('prevBtn')
const author = document.querySelector('.authorName');
const authorId = document.getElementById('author')
const copyBtn = document.getElementById('copyBtn');
const saveBtn = document.querySelector('.saveBtn');
const quotesList = document.querySelector('.saved-con');
const modal = document.getElementById('modal');
const modalButton = document.querySelector('.modal-content button');
const animation = document.querySelector('.animation');
const copied = document.querySelector('.copied')
const dTheme = document.querySelector('.moon')
const lTheme = document.querySelector('.sun')
const leftIcon = document.querySelector('.left-icon')
const rightIcon = document.querySelector('.right-icon')

let pQ = [];
let pqA = [];
let pIndex = 0;
enableBtn(nextBtn)
nextBtn.addEventListener('click', fetchNewQuote);

const loading = "<div class='animation'> <div class='loading'></div> <div class='loading'></div> <div class='loading'></div>"
console.log(pQ.length,'i',pIndex)
function fetchNewQuote() {
    quoteElementPara.innerHTML = loading;
    fetch("https://api.quotable.io/random") 
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            quoteElementPara.innerHTML = data.content;
            pQ.push(data.content);
            pIndex = pQ.length
            author.textContent = data.author;
            console.log(pQ.length,'i',pIndex)
            pqA.push(data.author)
            if(pIndex > 1) {
              enableBtn(prevBtn)
            }
        })
        .catch(error => {
            
            quoteElementPara.textContent = 'Failed to fetch a new quote.';
        });
        
}
function enableDarkMode() {
  localStorage.setItem('dark-mode','enabled')
}
function disableDarkMode() {
  localStorage.setItem('dark-mode','disabled')
}
dTheme.addEventListener('click',()=>{
  enableDarkMode()
  dTheme.style.display = 'none'
  lTheme.style.display = 'block'
  copyBtn.style.filter = 'invert(100%)'
  saveBtn.style.filter = 'invert(100%)'
  copied.style.filter = 'invert(100%)'
  rightIcon.style.filter = 'invert(100%)'
  leftIcon.style.filter = 'invert(100%)'
  document.body.classList.add('dark-theme')
})
lTheme.addEventListener('click',()=>{
  disableDarkMode()
  dTheme.style.display = 'block'
  lTheme.style.display = 'none'
  copyBtn.style.filter = 'invert(0%)'
  saveBtn.style.filter = 'invert(0%)'
  copied.style.filter = 'invert(0%)'
  rightIcon.style.filter = 'invert(0%)'
  leftIcon.style.filter = 'invert(0%)'
  document.body.classList.remove('dark-theme')
})

function disableBtn(button) {
  button.style.opacity = '0.5'
  button.classList.remove('enabled')
} 
function enableBtn(button) {
  button.disabled = false
  button.classList.add('enabled')
  button.style.opacity = '1'
}

if (localStorage.getItem('dark-mode')=== 'enabled') {
   dTheme.style.display = 'none'
  lTheme.style.display = 'block'
  copyBtn.style.filter = 'invert(100%)'
  saveBtn.style.filter = 'invert(100%)'
  copied.style.filter = 'invert(100%)'
  rightIcon.style.filter = 'invert(100%)'
  leftIcon.style.filter = 'invert(100%)'
  document.body.classList.add('dark-theme')
   console.log('Darkmode')
} else {
  dTheme.style.display = 'block'
  lTheme.style.display = 'none'
  copyBtn.style.filter = 'invert(0%)'
  saveBtn.style.filter = 'invert(0%)'
  copied.style.filter = 'invert(0%)'
  rightIcon.style.filter = 'invert(0%)'
  leftIcon.style.filter = 'invert(0%)'
  document.body.classList.remove('dark-theme')
  console.log('lighy mode')
}

prevBtn.addEventListener('click',()=> {
  if (pIndex <= 0) {
    disableBtn(prevBtn)
    console.log(pQ.length,'i',pIndex)
    quoteElementPara.innerHTML = pQ[pIndex]
    author.innerHTML = pqA[pIndex]
    
  } else{
    console.log(pQ.length,'i,',pIndex)
  pIndex--
  //quoteElementPara.innerHTML = pQ[pIndex]
  //author.innerHTML = pqA[pIndex]
  console.log('else last',pQ.length,'i,',pIndex)
  if (pIndex <= 0) {
   // disableBtn(prevBtn)
    console.log(pQ.length,'i',pIndex)
    quoteElementPara.innerHTML = pQ[pIndex]
    author.innerHTML = pqA[pIndex]
    disableBtn(prevBtn)
  } else if(pIndex == 1 ) {
    pIndex--
    quoteElementPara.innerHTML = pQ[pIndex]
    author.innerHTML = pqA[pIndex]
    disableBtn(prevBtn)
  }
  else {
    pIndex--
    
    quoteElementPara.innerHTML = pQ[pIndex]
  author.innerHTML = pqA[pIndex]
  console.log('2nd else last',pQ.length,'i,',pIndex)
  console.log(pQ[pIndex])
  
  
  }
  } 
})

/*modalButton.addEventListener('click', () => {
    closeModal();
});  ***"*********/

function openModal() {
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
}
function copyToClipboardFun() {
    const textToCopy = `${quoteElementPara.textContent} - ${author.textContent}`;
    const textArea = document.createElement('textarea');
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    copyBtn.style.display = 'none'
    copied.style.display = 'block'
    setTimeout(function () {
    copied.style.display = 'none'
    copyBtn.style.display = 'block'
    },1000)
   // openModal();

}
copyBtn.addEventListener('click',copyToClipboardFun);
function saveToLocalStorage(){
  if(quoteElementPara.textContent.trim() ==''|| quoteElementPara.textContent == loading || quoteElementPara.textContent == 'Network response was not ok'|| quoteElementPara.textContent == 'Failed to fetch a new quote.'){
    return
  } 
    const savedList = document.createElement('div');
    savedList.className = 'saved-quote';
    savedList.innerHTML = quoteElementPara.innerHTML;
    quotesList.appendChild(savedList);
    let span = document.createElement('span');
    span.innerHTML = '&times;';
    span.classList.add('cross');
    savedList.appendChild(span);
    span.addEventListener('click', (e) => {
        e.target.parentElement.remove();
        saveData(); // Update localStorage after removing a quote
        updateNoQuotesMessage();
    });
    updateNoQuotesMessage();
    saveData(); // Update localStorage after adding a quote
  //end here  
//}
}

saveBtn.addEventListener('click',saveToLocalStorage);

leftIcon.addEventListener('click',()=>{
  quotesList.style.transform = 'translateX(0px)';
  quotesList.style.opacity = '1'
   quoteElementPara.style.color = 'transparent'
   quoteElementPara.style.userSelect = 'none'
   quotesList.style.color = 'var(--primary-text-color)'
   quotesList.style.userSelect = 'auto'
   author.style.color = 'transparent'
   authorId.style.userSelect = 'none';
   authorId.style.color = 'transparent'
   btn.style.opacity = '0'
   copyBtn.style.opacity = '0'
   saveBtn.style.opacity = '0'
   nextBtn.disabled = true;
   prevBtn.disabled = true;
   setTimeout(()=>{
     rightIcon.style.display = 'block'
     leftIcon.style.display = 'none'
   },1000)
   copyBtn.removeEventListener('click',copyToClipboardFun);
   saveBtn.removeEventListener('click',saveToLocalStorage);
   
   
/*  setTimeout(()=>{
    btn.style.visibility = 'hidden'
  },800)*/
  
  
})
rightIcon.addEventListener('click',()=>{
  //if (window.innerWidth > 480) {
  
    quotesList.style.transform = 'translateX(1100px)';
    
  //} else {
   // quotesList.style.transform = 'translateX(800px)';
//  }
   quotesList.style.opacity = '0'
   quoteElementPara.style.color = 'var(--primary-text-color)'
   quoteElementPara.style.userSelect = 'auto'
 
   quotesList.style.userSelect = 'none'//auto
   author.style.color = 'var(--primary-text-color)'
   authorId.style.userSelect = 'auto';
   authorId.style.color = 'var(--primary-text-color)'
   btn.style.opacity = '1'
   copyBtn.style.opacity = '1'
   saveBtn.style.opacity = '1'
   nextBtn.disabled = false;
   prevBtn.disabled = false;
  setTimeout(()=>{
     rightIcon.style.display = 'none'
     leftIcon.style.display = 'block'
   },500)
   copyBtn.addEventListener('click',copyToClipboardFun);
   saveBtn.addEventListener('click',saveToLocalStorage);
})
function saveData() {
    localStorage.setItem('savedQuotes', quotesList.innerHTML); // Save only the inner HTML
}

function showData() {
    const savedQuotes = localStorage.getItem('savedQuotes');
    if (savedQuotes) {
        quotesList.innerHTML = savedQuotes;
        const crosses = document.querySelectorAll('.cross');
        crosses.forEach(cross => {
            cross.addEventListener('click', (e) => {
                e.target.parentElement.remove();
                saveData(); // Update localStorage after removing a quote
                updateNoQuotesMessage();
            });
        });
        updateNoQuotesMessage();
    }
}
 function updateNoQuotesMessage() {
    if (quotesList.children.length === 0) {
        quotesList.innerHTML = '<p>You have not saved any quotes yet.</p>';
    } else if (quotesList.querySelector('p') && quotesList.children.length > 1) {
        quotesList.querySelector('p').remove();
    }
}

fetchNewQuote();
showData();
updateNoQuotesMessage();