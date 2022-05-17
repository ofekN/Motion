import * as transform from './utilities/get-transform.js'
import { checkValues, transformValues } from './utilities/math.js'
import './utilities/bezierEasing.js'



class _Motion{

     // Motion libary is under Mit license,made by ofek nakar.

    constructor()
    {
        // animation array
        this.animations = []
        // timeline keys array
        this.timeLineKeys = []
        // copy timeline keys array
        this.CopytimeLineKeys = []
        // default values 
        this.defaultValues = {
                              x:0,
                              y:0,
                              width:0,
                              height:0,
                              left:0,
                              right:0,
                              top:0,
                              rotate:0,
                              rotateX:0,
                              rotateY:0,
                              scale:0,
                             }
        // animation loop function
        this.loop = this.loop.bind(this);
        this.loop()
        // default easing linear 
        this.easing =BezierEasing(1, 1, 1, 1);
   

       
  
    }

      
    timeline(options){
        let _timeline;
        let _key = transform.genrateKey();
  
            this.timeLineKeys.push(
                {
                 key:_key,
                 order:[],
                 stop:false,
                 play:true,
                }
           )



        
           if(options && 'ease' in options)
           {
            if(Array.isArray(transform.checkEase(options.ease)))
            {
                let easeArr = transform.checkEase(options.ease)

                this.easing = BezierEasing(easeArr[0],easeArr[1],easeArr[2],easeArr[3])

            }
            else{
                transform.checkEase(options.ease)
            }

           }
   
        let num = -1
        console.log(this.timeLineKeys)
        return _timeline = {
           play:()=>{
            const timeLineIndex = this.timeLineKeys.map(object => object.key).indexOf(_key);
            this.timeLineKeys[timeLineIndex].stop = false
            this.timeLineKeys[timeLineIndex].play = true
           } ,
           stop:()=>{
            const timeLineIndex = this.timeLineKeys.map(object => object.key).indexOf(_key);
            this.timeLineKeys[timeLineIndex].stop = true
            this.timeLineKeys[timeLineIndex].play = false
           },
           to:(el,opt)=>{
               

                            num+=1
                            
                            if(transform.checkType(el) === 'object')
                            {
                                const vals = []
                                for(var key in el) {
                                    const value = {key:key,value:el[key]};
                                    vals.push(value)
                                }

                                const timeLineArrIndex = this.timeLineKeys.map(object => object.key).indexOf(_key);

                        
                                if('delay' in opt)
                                {
                                    this.timeLineKeys[timeLineArrIndex].order.push({
                                        isTimeline:true,timelineOrder:num,timelineKey:_key,ob:vals,element:el,options:opt,type:transform.checkType(el),easeNum:0,delayNum:0,maxDelay:opt.delay*61,maxRestart:0,ease:this.easing,
                                    })
                            
                                }
                                else{
                                    
                                    this.timeLineKeys[timeLineArrIndex].order.push({
                                        isTimeline:true,timelineOrder:num,timelineKey:_key,ob:vals,element:el,options:opt,type:transform.checkType(el),easeNum:0,maxRestart:0,ease:this.easing,
                                    })
                        
                                }

                            }
                    
                            else if(transform.checkType(el) === 'html'){
                                //
                                const vals = []
                                const width = transform.getCSSProp(el,'width','px')
                                const height = transform.getCSSProp(el,'height','px')
                                const left = transform.getCSSProp(el,'left','px')
                                const right = transform.getCSSProp(el,'right','px')
                                const top = transform.getCSSProp(el,'top','px')
                                const bottom = transform.getCSSProp(el,'bottom','px')
                                const x = transform.getX(el)
                                const y = transform.getY(el)
                                const scaleY = transform.getScaleY(el)
                                const scaleX = transform.getScaleX(el)
                                const rotate = transform.getRotate(el)
                                const color = window.getComputedStyle(el).color
                                const backgroundColor = window.getComputedStyle(el).backgroundColor
                    
                                vals.push({key:'width',value:parseFloat(width.replace('px',''))})
                                vals.push({key:'height',value:parseFloat(height.replace('px',''))})
                                vals.push({key:'left',value:parseFloat(left.replace('px',''))})
                                vals.push({key:'right',value:parseFloat(right.replace('px',''))})
                                vals.push({key:'top',value:parseFloat(top.replace('px',''))})
                                vals.push({key:'bottom',value:parseFloat(bottom.replace('px',''))})
                                vals.push({key:'x',value:x})
                                vals.push({key:'y',value:y})
                                vals.push({key:'scaleY',value:scaleY})
                                vals.push({key:'scaleX',value:scaleX})
                                vals.push({key:'rotate',value:rotate})
                                vals.push({key:'color',value:color})
                                vals.push({key:'backgroundColor',value:backgroundColor})
                    
                                const timeLineArrIndex = this.timeLineKeys.map(object => object.key).indexOf(_key);
                    
                                if('delay' in opt)
                                {
                                    this.timeLineKeys[timeLineArrIndex].order.push({
                                        isTimeline:true,timelineOrder:num,timelineKey:_key,ob:vals,element:el,options:opt,type:transform.checkType(el),easeNum:0,delayNum:0,maxDelay:opt.delay*61,maxRestart:0,ease:this.easing,
                                    })
                            
                                    
                        
                                }
                                else{
                                    
                                    this.timeLineKeys[timeLineArrIndex].order.push({
                                        isTimeline:true,timelineOrder:num,timelineKey:_key,ob:vals,element:el,options:opt,type:transform.checkType(el),easeNum:0,maxRestart:0,ease:this.easing,
                                    })
                        
                                }
                                
                                    
                                    

                            }
                   

                  // reutnr timeline object and copy timeline array
                  this.CopytimeLineKeys =  this.timeLineKeys           
                  return _timeline;
                        },
           fromTo:(el,optStart,opt)=>{

            num+=1
                            
            if(transform.checkType(el) === 'object')
            {
                const vals = []
                for(var key in el) {
                    const value = {key:key,value:el[key]};
                    vals.push(value)
                }

                const timeLineArrIndex = this.timeLineKeys.map(object => object.key).indexOf(_key);

        
                if('delay' in opt)
                {
                    this.timeLineKeys[timeLineArrIndex].order.push({
                        isTimeline:true,timelineOrder:num,timelineKey:_key,startOptions:optStart,ob:vals,element:el,options:opt,type:transform.checkType(el),easeNum:0,delayNum:0,maxDelay:opt.delay*61,maxRestart:0,ease:this.easing,
                    })
            
                }
                else{
                    
                    this.timeLineKeys[timeLineArrIndex].order.push({
                        isTimeline:true,timelineOrder:num,timelineKey:_key,startOptions:optStart,ob:vals,element:el,options:opt,type:transform.checkType(el),easeNum:0,maxRestart:0,ease:this.easing,
                    })
        
                }

            }
    
            else if(transform.checkType(el) === 'html'){
                //
 
                const vals = []
                const width = transform.getCSSProp(el,'width','px')
                const height = transform.getCSSProp(el,'height','px')
                const left = transform.getCSSProp(el,'left','px')
                const right = transform.getCSSProp(el,'right','px')
                const top = transform.getCSSProp(el,'top','px')
                const bottom = transform.getCSSProp(el,'bottom','px')
                const x = transform.getX(el)
                const y = transform.getY(el)
                const scaleY = transform.getScaleY(el)
                const scaleX = transform.getScaleX(el)
                const rotate = transform.getRotate(el)
                const color = window.getComputedStyle(el).color
                const backgroundColor = window.getComputedStyle(el).backgroundColor
    
                vals.push({key:'width',value:parseFloat(width.replace('px',''))})
                vals.push({key:'height',value:parseFloat(height.replace('px',''))})
                vals.push({key:'left',value:parseFloat(left.replace('px',''))})
                vals.push({key:'right',value:parseFloat(right.replace('px',''))})
                vals.push({key:'top',value:parseFloat(top.replace('px',''))})
                vals.push({key:'bottom',value:parseFloat(bottom.replace('px',''))})
                vals.push({key:'x',value:x})
                vals.push({key:'y',value:y})
                vals.push({key:'scaleY',value:scaleY})
                vals.push({key:'scaleX',value:scaleX})
                vals.push({key:'rotate',value:rotate})
                vals.push({key:'color',value:color})
                vals.push({key:'backgroundColor',value:backgroundColor})
       
    
                const timeLineArrIndex = this.timeLineKeys.map(object => object.key).indexOf(_key);
    
                if('delay' in opt)
                {
                    this.timeLineKeys[timeLineArrIndex].order.push({
                        ob:vals,isTimeline:true,timelineOrder:num,startOptions:optStart,timelineKey:_key,element:el,options:opt,type:transform.checkType(el),easeNum:0,delayNum:0,maxDelay:opt.delay*61,maxRestart:0,ease:this.easing,
                    })
            
                    
        
                }
                else{
                    
                    this.timeLineKeys[timeLineArrIndex].order.push({
                        ob:vals,isTimeline:true,timelineOrder:num,startOptions:optStart,timelineKey:_key,element:el,options:opt,type:transform.checkType(el),easeNum:0,maxRestart:0,ease:this.easing,
                    })
        
                }
                
                    
                    

            }

            // reutnr timeline object and copy timeline array
            this.CopytimeLineKeys =  this.timeLineKeys           

            return _timeline;
                                     }             
        }
    }
    
