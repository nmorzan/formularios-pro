const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
  usuario:/^[a-zA-Z0-9\_\-]{4,16}$/,//letras minusculas y maysuculas, guion y guion bajo
  nombre:/^[a-zA-ZÀ-ÿ\s]{4,40}$/,//letras minusculas y mayusculas, espacios y acentos
  password:/^.{4,12}$/,//4 a 12 digitos
  correo:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono:/^\d{7,14}$/, //7 a 14 digitos numerricos
}

const campos = {
  usuario:false,
  nombre:false,
  password:false,
  correo:false,
  telefono:false
}

const validarFormulario = (e) =>{
  switch (e.target.name){
    case 'usuario':
      validarCampos(expresiones.usuario,e.target,'usuario');
      break;
    case 'nombre':
      validarCampos(expresiones.nombre,e.target,'nombre');
      break;
    case 'password':
      validarCampos(expresiones.password,e.target,'password');
      validarPassword2();
      break;
    case 'password2':
      validarPassword2();
      break;
    case 'correo':
      validarCampos(expresiones.correo,e.target,'correo');
      break;
    case 'telefono':
      validarCampos(expresiones.telefono,e.target,'telefono');
      break;
  }
}

const validarCampos = (expresion,input,campo)=>{
  if(expresion.test(input.value)){
    document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
    document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
    document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
    document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
    document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
    campos[campo] = true;
  }else{
    document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
    document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
    document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
    document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
    document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
    campos[campo] = false;
  }
}

const validarPassword2 = () => {
  const password1 =document.getElementById('password');
  const password2 =document.getElementById('password2');
  if(password1.value !== password2.value){
    document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
    document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
    document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
    document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
    document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
    campos['password'] = false;
  }else{
    document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
    document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
    document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
    document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
    document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
    campos['password'] = true;
  }
}

inputs.forEach((input)=>{
  input.addEventListener('keyup',validarFormulario)
  input.addEventListener('blur',validarFormulario)
})


formulario.addEventListener('submit', (e)=>{
  e.preventDefault();
  const terminos = document.getElementById('terminos');

  if(campos.usuario && campos.nombre && campos.telefono && campos.password && campos.correo && terminos.checked){
    formulario.reset();
    document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo')

    document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo')
    setTimeout(()=>{
      document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo')
    },1000)

    document.querySelectorAll('.formulario__grupo-correcto').forEach((icon)=>{
      icon.classList.remove('formulario__grupo-correcto');
    })
  }else{
    document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo')
  }

})

