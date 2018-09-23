// 
!function(){
    var view = document.querySelector('section.message')

    var model = {
        init: function(){
            var APP_ID = '2TlHlWmdGftbFEM2U1PQ6aXh-gzGzoHsz';
            var APP_KEY = '2FDDuoGatDjieRTNhbAOriS3';

            AV.init({appId: APP_ID,appKey: APP_KEY})
        },
        //获取数据
        fetch: function(){
            var query = new AV.Query('Message')
            return query.find()     //Promise对象
              
        },
        //创建数据
        save: function(name,content){
            var Message = AV.Object.extend('Message')
            var message = new Message()
            return message.save({    //Promise对象
                'name': name,
                'content': content
            })
        }
    }

    var controller = {
        view: null,
        model: null,
        messageList: null,
        init: function(view,model){
            this.view = view
            this.model = model
            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('#postMessageForm')
            this.model.init()
            this.loadMessages()
            this.bindEvents()
        },
        
        loadMessages: function(){
           this.model.fetch()
            .then((messages)=> {
                let array = messages.map((item)=>item.attributes)
                array.forEach((item) => {
                    let li = document.createElement('li')
                    li.innerText = `${item.name}: ${item.content}`
                    this.messageList.appendChild(li)
                });
                // 成功获得实例
            }//, function (error) {
                //alert('提交失败，改天再来哦V_V')}// 异常处理
            )//.then(()=>{},(error)=>{console.log(error)})

        },
        bindEvents: function(){
            this.form.addEventListener('submit',(e)=>{     //‘submit’包含提交按钮被点击、任意一行input打回车两个事件
                e.preventDefault()
                this.saveMessages()
            }) 
        },
        saveMessages: function(){
            let myForm = this.form
            let content = myForm.querySelector('input[name=content]').value
            let name = myForm.querySelector('input[name=name]').value
            
            this.model.save(name,content)
             .then(function(object) {
                let li = document.createElement('li')
                li.innerText = `${object.attributes.name}: ${object.attributes.content}`
                messageList.appendChild(li)
                view.querySelector('input[name=content]').value = ''
                /*window.location.reload()  //成功提交后自动帮用户刷新页面，但用户体验极差*/
                //console.log(object);
            })
        } 
    }
    controller.init(view,model)

}.call()



