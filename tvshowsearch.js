const form=document.querySelector('#sform');
const box = document.querySelector('.container');
const initial=document.createElement("h3");
initial.classList.add("init")
initial.innerText = "Search result Appears here";
box.classList.add("first")
box.appendChild(initial);
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    removeimg();
    const srcqury=form.elements.qurrey.value;
    box.classList.remove("first")
    initial.remove();
    //  console.log(srcqury);
    // const par ={params: {q: srcqury}}
    // const res=await axios.get(`https://api.tvmaze.com/search/shows`, par);
    // createimg(res.data);

    if(srcqury ==""){
        const res=await axios.get(`https://api.tvmaze.com/schedule/full`);
        // createimg(res.data);
        // console.log(res.data)
        // emcreateimg(res.data);
        box.classList.add("first")
        initial.innerText = "Insert the Serch text";
        box.appendChild(initial);
        const emdivs=document.querySelectorAll(".resdiv")
        for(let endiv of emdivs){
            endiv.remove();
        }
    }
    else{
        const par ={params: {q: srcqury}}
        const res=await axios.get(`https://api.tvmaze.com/search/shows`, par);
        if(res.data==""){
            const emdivs=document.querySelectorAll(".resdiv")
            for(let endiv of emdivs){
                endiv.remove();
            }

            box.classList.add("first")
            initial.innerText = "!-----NO result found-----!";
            box.appendChild(initial);
        }
        createimg(res.data);
    }

})
const emcreateimg = (shows) => {
    for(let i=0;i<50;i++){
        if(shows[[i]].image) {
            const img= document.createElement('img');
            const pra= document.createElement('p');
            img.src= shows[[i]].image.medium;
            pra.textContent= `${shows[[i]].name}`;
            img.classList.add("simg");
            pra.classList.add("spra");
            box.appendChild(img);
            box.append(pra);
            console.log(pra)
        }
        
    }
}
const createimg = (shows) => {
    for(let result of shows){
        if(result.show.image) {
            const resdiv= document.createElement('div');
            const pra= document.createElement('p');
            const img= document.createElement('img');
            img.src= result.show.image.medium;
            img.classList.add("simg");
            resdiv.appendChild(img);
            pra.textContent= `${result.show.name}`;
            pra.classList.add("spra");
            resdiv.append(pra);
            resdiv.classList.add("resdiv")
            box.append(resdiv);
            console.log(result)
        }
    }
}

const removeimg = function () {
    const imgtorem= document.querySelectorAll(".simg");
    const pratorem= document.querySelectorAll(".spra");
    for(let im of imgtorem){
        im.remove();
    }
    for(let pr of pratorem){
        pr.remove();
    }
}