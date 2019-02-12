

const canvas=document.getElementById('canvas');
const ctx= canvas.getContext('2d');

let img=new Image();
let fileName='';

const downloadBtn= document.getElementById('download-btn');
const uploadFile= document.getElementById('upload-file');
const revertBtn= document.getElementById('revert-btn');

var dragItem1=document.getElementById("drag1");
var dragItem2=document.getElementById("drag2");
var dragItem3=document.getElementById("drag3");

var dropLoc=document.getElementById("canvas");
dragItem1.ondragstart=function(evt){
  evt.dataTransfer.setData('key','drag1');

}

dragItem2.ondragstart=function(evt){
    evt.dataTransfer.setData('key','drag2');
  
  }
  dragItem3.ondragstart=function(evt){
    evt.dataTransfer.setData('key','drag3');
  
  }
dropLoc.ondragover=function(evt){
    evt.preventDefault();
  
  }  
  dropLoc.ondrop=function(evt){
    evt.preventDefault();
      console.log(evt);
      var dropItem=evt.dataTransfer.getData('key');
      console.log(dropItem);
      

      var myElement=document.getElementById(dropItem);
      console.log(myElement);
     
     //add image to canvas
       
            //create img
            
            //set src
            img.src=myElement.src;
          
           
            //on image load,add to canvas
           
                canvas.width=img.width;
                canvas.height=img.height;
                ctx.drawImage(img,0,0,img.width,img.height);
                canvas.removeAttribute('data-caman-id');

                img.crossOrigin = "Anonymous";
            
      

    }




//TODO FILTERS
document.addEventListener('click',(e)=>{
    if(e.target.classList.contains('filter-btn')){
        if(e.target.classList.contains('brightness-add')){
            Caman('#canvas',img,function(){
                this.brightness(5).render();
            });
        }else  if(e.target.classList.contains('brightness-remove')){
            Caman('#canvas',img,function(){
                this.brightness(-5).render();
            });
        }else  if(e.target.classList.contains('contrast-add')){
            Caman('#canvas',img,function(){
                this.contrast(5).render();
            });
        }else  if(e.target.classList.contains('contrast-remove')){
            Caman('#canvas',img,function(){
                this.contrast(-5).render();
            });
        }else  if(e.target.classList.contains('saturation-add')){
            Caman('#canvas',img,function(){
                this.saturation(5).render();
            });
        }else  if(e.target.classList.contains('saturation-remove')){
            Caman('#canvas',img,function(){
                this.saturation(-5).render();
            });
        }else  if(e.target.classList.contains('vintage-add')){
            Caman('#canvas',img,function(){
                this.vintage().render();
            });
        }else  if(e.target.classList.contains('lomo-add')){
            Caman('#canvas',img,function(){
                this.lomo().render();
            });
        }else  if(e.target.classList.contains('vibrance-add')){
            Caman('#canvas',img,function(){
                this.vibrance(5).render();
            });
        }else  if(e.target.classList.contains('clarity-add')){
            Caman('#canvas',img,function(){
                this.clarity().render();
            });
        }else  if(e.target.classList.contains('sincity-add')){
            Caman('#canvas',img,function(){
                this.sinCity().render();
            });
        }else if(e.target.classList.contains('vibrance-remove')){
            Caman('#canvas',img,function(){
                this.vibrance(-5).render();
            });
        }


    }
});

revertBtn.addEventListener('click',(e)=>{
    Caman('#canvas',img,function(){
        this.revert();
    })
})
//download event
downloadBtn.addEventListener('click',()=>{
    //get file extension
    const fileExtension=fileName.slice(-4);
    //init new file Name
    let newFileName;

    if(fileExtension==='.jpg'||fileExtension=='.png'){
        newFileName=fileName.substring(0,fileName.length - 4)+'-edited.jpg';
    }
    //call download
    download(canvas,newFileName);
})

//download function
function download(canvas,filename){
    let e;
    //create link
    const link=document.createElement('a');
    //set properties
    link.download=filename;
    link.href=canvas.toDataURL('image/jpeg',0.8);
    //new Mouse event
    e=new MouseEvent('click');
    //dispatch event
    link.dispatchEvent(e);
   
}

//Upload File

uploadFile.addEventListener('change',(e)=>{
    const file=document.getElementById('upload-file').files[0];
    

    //Init fileReader
    const reader=new FileReader();
    if(file){
        fileName=file.name;
        console.log(fileName);
        //read data as url
        reader.readAsDataURL(file);
    }
     //add image to canvas
        reader.addEventListener('load',()=>{
            //create img
            img=new Image();
            //set src
            img.src=reader.result;
            //on image load,add to canvas
            img.onload=function(){
                canvas.width=img.width;
                canvas.height=img.height;
                ctx.drawImage(img,0,0,img.width,img.height);
                canvas.removeAttribute('data-caman-id');
            }
        },false);

});