    to(el,opt)
    {
     
        if(transform.checkType(el) === 'object')
        {
            const vals = []
            for(var key in el) {
                const value = {key:key,value:el[key]};
                vals.push(value)
            }
         

            if('delay' in opt)
            {
                this.animations.push({
                    ob:vals,element:el,options:opt,type:transform.checkType(el),easeNum:0,delayNum:0,maxDelay:opt.delay*61,maxRestart:0,ease:this.easing,
                })
    
            }
            else{
                this.animations.push({
                    ob:vals,element:el,options:opt,type:transform.checkType(el),easeNum:0,maxRestart:0,ease:this.easing,
                })
    
            }
        }

        else if(transform.checkType(el) === 'html'){
            //
            const vals = []
            const width = transform.getCSSProp(el,'width','px')
            const height = transform.getCSSProp(el,'height','px')
            const left = transform.getCSSProp(el,'left','px')
            const right = transform.getCSSProp(el,'right','px')
            const top = transform.getCSSProp(el,'top','px')
            const bottom = transform.getCSSProp(el,'bottom','px')
            const x = transform.getX(el)
            const y = transform.getY(el)
            const scaleY = transform.getScaleY(el)
            const scaleX = transform.getScaleX(el)
            const rotate = transform.getRotate(el)
            const color = window.getComputedStyle(el).color
            const backgroundColor = window.getComputedStyle(el).backgroundColor

            vals.push({key:'width',value:parseFloat(width.replace('px',''))})
            vals.push({key:'height',value:parseFloat(height.replace('px',''))})
            vals.push({key:'left',value:parseFloat(left.replace('px',''))})
            vals.push({key:'right',value:parseFloat(right.replace('px',''))})
            vals.push({key:'top',value:parseFloat(top.replace('px',''))})
            vals.push({key:'bottom',value:parseFloat(bottom.replace('px',''))})
            vals.push({key:'x',value:x})
            vals.push({key:'y',value:y})
            vals.push({key:'scaleY',value:scaleY})
            vals.push({key:'scaleX',value:scaleX})
            vals.push({key:'rotate',value:rotate})
            vals.push({key:'color',value:color})
            vals.push({key:'backgroundColor',value:backgroundColor})




            if('delay' in opt)
            {
                this.animations.push({
                    ob:vals,element:el,options:opt,type:transform.checkType(el),easeNum:0,delayNum:0,maxDelay:opt.delay*61,maxRestart:0,ease:this.easing,
                })
    
            }
            else{
                this.animations.push({
                    ob:vals,element:el,options:opt,type:transform.checkType(el),easeNum:0,maxRestart:0,ease:this.easing,
                })
    
            }
        }


    }
    fromTo(el,optStart,opt)
    {
        if(transform.checkType(el) === 'object')
        {
            const vals = []
            for(var key in el) {
                const value = {key:key,value:el[key]};
                vals.push(value)
            }
            if('delay' in opt)
            {
                this.animations.push({
                    ob:vals,element:el,startOptions:optStart,options:opt,type:transform.checkType(el),easeNum:0,delayNum:0,maxDelay:opt.delay*61,maxRestart:0,ease:this.easing,
                })
            }
            else{
                this.animations.push({
                    ob:vals,element:el,startOptions:optStart,options:opt,type:transform.checkType(el),easeNum:0,maxRestart:0,ease:this.easing,
                })
    
            }
        }
        else if(transform.checkType(el) === 'html')
        {
            if('delay' in opt)
            {
                this.animations.push({
                    element:el,startOptions:optStart,options:opt,type:transform.checkType(el),easeNum:0,delayNum:0,maxDelay:opt.delay*61,maxRestart:0,ease:this.easing,
                })
            }
            else{
                this.animations.push({
                    element:el,startOptions:optStart,options:opt,type:transform.checkType(el),easeNum:0,maxRestart:0,ease:this.easing,
                })
    
            }
        }

    }
    Tween(arr,type,el,opt,index,startValues)
    {

                 
            let duration = 1

            // start with percentage
            let _htmlIncreasement = {
                x:'%',
                y:'%',
                width:'%',
                height:'%',
                left:'%',
                right:'%',
                top:'%',
                bottom:'%',
            }

            if('duration' in opt) duration = opt.duration
            // multiplie duration by 60 (request animation run 60 time a second)
            let miliduration = duration *60
            // calucalte animation increasement from 0 to 1 
            let increaseBy = 1/miliduration
            

            // object diffrent keys 
            let keys = []
            // start values
            let _tweenStartVal = {
                x:el.x || 0,
                y:el.y || 0,
                scale:el.scale || 1,
                rotate:el.rotate || 0,
                rotateY:el.rotateY || 0,
                rotateX:el.rotateX || 0,
                width:el.width || 0,
                height:el.height || 0,
                left:el.left || 0,
                right:el.right || 0,
                top:el.top || 0,
                bottom:el.bottom || 0,
                color:0,
                backgroundColor:0,

            }
            // end value
            let _tweenEndVal = {
                x : _tweenStartVal.x,
                y : _tweenStartVal.y,
                width:_tweenStartVal.width,
                height:_tweenStartVal.height,
                left:_tweenStartVal.left,
                right:_tweenStartVal.right,
                top:_tweenStartVal.top,
                bottom:_tweenStartVal.bottom,
                rotate : _tweenStartVal.rotate,
                scale : _tweenStartVal.scale,
                rotateX : _tweenStartVal.rotateX,
                rotateY : _tweenStartVal.rotateY,
                backgroundColor : _tweenStartVal.backgroundColor,
                color : _tweenStartVal.color,
            }
            // let number between values 
            let _betweenNum = {
                x:0,
                y:0,
                width:0,
                height:0,
                left:0,
                right:0,
                top:0,
                bottom:0,
                scale:0,
                rotate:0,
                rotateX:0,
                rotateY:0,
                backgroundColor:[0,0,0],
                color:[0,0,0]
            }
            // animation final value 
            let _finalValue = {
                x : _tweenStartVal.x,
                y : _tweenStartVal.y,
                width:_tweenStartVal.width,
                height:_tweenStartVal.height,
                left:_tweenStartVal.left,
                right:_tweenStartVal.right,
                top:_tweenStartVal.top,
                bottom:_tweenStartVal.bottom,
                scale : _tweenStartVal.scale,
                rotate : _tweenStartVal.rotate,
                rotateX : _tweenStartVal.rotateX,
                rotateY : _tweenStartVal.rotateY,
                backgroundColor:[ _tweenStartVal.backgroundColor[0],
                                _tweenStartVal.backgroundColor[1],
                                _tweenStartVal.backgroundColor[2],
                                ],
                color:[ _tweenStartVal.color[0],
                        _tweenStartVal.color[1],
                        _tweenStartVal.color[2],
                    ],
            }



            // set To start values
            if(type === 'object' && !arr[index].isTimeline )
            {
                
                let x = arr[index].ob.map(e => e.key).indexOf('x');
                let y = arr[index].ob.map(e => e.key).indexOf('y');
                let rotate = arr[index].ob.map(e => e.key).indexOf('rotate');
                let rotateX = arr[index].ob.map(e => e.key).indexOf('rotateX');
                let rotateY = arr[index].ob.map(e => e.key).indexOf('rotateY');
                let scale = arr[index].ob.map(e => e.key).indexOf('scale');
                let backgroundColor = arr[index].ob.map(e => e.key).indexOf('backgroundColor');
                let color = arr[index].ob.map(e => e.key).indexOf('color');

                arr[index].ob.forEach(o=>{
                    // console.log(o)
                    if(o.key === 'x' && 'x' in el) _tweenStartVal.x = arr[index].ob[x].value
                    else if(o.key === 'y' && 'y' in el) _tweenStartVal.y = arr[index].ob[y].value
                    else if(o.key === 'rotate' && 'rotate' in el) _tweenStartVal.rotate = arr[index].ob[rotate].value
                    else if(o.key === 'rotateX' && 'rotateX' in el) _tweenStartVal.rotateX = arr[index].ob[rotateX].value
                    else if(o.key === 'rotateY' && 'rotateY' in el) _tweenStartVal.rotateY = arr[index].ob[rotateY].value
                    else if(o.key === 'scale' && 'scale' in el) _tweenStartVal.scale = arr[index].ob[scale].value
                    else if(o.key === 'backgroundColor' && 'backgroundColor' in el  ) 
                    {
                        if(arr[index].ob[backgroundColor].value.includes('#'))
                        {
                            _tweenStartVal.backgroundColor =  transform.hexToRgb(arr[index].ob[backgroundColor].value).replace('rgb(','').replace(')','').split(',').map(function(item) {
                                return parseInt(item, 10)});
                        }
                        else {
                            _tweenStartVal.backgroundColor =  arr[index].ob[backgroundColor].value.replace('rgb(','').replace(')','').split(',').map(function(item) {
                                return parseInt(item, 10)});
                        }
                    }
                    else if(o.key === 'color' && 'color' in el  ) 
                    {
                        if(arr[index].ob[color].value.includes('#'))
                        {
                            _tweenStartVal.color =  transform.hexToRgb(arr[index].ob[color].value).replace('rgb(','').replace(')','').split(',').map(function(item) {
                                return parseInt(item, 10)});
                        }
                        else {
                            _tweenStartVal.color =  arr[index].ob[color].value.replace('rgb(','').replace(')','').split(',').map(function(item) {
                                return parseInt(item, 10)});
                        }
                    }
                    else {
                        _tweenStartVal[`${o.key}`] = o.value
                        _tweenEndVal[`${o.key}`] = o.value
                        _betweenNum[`${o.key}`] = o.value
                        _finalValue[`${o.key}`] = o.value
                        keys.push(`${o.key}`)

                    }
                })


            }
            else if(type === 'object' && arr[index].isTimeline)
            {
         

                arr[index].ob.forEach(o=>{
                    // console.log(o)
                    if(o.key === 'x' && 'x' in el) _tweenStartVal.x = el.x
                    else if(o.key === 'y' && 'y' in el) _tweenStartVal.y = el.y
                    else if(o.key === 'rotate' && 'rotate' in el) _tweenStartVal.rotate = el.rotate
                    else if(o.key === 'rotateX' && 'rotateX' in el) _tweenStartVal.rotateX = el.rotateX
                    else if(o.key === 'rotateY' && 'rotateY' in el) _tweenStartVal.rotateY = el.rotateY
                    else if(o.key === 'scale' && 'scale' in el) _tweenStartVal.scale = el.scale
                    else if(o.key === 'backgroundColor') 
                    {
                        if(el.backgroundColor)
                        {
                            _tweenStartVal.backgroundColor = el.backgroundColor.replace('rgb(','').replace(')','').split(',').map(function(item) {
                                return parseInt(item, 10)});
                        }
                        else{
                            if(arr[index].ob[backgroundColor].value.includes('#'))
                            {
                                _tweenStartVal.backgroundColor =  transform.hexToRgb(arr[index].ob[backgroundColor].value).replace('rgb(','').replace(')','').split(',').map(function(item) {
                                    return parseInt(item, 10)});
                            }
                            else {
                                _tweenStartVal.backgroundColor =  arr[index].ob[backgroundColor].value.replace('rgb(','').replace(')','').split(',').map(function(item) {
                                    return parseInt(item, 10)});
                            }
                        }
                      
                    }
                    else if(o.key === 'color') 
                    { 
                        if(el.color)
                        {
                            _tweenStartVal.color = el.color.replace('rgb(','').replace(')','').split(',').map(function(item) {
                                return parseInt(item, 10)});
                        }
                        else
                        {
                            if(arr[index].ob[color].value.includes('#'))
                            {
                                _tweenStartVal.color =  transform.hexToRgb(arr[index].ob[color].value).replace('rgb(','').replace(')','').split(',').map(function(item) {
                                    return parseInt(item, 10)});
                            }
                            else {
                                _tweenStartVal.color =  arr[index].ob[color].value.replace('rgb(','').replace(')','').split(',').map(function(item) {
                                    return parseInt(item, 10)});
                            }
                        }
                 
                    }
                    else {
                    
                        _tweenStartVal[`${o.key}`] =  el[`${o.key}`]
                        _tweenEndVal[`${o.key}`] = o.value
                        _betweenNum[`${o.key}`] = o.value
                        _finalValue[`${o.key}`] = o.value
                        keys.push(`${o.key}`)

                    }
                })

            }
            else if(type === 'html' && !arr[index].isTimeline)
            {
                let width = arr[index].ob.map(e => e.key).indexOf('width');
                let height = arr[index].ob.map(e => e.key).indexOf('height');
                let left = arr[index].ob.map(e => e.key).indexOf('left');
                let right = arr[index].ob.map(e => e.key).indexOf('right');
                let top = arr[index].ob.map(e => e.key).indexOf('top');
                let bottom = arr[index].ob.map(e => e.key).indexOf('bottom');
                let x = arr[index].ob.map(e => e.key).indexOf('x');
                let y = arr[index].ob.map(e => e.key).indexOf('y');
                let rotate = arr[index].ob.map(e => e.key).indexOf('rotate');
                let scaleX = arr[index].ob.map(e => e.key).indexOf('scaleX');
                let scaleY = arr[index].ob.map(e => e.key).indexOf('scaleY');
                let backgroundColor = arr[index].ob.map(e => e.key).indexOf('backgroundColor');
                let color = arr[index].ob.map(e => e.key).indexOf('color');

                
                _tweenStartVal.x = arr[index].ob[x].value
                _tweenStartVal.y = arr[index].ob[y].value
                _tweenStartVal.width = arr[index].ob[width].value
                _tweenStartVal.height = arr[index].ob[height].value
                _tweenStartVal.left = arr[index].ob[left].value
                _tweenStartVal.right = arr[index].ob[right].value
                _tweenStartVal.top = arr[index].ob[top].value
                _tweenStartVal.bottom = arr[index].ob[bottom].value

                _tweenStartVal.rotate = arr[index].ob[rotate].value
                _tweenStartVal.scale = arr[index].ob[scaleX].value * arr[index].ob[scaleY].value


                if(arr[index].ob[backgroundColor].value.includes('#'))
                    {
                        _tweenStartVal.backgroundColor =  transform.hexToRgb(arr[index].ob[backgroundColor].value).replace('rgb(','').replace(')','').split(',').map(function(item) {
                            return parseInt(item, 10)});
                }
                else {
                    _tweenStartVal.backgroundColor =  arr[index].ob[backgroundColor].value.replace('rgb(','').replace(')','').split(',').map(function(item) {
                            return parseInt(item, 10)});
                }

                if(arr[index].ob[color].value.includes('#'))
                    {
                        _tweenStartVal.color =  transform.hexToRgb(arr[index].ob[color].value).replace('rgb(','').replace(')','').split(',').map(function(item) {
                            return parseInt(item, 10)});
                }
                else {
                    _tweenStartVal.color =  arr[index].ob[color].value.replace('rgb(','').replace(')','').split(',').map(function(item) {
                            return parseInt(item, 10)});
                }
        

            }
            else if(type ==='html' && arr[index].isTimeline)
            {
                let width = arr[index].ob.map(e => e.key).indexOf('width');
                let height = arr[index].ob.map(e => e.key).indexOf('height');
                let left = arr[index].ob.map(e => e.key).indexOf('left');
                let right = arr[index].ob.map(e => e.key).indexOf('right');
                let top = arr[index].ob.map(e => e.key).indexOf('top');
                let bottom = arr[index].ob.map(e => e.key).indexOf('bottom');
                let x = arr[index].ob.map(e => e.key).indexOf('x');
                let y = arr[index].ob.map(e => e.key).indexOf('y');
                let rotate = arr[index].ob.map(e => e.key).indexOf('rotate');
                let scaleX = arr[index].ob.map(e => e.key).indexOf('scaleX');
                let scaleY = arr[index].ob.map(e => e.key).indexOf('scaleY');
                let backgroundColor = arr[index].ob.map(e => e.key).indexOf('backgroundColor');
                let color = arr[index].ob.map(e => e.key).indexOf('color');

                _tweenStartVal.x = el.x || arr[index].ob[x].value
                _tweenStartVal.y = el.y || arr[index].ob[y].value
                _tweenStartVal.width = el.width || arr[index].ob[width].value
                _tweenStartVal.height = el.height || arr[index].ob[height].value
                _tweenStartVal.left = el.left || arr[index].ob[left].value
                _tweenStartVal.right = el.right || arr[index].ob[right].value
                _tweenStartVal.top = el.top || arr[index].ob[top].value
                _tweenStartVal.bottom = el.bottom || arr[index].ob[bottom].value

                _tweenStartVal.rotate = el.rotate ||arr[index].ob[rotate].value
                _tweenStartVal.scale = el.scale || arr[index].ob[scaleX].value * arr[index].ob[scaleY].value
                if(el.backgroundColor)
                {
                    _tweenStartVal.backgroundColor = el.backgroundColor.replace('rgb(','').replace(')','').split(',').map(function(item) {
                        return parseInt(item, 10)});
                }
                else{
                    if(arr[index].ob[backgroundColor].value.includes('#'))
                    {
                        _tweenStartVal.backgroundColor =  transform.hexToRgb(arr[index].ob[backgroundColor].value).replace('rgb(','').replace(')','').split(',').map(function(item) {
                            return parseInt(item, 10)});
                    }
                    else {
                        _tweenStartVal.backgroundColor =  arr[index].ob[backgroundColor].value.replace('rgb(','').replace(')','').split(',').map(function(item) {
                                return parseInt(item, 10)});
                    }
            
                }
                if(el.color)
                {
                    _tweenStartVal.color = el.color.replace('rgb(','').replace(')','').split(',').map(function(item) {
                        return parseInt(item, 10)});
                }
                else{
                        if(arr[index].ob[color].value.includes('#'))
                    {
                        _tweenStartVal.color =  transform.hexToRgb(arr[index].ob[color].value).replace('rgb(','').replace(')','').split(',').map(function(item) {
                            return parseInt(item, 10)});
                    }
                    else {
                        _tweenStartVal.color =  arr[index].ob[color].value.replace('rgb(','').replace(')','').split(',').map(function(item) {
                                return parseInt(item, 10)});
                    }
                }

            }
            //  set fromTo the start values
            if(startValues)
            {

                if('x' in startValues) 
                {
                  
                    if(typeof startValues.x === 'string')
                    {
                      _tweenStartVal.x = parseFloat(startValues.x.replace(transform.checkSemantic(startValues.x),''))
                    }
                    else{
                        _tweenStartVal.x = startValues.x
                    }
              
                }
                if('y' in startValues) 
                {
                    if(typeof startValues.y === 'string')
                    {
                      _tweenStartVal.y = parseFloat(startValues.y.replace(transform.checkSemantic(startValues.y),''))
                    }
                    else{
                        _tweenStartVal.y = startValues.y
                    }
                }
                if('width' in startValues) 
                {
                    if(typeof startValues.width === 'string')
                    {
                      _tweenStartVal.width = parseFloat(startValues.width.replace(transform.checkSemantic(startValues.width),''))
                    }
                    else{
                        _tweenStartVal.width = startValues.width
                    }
                }
                if('height' in startValues) 
                {
                    if(typeof startValues.height === 'string')
                    {
                      _tweenStartVal.height = parseFloat(startValues.height.replace(transform.checkSemantic(startValues.height),''))
                    }
                    else{
                        _tweenStartVal.height = startValues.height
                    }
                }
                if('left' in startValues) 
                {
                    if(typeof startValues.left === 'string')
                    {
                      _tweenStartVal.left = parseFloat(startValues.left.replace(transform.checkSemantic(startValues.left),''))
                    }
                    else{
                        _tweenStartVal.left = startValues.left
                    }
                }
                if('right' in startValues)
                {
                    if(typeof startValues.right === 'string')
                    {
                      _tweenStartVal.right = parseFloat(startValues.right.replace(transform.checkSemantic(startValues.right),''))
                    }
                    else{
                        _tweenStartVal.right = startValues.right
                    }
                    
                }
                if('top' in startValues) 
                {
                    if(typeof startValues.top === 'string')
                    {
                      _tweenStartVal.top = parseFloat(startValues.top.replace(transform.checkSemantic(startValues.top),''))
                    }
                    else{
                      _tweenStartVal.top = startValues.top
                    }
                }
                if('bottom' in startValues)
                {
                    if(typeof startValues.bottom === 'string')
                    {
                      _tweenStartVal.bottom = parseFloat(startValues.bottom.replace(transform.checkSemantic(startValues.bottom),''))
                    }
                    else{
                      _tweenStartVal.bottom = startValues.bottom
                    }
                }
                if('scale' in startValues) _tweenStartVal.scale = startValues.scale
                if('rotate' in startValues)_tweenStartVal.rotate = startValues.rotate 
                if('rotateX' in startValues) _tweenStartVal.rotateX = startValues.rotateX
                if('rotateY' in startValues) _tweenStartVal.rotateY = startValues.rotateY

                keys.forEach(k=>{
                    if(k in startValues)
                    {
                        _tweenStartVal[`${k}`] = startValues[`${k}`]
                    }
                })
                if('backgroundColor' in startValues)
                {
                    if(startValues.backgroundColor.includes('#'))  _tweenStartVal.backgroundColor = transform.hexToRgb(startValues.backgroundColor).replace('rgb(','').replace(')','').split(',').map(function(item) {
                        return parseInt(item, 10);
                    })
                    else _tweenStartVal.backgroundColor = startValues.backgroundColor.replace('rgb(','').replace(')','').split(',').map(function(item) {
                        return parseInt(item, 10);
                    })

                }
                if('color' in startValues)
                {
                    if(startValues.color.includes('#')) _tweenStartVal.color = transform.hexToRgb(startValues.color).replace('rgb(','').replace(')','').split(',').map(function(item) {
                        return parseInt(item, 10);
                    })
                    else _tweenStartVal.color = startValues.color.replace('rgb(','').replace(')','').split(',').map(function(item) {
                        return parseInt(item, 10);
                    })
                }


            }
            // convert ease to bezierEasing function
            if('ease' in opt)
            {
                if(Array.isArray(transform.checkEase(opt.ease)))
                {
                    let easeArr = transform.checkEase(opt.ease)

                    arr[index].ease = BezierEasing(easeArr[0],easeArr[1],easeArr[2],easeArr[3])

                }
                else{
                    transform.checkEase(opt.ease)
                }
              
            }
      
           // set between num and end values
            for (const key in opt) {
                    if(
                        key === 'x' || 
                        key === 'y' ||
                        key === 'width' ||
                        key === 'height' ||
                        key ===  'left' || 
                        key === 'right' ||
                        key === 'top'  ||
                        key === 'bottom'
                        )
                    {
                        this.setValuesWithSemantic(_htmlIncreasement,opt,type,_tweenStartVal,_tweenEndVal,_betweenNum,key)
                    }
                    else if(key === 'backgroundColor' || key === 'color')
                    {
                        this.setColorValues(_tweenStartVal,_tweenEndVal,_betweenNum,opt,key)
                    }
                    else if(key === 'scale' || key === 'rotate' || key === 'rotateX' || key === 'rotateY')
                    {
                        _tweenEndVal[key] = opt[key]
                        _betweenNum[key] = checkValues(_tweenStartVal[key],_tweenEndVal[key])
                    }
            }
            // set between num and end values for unique key on object
            keys.forEach(k=>{
                if(k in opt)
                {
                    _tweenEndVal[`${k}`] = opt[`${k}`]
                    _betweenNum[`${k}`] = checkValues(_tweenStartVal[`${k}`],_tweenEndVal[`${k}`])
                }
            })
       

            // initalize animation
            // html animation
            if(type === 'html')
            {
                    // regular html tween
                    if(arr[index].easeNum < 1 - increaseBy)
                    {
            
                        arr[index].easeNum +=increaseBy
                        this.setFinalValue(arr,opt,_tweenStartVal,_tweenEndVal,_betweenNum,_finalValue,index)
                            // html properties
                            el.style.transform = 
                            `translateY(${_finalValue.y}${_htmlIncreasement.y}) 
                            translateX(${_finalValue.x}${_htmlIncreasement.x}) 
                            rotate(${_finalValue.rotate}deg) 
                            rotateX(${_finalValue.rotateX}deg) 
                            rotateY(${_finalValue.rotateY}deg) 
                            scale(${_finalValue.scale}) `
            
                            if('width' in opt) el.style.width = `${_finalValue.width}${_htmlIncreasement.width}`
                            if('height' in opt) el.style.height = `${_finalValue.height}${_htmlIncreasement.height}`
                            if('left' in opt) el.style.left = `${_finalValue.left}${_htmlIncreasement.left}`
                            if('right' in opt) el.style.right = `${_finalValue.right}${_htmlIncreasement.right}`
                            if('top' in opt) el.style.top = `${_finalValue.top}${_htmlIncreasement.top}`
                            if('bottom' in opt) el.style.bottom = `${_finalValue.bottom}${_htmlIncreasement.bottom}`
            
                            el.style.backgroundColor =  `rgb(${Math.round(_finalValue.backgroundColor[0])},${Math.round(_finalValue.backgroundColor[1])},${Math.round(_finalValue.backgroundColor[2])})`
                            el.style.color = `rgb(${Math.round(_finalValue.color[0])},${Math.round(_finalValue.color[1])},${Math.round(_finalValue.color[2])})`
                    
                    }
                    else{
                        // check if restart is on options
                        if('restart' in opt) 
                        {
                            if(arr[index].maxRestart === opt.restart)
                            { 
                                // check for max restart equal the options restart option and stop
                                if('value' in opt) arr[index].element = opt.value
                                if('y' in opt)  arr[index].element.y = _tweenEndVal.y
                                if('x' in opt)  arr[index].element.x =_tweenEndVal.x
                                if('width' in opt)  arr[index].element.width = _tweenEndVal.width
                                if('height' in opt)  arr[index].element.height =_tweenEndVal.height
                                if('left' in opt)  arr[index].element.left = _tweenEndVal.left
                                if('right' in opt)  arr[index].element.right =_tweenEndVal.right
                                if('top' in opt)  arr[index].element.top = _tweenEndVal.top
                                if('bottom' in opt)  arr[index].element.bottom =_tweenEndVal.bottom
                                if('scale' in opt)  arr[index].element.scale = _tweenEndVal.scale
                                if('rotate' in opt)  arr[index].element.rotate = _tweenEndVal.rotate
                                if('rotateX' in opt)  arr[index].element.rotateX = _tweenEndVal.rotateX
                                if('rotateY' in opt)  arr[index].element.rotateY = _tweenEndVal.rotateY
                                if('backgroundColor' in opt)  arr[index].element.backgroundColor =`rgb(${_tweenEndVal.backgroundColor[0]},${_tweenEndVal.backgroundColor[1]},${_tweenEndVal.backgroundColor[2]})`
                                if('color' in opt)  arr[index].element.color =`rgb(${_tweenEndVal.color[0]},${_tweenEndVal.color[1]},${_tweenEndVal.color[2]})`
                                if('onEnd' in opt ) opt.onEnd()
                                arr.splice(index,1)

                            }
                            else if(opt.restart === -1)
                            {
                                // preform endlesss animation
                        
                                    arr[index].element.style.transform = 
                                    `translateY(${_tweenStartVal.y}%) 
                                    translateX(${_tweenStartVal.x}%) 
                                    rotate(${_tweenStartVal.rotate}deg) 
                                    rotateX(${_tweenStartVal.rotateX}deg) 
                                    rotateY(${_tweenStartVal.rotateY}deg) 
                                    scale(${_tweenStartVal.scale}) `
                            
                                    if('width' in opt)  el.style.width = `${_tweenStartVal.width}${_htmlIncreasement.width}`
                                    if('height' in opt) el.style.height = `${_tweenStartVal.height}${_htmlIncreasement.height}`
                                    if('left' in opt) el.style.left = `${_tweenStartVal.left}${_htmlIncreasement.left}`
                                    if('right' in opt) el.style.right = `${_tweenStartVal.right}${_htmlIncreasement.right}`
                                    if('top' in opt) el.style.top = `${_tweenStartVal.top}${_htmlIncreasement.top}`
                                    if('bottom' in opt) el.style.bottom = `${_tweenStartVal.bottom}${_htmlIncreasement.bottom}`
            
            
                                    el.style.backgroundColor = `rgb(${Math.round(_tweenStartVal.backgroundColor[0])},${Math.round(_tweenStartVal.backgroundColor[1])},${Math.round(_tweenStartVal.backgroundColor[2])})`
                                    el.style.color = `rgb(${_tweenStartVal.color[0]},${_tweenStartVal.color[1]},${_tweenStartVal.color[2]})`
                
            
                                arr[index].easeNum -= 1
                            }
                            else 
                            {
                                // continue restart
                            
                                arr[index].element.style.transform = 
                                `translateY(${_tweenStartVal.y}%) 
                                translateX(${_tweenStartVal.x}%) 
                                rotate(${_tweenStartVal.rotate}deg) 
                                rotateX(${_tweenStartVal.rotateX}deg) 
                                rotateY(${_tweenStartVal.rotateY}deg) 
                                scale(${_tweenStartVal.scale}) `
                                if('width' in opt)  el.style.width = `${_tweenStartVal.width}${_htmlIncreasement.width}`
                                if('height' in opt) el.style.height = `${_tweenStartVal.height}${_htmlIncreasement.height}`
                                if('left' in opt) el.style.left = `${_tweenStartVal.left}${_htmlIncreasement.left}`
                                if('right' in opt) el.style.right = `${_tweenStartVal.right}${_htmlIncreasement.right}`
                                if('top' in opt) el.style.top = `${_tweenStartVal.top}${_htmlIncreasement.top}`
                                if('bottom' in opt) el.style.bottom = `${_tweenStartVal.bottom}${_htmlIncreasement.bottom}`
            
                                el.style.backgroundColor = `rgb(${Math.round(_tweenStartVal.backgroundColor[0])},${Math.round(_tweenStartVal.backgroundColor[1])},${Math.round(_tweenStartVal.backgroundColor[2])})`
                                el.style.color = `rgb(${_tweenStartVal.color[0]},${_tweenStartVal.color[1]},${_tweenStartVal.color[2]})`
                            
                        
                            
                            arr[index].easeNum -= 1
                            arr[index].maxRestart+=1
                            }
                        }
                            
                        else{
                            // animation end without restart.
                            if('value' in opt) arr[index].element = opt.value
                            if('y' in opt)  arr[index].element.y = _tweenEndVal.y
                            if('x' in opt)  arr[index].element.x =_tweenEndVal.x
                            if('width' in opt)  arr[index].element.width = _tweenEndVal.width
                            if('height' in opt)  arr[index].element.height =_tweenEndVal.height
                            if('left' in opt)  arr[index].element.left = _tweenEndVal.left
                            if('right' in opt)  arr[index].element.right =_tweenEndVal.right
                            if('top' in opt)  arr[index].element.top = _tweenEndVal.top
                            if('bottom' in opt)  arr[index].element.bottom =_tweenEndVal.bottom
                            if('scale' in opt)  arr[index].element.scale = _tweenEndVal.scale
                            if('rotate' in opt)  arr[index].element.rotate = _tweenEndVal.rotate
                            if('rotateX' in opt)  arr[index].element.rotateX = _tweenEndVal.rotateX
                            if('rotateY' in opt)  arr[index].element.rotateY = _tweenEndVal.rotateY
                            if('backgroundColor' in opt)  arr[index].element.backgroundColor =`rgb(${_tweenEndVal.backgroundColor[0]},${_tweenEndVal.backgroundColor[1]},${_tweenEndVal.backgroundColor[2]})`
                            if('color' in opt)  arr[index].element.color =`rgb(${_tweenEndVal.color[0]},${_tweenEndVal.color[1]},${_tweenEndVal.color[2]})`
                            if('onEnd' in opt ) opt.onEnd()
                            arr.splice(index,1)
            
                        }
                    }

            }
            // object animation
            if(type === 'object')
            {
                if(arr[index].easeNum < 1)
                {
        
                        arr[index].easeNum +=increaseBy

                        this.setFinalValue(arr,opt,_tweenStartVal,_tweenEndVal,_betweenNum,_finalValue,index)
                            
                        keys.forEach(k=>{
                            if(k in opt)
                            {
                                _finalValue[`${k}`] = transformValues(_tweenStartVal[`${k}`],_tweenEndVal[`${k}`],_betweenNum[`${k}`],arr[index].easeNum,arr[index].ease);
                            }
                        })
        
                        // object properties
                        if('x' in el) el.x = parseFloat(_finalValue.x.toFixed(1))
                        if('y' in el) el.y = parseFloat(_finalValue.y.toFixed(1))
                        if('rotate' in el) el.rotate = parseFloat(_finalValue.rotate.toFixed(1))
                        if('rotateX' in el) el.rotateX =parseFloat( _finalValue.rotateX.toFixed(1))
                        if('rotateY' in el) el.rotateY = parseFloat(_finalValue.rotateY.toFixed(1))
                        if('scale' in el) el.scale = parseFloat(_finalValue.scale.toFixed(1))
                        if('backgroundColor' in el) el.backgroundColor =  `rgb(${Math.round(_finalValue.backgroundColor[0])},${Math.round(_finalValue.backgroundColor[1])},${Math.round(_finalValue.backgroundColor[2])})`
                        if('color' in el) el.color = `rgb(${Math.round(_finalValue.color[0])},${Math.round(_finalValue.color[1])},${Math.round(_finalValue.color[2])})`
                        keys.forEach(k=>{
                            if(k in opt)
                            {
                                el[`${k}`] = parseFloat(_finalValue[`${k}`].toFixed(1))
                            }
                        })
                
                }
                else{
                    // check if restart is on options
                    if('restart' in opt) 
                    {
                        if(arr[index].maxRestart === opt.restart)
                        { 
                            // check for max restart equal the options restart option and stop
                        if('value' in opt) el = opt.value
                        if('y' in opt)  el.y = _tweenEndVal.y
                        if('x' in opt)  el.x = _tweenEndVal.x
                        if('scale' in opt)  el.scale = _tweenEndVal.scale
                        if('rotate' in opt)  el.rotate = _tweenEndVal.rotate
                        if('rotateX' in opt)  el.rotateX = _tweenEndVal.rotateX
                        if('rotateY' in opt)  el.rotateY = _tweenEndVal.rotateY
                        if('backgroundColor' in opt)  el.backgroundColor =`rgb(${_tweenEndVal.backgroundColor[0]},${_tweenEndVal.backgroundColor[1]},${_tweenEndVal.backgroundColor[2]})`
                        if('color' in opt)  el.color =`rgb(${_tweenEndVal.color[0]},${_tweenEndVal.color[1]},${_tweenEndVal.color[2]})`
                        if('onEnd' in opt ) opt.onEnd()
                        keys.forEach(k=>{
                            if(k in opt)
                            {
                                el[`${k}`] = _tweenEndVal[`${k}`]
                            }
                        })
        
                        arr.splice(index,1)
                        }
                        else if(opt.restart === -1)
                        {
                            // preform endlesss animation
                            if('x' in el) arr[index].element.x = _tweenStartVal.x
        
                            if('y' in el )arr[index].element.y = _tweenStartVal.y
        
                            if('rotate' in el) arr[index].element.rotate = _tweenStartVal.rotate
        
                            if('rotateX' in el) arr[index].element.rotateX = _tweenStartVal.rotateX
                            
                            if('rotateY' in el) arr[index].element.rotateY = _tweenStartVal.rotateY
        
                            if('scale' in el) arr[index].element.scale = _tweenStartVal.scale
        
                            if('backgroundColor' in el) arr[index].element.backgroundColor =  `rgb(${Math.round(_tweenStartVal.backgroundColor[0])},${Math.round(_tweenStartVal.backgroundColor[1])},${Math.round(_tweenStartVal.backgroundColor[2])})`
        
                            if('color' in el ) arr[index].element.color = `rgb(${_tweenStartVal.color[0]},${_tweenStartVal.color[1]},${_tweenStartVal.color[2]})`
        
                            keys.forEach(k=>{
                                if(k in opt)
                                {
                                el[`${k}`] = _tweenStartVal[`${k}`]
                                }
                            })
        
                            arr[index].easeNum -= 1
                        }
                        else 
                        {
                            // continue restart
                            if('x' in el) arr[index].element.x = _tweenStartVal.x
        
                            if('y' in el )arr[index].element.y = _tweenStartVal.y
            
                            if('rotate' in el) arr[index].element.rotate = _tweenStartVal.rotate
            
                            if('rotateX' in el) arr[index].element.rotateX = _tweenStartVal.rotateX
                            
                            if('rotateY' in el) arr[index].element.rotateY = _tweenStartVal.rotateY
            
                            if('scale' in el) arr[index].element.scale = _tweenStartVal.scale
            
                            if('backgroundColor' in el) arr[index].element.backgroundColor =  `rgb(${Math.round(_tweenStartVal.backgroundColor[0])},${Math.round(_tweenStartVal.backgroundColor[1])},${Math.round(_tweenStartVal.backgroundColor[2])})`
            
                            if('color' in el ) arr[index].element.color = `rgb(${_tweenStartVal.color[0]},${_tweenStartVal.color[1]},${_tweenStartVal.color[2]})`
        
                            keys.forEach(k=>{
                                if(k in opt)
                                {
                                    el[`${k}`] = _tweenStartVal[`${k}`]
                                }
                            })
                        
                        arr[index].easeNum -= 1
                        arr[index].maxRestart+=1
                        }
                    }
                        
                    else{
                        // animation end without restart.
                        if('value' in opt) arr[index].element = opt.value
                        if('y' in opt)  el.y = _tweenEndVal.y
                        if('x' in opt)  el.x =_tweenEndVal.x
                        if('scale' in opt)  el.scale = _tweenEndVal.scale
                        if('rotate' in opt)  el.rotate = _tweenEndVal.rotate
                        if('rotateX' in opt)  el.rotateX = _tweenEndVal.rotateX
                        if('rotateY' in opt)  el.rotateY = _tweenEndVal.rotateY
                        if('backgroundColor' in opt)  el.backgroundColor =`rgb(${_tweenEndVal.backgroundColor[0]},${_tweenEndVal.backgroundColor[1]},${_tweenEndVal.backgroundColor[2]})`
                        if('color' in opt)  el.color =`rgb(${_tweenEndVal.color[0]},${_tweenEndVal.color[1]},${_tweenEndVal.color[2]})`
                        keys.forEach(k=>{
                            if(k in opt)
                            {
                                el[`${k}`] = _tweenEndVal[`${k}`]
                            }
                        })
                        if('onEnd' in opt ) opt.onEnd()
                        arr.splice(index,1)
        
                    }
        
                    
                }
            }


     // end tween
    }

