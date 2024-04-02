const upload = document.getElementById('upload');
// const para leitura
const leitura = upload.addEventListener("change", ()=>{
     // Inicialização do FileReader para ler o conteudo do arquivo
     const fr = new FileReader();
     fr.readAsText(upload.files[0]);
     fr.onload = final = () => {
          const csvfinal = fr.result;
          return csvfinal
     };
});
