import {motion} from '../src/Motion.js'

let box = {
    x:0,
    y:-20,
    progress:1,
    backgroundColor:'#000',
}

let theBox = document.querySelector('.box')

let justANum = 0


let box1 = {
    progress:0,
    x:0,
    rotate:0
}

let tl = motion.timeline({ease:'sine-in'})
tl.stop()

let tlo = motion.timeline()

// motion.to(theBox,{top:20,x:100,height:'100px',width:'100px',rotate:0,duration:2,color:'#f0f000',backgroundColor:'#ffff00',restart:4})


tl.to(theBox,{top:'20px',x:100,height:'100px',width:'100px',rotate:20,duration:3,color:'#f0f000',backgroundColor:'#ffff00',restart:1})
  .fromTo(theBox,{width:'200px'},{top:20,x:100,height:'50px',width:'50px',rotate:40,duration:3,color:'#ffff00',backgroundColor:'rgb(0,0,0)',restart:2,delay:2})
  .to(theBox,{color:'#fff',backgroundColor:'#ffff00',duration:2})

tlo.to(box1,{progress:10,duration:2,
    onRun:()=>{
        // console.log(box1.progress)
    }
})
   .to(box1,{progress:2,duration:2,
    onRun:()=>{
        // console.log(box1.progress)
    }})

//   .to(theBox,{top:20,x:100,height:'100px',width:'100px',rotate:0,duration:5,color:'#ffff00',backgroundColor:'rgb(0,0,0)'})

//   tlo.to(theBox,{top:20,x:100,height:'100px',width:'100px',rotate:0,duration:4,color:'#f0f000',backgroundColor:'#ffff00'})
//   .to(theBox,{top:20,x:100,height:'50px',width:'50px',rotate:40,duration:4,color:'#ffff00',backgroundColor:'#000'})


document.addEventListener('click',()=>{
    console.log(motion.CopytimeLineKeys)
    tl.stop()
})

document.addEventListener('dblclick',()=>{
    tl.play()
})


let d3 = {
    position:{x:0,y:0,z:0,backgroundColor:'#ffff00'}
}

    // motion.to(theBox,{top:20,x:100,height:'100px',width:'100px',rotate:0,duration:4,color:'#f0f000',backgroundColor:'#ffff00'})



    // motion.fromTo(d3.position,{x:-50,y:-5,z:-150},{x:100,y:25,z:15,backgroundColor:'#000',duration:2,onRun:()=>{

    //     // theBox.style.backgroundColor = d3.position.backgroundColor
    //     // console.log(d3.position)
    // }})







      

    // motion.fromTo(theBox,
    //     {scale:3.5,rotate:-180,y:20,color:'#fafafa'},
    //     {duration:2,
    //         scale:1,
    //         rotate:360,
    //         y:'550px',
    //         x:'20',
    //         color:'#ff0000',
    //         restart:0,
    //         ease:[1,1,1,1],
    //         onRun:()=>{
    //             // console.log(justANum)
    //         },
    //         onEnd:()=>{console.log('endAnimation1')
    //     }})
    // motion.to(theBox,
    //     {duration:2,
    //         scale:1,
    //         rotate:0,
    //         delay:2,
    //         y:0,
    //         backgroundColor:'rgb(155, 30, 161)',
    //         color:'rgb(255, 0, 0)',
    //         restart:0,
    //         ease:[1,.5,.5,.85],
    //         onRun:()=>{
    //             // console.log(justANum)
    //         },
    //         onEnd:()=>{console.log('endAnimation2')
    //     }})


