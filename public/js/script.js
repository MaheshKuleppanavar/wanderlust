(() => {
  'use strict'
  const forms = document.querySelectorAll('.needs-validation')
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      form.classList.add('was-validated')
    }, false)
  })
})()

let taxSwitch=document.getElementById('switchCheckDefault');
taxSwitch.addEventListener('click',()=>{
    let tax_info=document.getElementsByClassName('tax_info');
    for(let info of tax_info){
        info.classList.toggle('display');
    }
});
        