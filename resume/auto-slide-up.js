!function(){
    let specialTags = document.querySelectorAll('[data-x]')
    for(let i=0;i<specialTags.length;i++) {
        specialTags[i].classList.add('offset')
    }  
    setTimeout(function(){
        findClosestAndRemoveOffset()
    },1000)
    
    window.addEventListener('scroll',function(x){
        findClosestAndRemoveOffset() 
    })    
    
    // helper
    function findClosestAndRemoveOffset(){
        let specialTags = document.querySelectorAll('[data-x]')
        var minIndex = 0
        for(let i=1;i<specialTags.length;i++){
            if(Math.abs(specialTags[i].offsetTop-window.scrollY)<Math.abs(specialTags[minIndex].offsetTop-window.scrollY)){
                minIndex=i                    
            }
        }
        //minIndex就是离窗口最近的元素
                  
        specialTags[minIndex].classList.remove('offset')
    
        for(let i=0;i<specialTags.length;i++){
            specialTags[i].classList.remove('active') 
        }
        specialTags[minIndex].classList.add('active')
    
        let id  = specialTags[minIndex].id
        console.log(id) //学会在关键的地方打log
        let a = document.querySelector('a[href="#'+id+'"]')
        let li = a.parentNode
        let brothersAndMe = li.parentNode.children  //找爸爸的儿子 
        for(let i=0;i<brothersAndMe.length;i++) {
            brothersAndMe[i].classList.remove('highlight')
        }           
        li.classList.add('highlight')
    
    }    
}.call()