    setValuesWithSemantic(_htmlIncreasement,opt,type,_tweenStartVal,_tweenEndVal,_betweenNum,key)
    {
        if(typeof opt[key] ===  'string' && type === 'html') 
        {   _tweenEndVal[key] = parseFloat(opt[key].replace(transform.checkSemantic(opt[key]),''))
            _htmlIncreasement[key]  =transform.checkSemantic(opt[key])
            if(_htmlIncreasement[key] === undefined) _htmlIncreasement[key] = '%'

        }
        else{ _tweenEndVal[key] = opt[key];}
        _betweenNum[key] = checkValues(_tweenStartVal[key],_tweenEndVal[key])
    }
    setColorValues(_tweenStartVal,_tweenEndVal,_betweenNum,opt,key)
    {
        if(opt[key].includes('#'))
        {
            let tempColor = transform.hexToRgb(opt[key])
            _tweenEndVal[key]= tempColor.replace('rgb(','').replace(')','').split(',').map(function(item) {
                return parseInt(item, 10);
            });
            
        }
        else
        {
            _tweenEndVal[key] = opt[key].replace('rgb(','').replace(')','').split(',').map(function(item) {
                return parseInt(item, 10);
            });
            
        }
        _betweenNum[key][0] = checkValues(_tweenStartVal[key][0], _tweenEndVal[key][0])
        _betweenNum[key][1] = checkValues(_tweenStartVal[key][1], _tweenEndVal[key][1])
        _betweenNum[key][2] = checkValues(_tweenStartVal[key][2], _tweenEndVal[key][2])
    }

