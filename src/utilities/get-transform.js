export function checkEase(ease)
{
  if(typeof ease === 'string')
  {
    switch (ease) {
      case 'linear':
         return [1,1,1,1];
        break;
      case 'sine-in':
         return [0.12, 0, 0.39, 0];
        break;  
      case 'sine-out':
         return [0.61, 1, 0.88, 1];
        break;  
      case 'sine-inOut':
         return [0.37, 0, 0.63, 1];
        break;  
      case 'cubic-in':
         return [0.32, 0, 0.67, 0];
        break;  
      case 'cubic-out':
         return [0.33, 1, 0.68, 1];
        break;  
      case 'cubic-inOut':
         return [0.65, 0, 0.35, 1];
        break;  
      case 'expo-in':
         return [0.7, 0, 0.84, 0];
        break;  
      case 'expo-out':
         return [0.16, 1, 0.3, 1];
        break;  
      case 'expo-inOut':
         return [0.87, 0, 0.13, 1];
        break;  
      case 'motion-in':
         return [1,.99,.96,.78];
        break;  
      case 'motion-out':
         return [1,.99,.71,.92];
        break;  
      case 'motion-inOut':
         return [1,1,.86,.49];
        break;  
    }
  }
  else if(Array.isArray(ease))
  {
    if(ease.length === 4)
    {
      return 'array' + ease;
    }
    else 
    {
      return console.warn(`Custom ease must be Array of 4 Numbers : "${ease}"`)
    }
  }
  return console.warn(`this type of ease is not valid : "${ease}"`)
}

export function genrateKey() {
    let t = "";
    let possible = "#@!*&$~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 10; i++)
    {
        t += possible.charAt(Math.floor(Math.random() * possible.length));
    }
  
    return t;
}

export function checkType(el)
{
 if(el instanceof HTMLElement)
 {
     return 'html';
 }
 else if(typeof el === 'number')
 {
     return 'number';
 }
 else{
     return 'object';
 }

}

export function convertPixelToUnit(el,val,unit,prop)
{
  let pixelValue = val
  if(typeof val  === 'string' && val.includes('px'))
  {
      pixelValue = parseFloat(val.replace('px',''))
  }
  let parentW = parseFloat(window.getComputedStyle(el.parentNode).width.replace('px',''))
  let parentH = parseFloat(window.getComputedStyle(el.parentNode).height.replace('px',''))

  let final;
  
  
  // w
    if(prop === 'width' && unit === '%') final =((pixelValue/parentW)*100).toFixed(1) +'%'
     if(prop === 'left' && unit === '%') final =((pixelValue/parentW)*100).toFixed(1) +'%'
       if(prop === 'right' && unit === '%') final =((pixelValue/parentW)*100).toFixed(1) +'%'
  
  // h
      if(prop === 'height' && unit === '%') final =((pixelValue/parentH)*100).toFixed(1) +'%'
        if(prop === 'top' && unit === '%') final =((pixelValue/parentH)*100).toFixed(1) +'%'
        if(prop === 'bottom' && unit === '%') final =((pixelValue/parentH)*100).toFixed(1) +'%'
  
  
  
    if( unit === 'vw') final =(pixelValue*(100 / window.innerWidth)).toFixed(1) +'vw'
  
    if( unit === 'vh') final =(pixelValue*(100 / window.innerHeight)).toFixed(1) +'vh'
  
    if(unit === 'em') final =(pixelValue/16).toFixed(1) +'em'

    if(unit === 'px') return val;

  
  
return final;



}

export function getCSSProp(el,prop,unit)
{
  if(prop in el.style) 
  {
    let final = window.getComputedStyle(el)[prop];
    return final;
  }

}

export function checkSemantic(value)
{
  if(value.includes('px')) return 'px';
  else if(value.includes('vh')) return 'vh';
  else if(value.includes('em')) return 'em';
  else if(value.includes('%')) return '%';
}

export function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
  
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)})`
}

export function getRotate(el){
    var st = window.getComputedStyle(el, null);
    var tm = st.getPropertyValue("-webkit-transform") ||
             st.getPropertyValue("-moz-transform") ||
             st.getPropertyValue("-ms-transform") ||
             st.getPropertyValue("-o-transform") ||
             st.getPropertyValue("transform") ||
             "none";
    if (tm != "none") {
      var values = tm.split('(')[1].split(')')[0].split(',');
  
  
      /*
      a = values[0];
      b = values[1];
      angle = Math.round(Math.atan2(b,a) * (180/Math.PI));
      */
      //return Math.round(Math.atan2(values[1],values[0]) * (180/Math.PI)); //this would return negative values the OP doesn't wants so it got commented and the next lines of code added
      var angle = Math.round(Math.atan2(values[1],values[0]) * (180/Math.PI));
      return (angle < 0 ? angle + 360 : angle); //adding 360 degrees here when angle < 0 is equivalent to adding (2 * Math.PI) radians before
    }
    return 0;
}

export function getX(el)
  { 
      let style = window.getComputedStyle(el)
      const matrix = new DOMMatrixReadOnly(style.transform)
      let elWidth = style.width.replace('px','');
      return parseFloat((matrix.m41/elWidth*100).toFixed(1));
}

export function getY(el)
  { 
      const style = window.getComputedStyle(el)
      const matrix = new DOMMatrixReadOnly(style.transform)
      const elHeight = style.height.replace('px','');
      return parseFloat(Math.round((matrix.m42/elHeight*100).toFixed(1)));
}

export function getScaleY(el)
  { 
      const style = window.getComputedStyle(el)
      const matrix = new DOMMatrixReadOnly(style.transform)
        
      return parseFloat((Math.abs(matrix.m22)/0.819152).toFixed(1));
}

export function getScaleX(el)
  { 
     const style = window.getComputedStyle(el)
      const matrix = new DOMMatrixReadOnly(style.transform)
        
      return parseFloat((Math.abs(matrix.m11)/0.819152).toFixed(1));
}
