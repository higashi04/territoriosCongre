import React, { useEffect, useState } from 'react'
import { RgbaColorPicker } from 'react-colorful'


const ColorPicker = ({rgbaString, returnString}) => {
    const [color, setColor] = useState({r:75, g: 75, b: 150, a: 1 })

    const setRgbaFromString = () => {
        const regex = /rgba?\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/;
        const result = regex.exec(rgbaString);

        if (result) {
            setColor({
                r: parseInt(result[1], 10),
                g: parseInt(result[2], 10),
                b: parseInt(result[3], 10),
                a: parseFloat(result[4])
            });
        }
    }

    const handleColorPick = (rgba) => {
        setColor(rgba);
        const {r,g,b,a} = rgba;
        const returnRgbaString = `rgba(${r}, ${g}, ${b}, ${a})`;
        returnString(returnRgbaString);
    }

    useEffect(() => {
        setRgbaFromString()
    }, [rgbaString, setRgbaFromString])

  return (
    <div className='container'>
      <RgbaColorPicker color={color} onChange={handleColorPick} />
    </div>
  )
}



export default ColorPicker