    setFinalValue(arr,opt,_tweenStartVal,_tweenEndVal,_betweenNum,_finalValue,index)
    {
        for (const key in opt) {

            if(key === 'onRun') opt.onRun()
            else if(key === 'backgroundColor' || key === 'color') 
            {
                _finalValue[key][0] = transformValues(_tweenStartVal[key][0],_tweenEndVal[key][0], _betweenNum[key][0],arr[index].easeNum,arr[index].ease)
                _finalValue[key][1] = transformValues(_tweenStartVal[key][1],_tweenEndVal[key][1],_betweenNum[key][1],arr[index].easeNum,arr[index].ease)
                _finalValue[key][2] = transformValues(_tweenStartVal[key][2],_tweenEndVal[key][2],_betweenNum[key][2],arr[index].easeNum,arr[index].ease)
            }
            else if(key === 'duration' || key === 'ease' || key === 'onEnd' || key === 'restart')
            {
                // do nothing ....
            }
            else{

                 if(key in this.defaultValues)
                 {
                    _finalValue[key] = transformValues(_tweenStartVal[key],_tweenEndVal[key],_betweenNum[key],arr[index].easeNum,arr[index].ease) ;
                 }
            }
            
          
        }
    }
    

    loop()
    {
    
            requestAnimationFrame(this.loop)

            this.animations.forEach((animation,i)=>{
              
                    // regular tween
                    if(animation.startOptions)
                    {
                        if('delay' in animation.options)
                        {
                            if(animation.delayNum > animation.maxDelay)this.Tween(animation.type,animation.element,animation.options,i,animation.startOptions);
                            else animation.delayNum+=1;
                        }
                        else{
                        this.Tween(this.animations,animation.type,animation.element,animation.options,i,animation.startOptions);
                        }
                    }
                    else{
                        if('delay' in animation.options)
                        {
                            if(animation.delayNum > animation.maxDelay)this.Tween(this.animations,animation.type,animation.element,animation.options,i);
                            else animation.delayNum+=1;
                        }
                        else{
                        this.Tween(this.animations,animation.type,animation.element,animation.options,i);
                        }
                    }
             

            })

            this.timeLineKeys.forEach((timeline)=>{

                if(timeline.stop === false)
                {
                    timeline.order.forEach((order,orderIndex)=>{
                        if(orderIndex === 0)
                        {
                         if(order.startOptions)
                         {
                             if('delay' in order.options)
                             {
                                 if(order.delayNum > order.maxDelay)this.Tween(timeline.order,order.type,order.element,order.options,orderIndex,order.startOptions);
                                 else order.delayNum+=1;
                             }
                             else{
                             this.Tween(timeline.order,order.type,order.element,order.options,orderIndex,order.startOptions);
                             }
                         }
                         else{
                             if('delay' in order.options)
                             {
                                 if(order.delayNum > order.maxDelay)this.Tween(timeline.order,order.type,order.element,order.options,orderIndex);
                                 else order.delayNum+=1;
                             }
                             else{
                             this.Tween(timeline.order,order.type,order.element,order.options,orderIndex);
                             }
                         }
                        }
     
                     })
                }
             
          
            })
    

    }



// Motion
}


export let motion = new _Motion()

// export version of bezier editor to control easing

