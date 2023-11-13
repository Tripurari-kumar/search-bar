const input = document.querySelector('.input');
const searchContent=document.querySelector('.search-content');



function debounce(cb, delay=1000){
  let timer;
  return ((...args)=> {
     clearTimeout(timer);
     timer = setTimeout(()=>{
       cb(args);
    }, delay);
  })
}

const getUpdatedKeyword = debounce((text='') => {
  searchContent.innerHTML='';
  fetch("https://jsonplaceholder.typicode.com/users")
  .then((res)=> res.json())
  .then((data)=>{
    console.log(data, text);
   const filteredData= data.filter((user)=> {
     return user.name.toLowerCase().includes(text[0].toLowerCase());
  });

   filteredData.forEach(user => {
    searchContent.insertAdjacentHTML('beforeend', `<div class="search-content-grid">
  <div class="name">
    name: ${user.name}
  </div>
  <div class="email">
    email: ${user.email}
  </div>
</div>`);
  });
  }
  )
}, 250)

input.addEventListener('input', (e)=>{
   getUpdatedKeyword(e.target.value);
})