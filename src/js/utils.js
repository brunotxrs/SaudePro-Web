

function applyAvisoMessage( item, message){
    item.innerText = message
   
    setTimeout(() => {
        item.innerText = '';
    },2000)

}

function applyAvisoClass( itemParam, index , classStyles){
    
    itemParam[index].classList.add(classStyles);
    
    setTimeout(() => {

        itemParam[index].classList.remove(classStyles);
        
    },2000)
}

function changeIcos(icoParam, classParam){
    icoParam.classList.toggle(classParam)
}

export { applyAvisoMessage, applyAvisoClass, changeIcos };